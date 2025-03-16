import express from "express";
import cors from "cors";
import routes from "./routes/index";
import prisma from "./config/db";
import bcrypt from "bcryptjs";
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { errorHandler } from "./middlewares/errorHandler";
import { config } from "./config/config";
import http from 'http';
import portfinder from 'portfinder';

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'deploylogs/access.log'), { flags: 'a' });

// Configurer morgan
app.use(morgan(config.nodeEnv === 'development' ? "dev" : "combined", { stream: accessLogStream }));

app.use("/api", routes);

const initSuperAdmin = async () => {
  const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  if (!admin) {
    await prisma.user.create({
      data: {
        name: "Super_Admin",
        email: "admin@admin.com",
        password: await bcrypt.hash("superadmin123", 12),
        role: "SUPER_ADMIN",
        phoneNumber: "+243971736244"
      },
    });
    console.log("Super Admin créé !");
  }
};

const startServer = async () => {
  try {
    // Convertir config.port en nombre si nécessaire
    const PORT = await portfinder.getPortPromise({
      port: Number(config.port),
    });

    const server = http.createServer(app);

    server.listen(PORT, async () => {
      await initSuperAdmin();
      // console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Le port ${PORT} est déjà utilisé.`);
      } else {
        console.error('Erreur lors du démarrage du serveur :', error);
      }
      process.exit(1);
    });

    process.on('SIGINT', () => {
      console.log('Serveur arrêté.');
      process.exit(0);
    });
  } catch (error) {
    console.error('Erreur lors de la recherche d\'un port disponible :', error);
    process.exit(1);
  }
};

startServer();
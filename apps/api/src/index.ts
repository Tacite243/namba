import express from "express";
import cors from "cors";
import routes from "./routes/index"
import prisma from "./config/db";
import bcrypt from "bcryptjs";
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { errorHandler } from "./middlewares/errorHandler";
import { config } from "./config/config";



const app = express();


app.use(express.json());
app.use(cors());
app.use(errorHandler)

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

// Configurer morgan

app.use(morgan(config.nodeEnv === 'development' ? "dev" : "combined", {stream: accessLogStream}));

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

app.listen(config.port, async () => {
  await initSuperAdmin();
  console.log(`🚀 Serveur en ligne sur http://localhost:${config.port}`);
});

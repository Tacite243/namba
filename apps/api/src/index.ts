import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import prisma from "./config/db";
import bcrypt from "bcryptjs";
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(errorHandler)

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Configurer morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Format coloré pour le développement
} else {
  app.use(morgan('combined', { stream: accessLogStream })); // Format complet pour la production
}

app.use("/api/auth", authRoutes);

const initSuperAdmin = async () => {
  const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  if (!admin) {
    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@admin.com",
        password: await bcrypt.hash("superadmin123", 10),
        role: "SUPER_ADMIN",
      },
    });
    console.log("Super Admin créé !");
  }
};

app.listen(3000, async () => {
  await initSuperAdmin();
  console.log("🚀 Serveur en ligne sur http://localhost:3000");
});

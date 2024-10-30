require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

startServer();
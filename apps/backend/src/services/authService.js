const prisma = require("@prisma/client").PrismaClient;
const { hashPassword, comparePassword } = require("../utils/passwordHash");
const { generateToken } = require("../utils/jwt");

const db = new prisma();

exports.registerUser = async (username, phoneNumber, password) => {
    const hashedPassword = await hashPassword(password);
    return db.user.create({
        data: {
            username: username,
            phoneNumber: phoneNumber,
            password: hashedPassword
        }
    })
};

exports.generateToken = (user) => {
    return generateToken(user);
}

exports.loginUser = async (phoneNumber, password) => {
    const user = await db.user.findUnique({
        where: { phoneNumber: phoneNumber }
    });
    if (!user || !(await comparePassword(password, user.password))) return null;

    const token = generateToken(user);
    return { token, user };
}
import prisma from "../utils/prisma.config.js";
import vars from "../utils/vars.js";

const create = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validation initiale
  if (!username || !password) {
    return vars.setResponse(
      res,
      "Le nom d'utilisateur et le mot de passe sont obligatoires",
      vars.status.BAD_REQUEST.code
    );
  }

  try {
    // Vérification des doublons
    const verifyUserName = await prisma.user.findUnique({
      where: { username },
    });
    let verifyEmail = null;
    if (email) verifyEmail = await prisma.user.findUnique({ where: { email } });

    if (verifyUserName || verifyEmail) {
      return vars.setResponse(
        res,
        "Un utilisateur avec le même username ou email existe déjà",
        vars.status.CONFLICT.code
      );
    }
    const passwordHash = await vars.encryptPassword(password);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        username,
        email: email || null,
        password: passwordHash,
        role: role || "USER",
      },
      select: {
        username: true,
        email: true,
        role: true,
      },
    });

    const token = vars.generateToken(user.id, user.role);

    console.log("VERIFICATION CODE : " + user.password);
    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      { user, token }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);

    // Gestion des erreurs internes
    return vars.setResponse(
      res,
      vars.status.INTERNAL_SERVER_ERROR.message,
      vars.status.INTERNAL_SERVER_ERROR.code,
      error
    );
  }
};

const connexion = async (req, res) => {
  const { username, password } = req.body;

  // Validation initiale
  if (!username || !password) {
    return vars.setResponse(
      res,
      "Le nom d'utilisateur et le mot de passe sont obligatoires",
      vars.status.BAD_REQUEST.code
    );
  }

  try {
    // Vérification des doublons
    const verifyUserName = await prisma.user.findUnique({
      where: { username },
    });

    if (!verifyUserName) {
      return vars.setResponse(
        res,
        `L'utilisateur ${user} n'existe pas`,
        vars.status.NOT_FOUND.code
      );
    }

    const isMatch = await vars.verifyPassword(
      password,
      verifyUserName.password
    );

    if (!isMatch) {
      return vars.setResponse(
        res,
        vars.status.UNAUTHORIZED.message,
        vars.status.UNAUTHORIZED.code
      );
    }

    const token = vars.generateToken(verifyUserName.id, verifyUserName.role);

    console.log("VERIFICATION CODE : " + verifyUserName.password);
    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      { token }
    );
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);

    // Gestion des erreurs internes
    return vars.setResponse(
      res,
      vars.status.INTERNAL_SERVER_ERROR.message,
      vars.status.INTERNAL_SERVER_ERROR.code,
      error
    );
  }
};

export default { create, connexion };

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

const createCollector = async (req, res) => {
  const { username, email, password, name } = req.body;

  // Validation initiale
  if (!username || !name) {
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

    if (verifyUserName) {
      return vars.setResponse(
        res,
        "Un utilisateur avec le même username ou email existe déjà",
        vars.status.CONFLICT.code
      );
    }
    const passwordHash = await vars.encryptPassword(username);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        username,
        email: email,
        password: passwordHash,
        role: "COLLECTOR",
      },
      select: {
        username: true,
        email: true,
        role: true,
        name: true,
      },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      user
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

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "USER" },

      select: {
        id: true,
        username: true,
        email: true,
        name: true,
      },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      users
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

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return vars.setResponse(
        res,
        vars.status.NOT_ACCEPTABLE.message,
        vars.status.NOT_ACCEPTABLE.code
      );

    if (req.user.role === "USER" && id !== req.user.id)
      return vars.setResponse(
        res,
        vars.status.FORBIDDEN.message,
        vars.status.FORBIDDEN.code
      );

    const user = await prisma.user.findFirst({ where: { id: req.params.id } });

    if (!user)
      return vars.setResponse(
        res,
        vars.status.NOT_FOUND.message,
        vars.status.NOT_FOUND.code
      );

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      user
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

const getCollectors = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "COLLECTOR" },

      select: {
        id: true,
        username: true,
        email: true,
        name: true,
      },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      users
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

const getOneCollector = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return vars.setResponse(
        res,
        vars.status.NOT_ACCEPTABLE.message,
        vars.status.NOT_ACCEPTABLE.code
      );

    if (req.user.role === "COLLECTOR" && id !== req.user.id)
      return vars.setResponse(
        res,
        vars.status.FORBIDDEN.message,
        vars.status.FORBIDDEN.code
      );

    const user = await prisma.user.findFirst({ where: { id: req.params.id } });

    if (!user)
      return vars.setResponse(
        res,
        vars.status.NOT_FOUND.message,
        vars.status.NOT_FOUND.code
      );

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      user
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

const updateProfilPassword = async (req, res) => {
  const user = req.user;
  const { password, password_confirm, ancien_password } = req.body;

  if (!user) {
    return vars.setResponse(
      res,
      vars.status.UNAUTHORIZED.message,
      vars.status.UNAUTHORIZED.code
    );
  }

  try {
    // Récupérer le mot de passe haché stocké en base de données
    const storedUser = await prisma.user.findFirst({ where: { id: user.id } });

    if (!storedUser) {
      return vars.setResponse(
        res,
        vars.status.NOT_FOUND.message,
        vars.status.NOT_FOUND.code
      );
    }

    // Vérifier si l'ancien mot de passe est correct
    const isOldPasswordCorrect = await bcrypt.compare(
      ancien_password,
      storedUser.password
    );

    if (!isOldPasswordCorrect) {
      return vars.setResponse(
        res,
        "Ancien mot de passe incorrect.",
        vars.status.UNAUTHORIZED.code
      );
    }

    // Vérifier si les nouveaux mots de passe sont identiques
    if (password !== password_confirm) {
      return vars.setResponse(
        res,
        "Les nouveaux mots de passe ne correspondent pas.",
        vars.status.BAD_REQUEST.code
      );
    }

    // Vérifier la force du nouveau mot de passe
    if (!vars.isPasswordStrong(password)) {
      return vars.setResponse(
        res,
        "Le nouveau mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial..",
        vars.status.BAD_REQUEST.code
      );
    }

    // Hasher le nouveau mot de passe
    const newHashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour le mot de passe
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newHashedPassword },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code
    );
  } catch (error) {
    console.error(error);
    return vars.setResponse(
      res,
      vars.status.INTERNAL_SERVER_ERROR.message,
      vars.status.INTERNAL_SERVER_ERROR.code
    );
  }
};

export default {
  create,
  connexion,
  getUsers,
  getOneUser,
  createCollector,
  getCollectors,
  getOneCollector,
  updateProfilPassword,
};

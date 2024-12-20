import prisma from "../utils/prisma.config.js";
import vars from "../utils/vars.js";

const isAvailable = async (req, res) => {
  const { longitude, latitude } = req.body;

  const userId = req.user.id;

  // Validation initiale
  if (!userId || !longitude || !latitude) {
    return vars.setResponse(
      res,
      "L'utilisateur, la longitude et la latitude sont obligatoires",
      vars.status.BAD_REQUEST.code
    );
  }

  try {
    // Créer une commande
    const verifyUser = await prisma.user.findFirst({
      where: { id: userId, role: "COLLECTOR" },
    });

    if (!verifyUser)
      return vars.setResponse(
        res,
        vars.status.NOT_FOUND.message,
        vars.status.NOT_FOUND.code
      );

    await prisma.availability.deleteMany({ where: { userId } });

    const availability = await prisma.availability.create({
      data: {
        longitude,
        latitude,
        userId,
        available: true,
      },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      availability
    );
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);

    // Gestion des erreurs internes
    return vars.setResponse(
      res,
      vars.status.INTERNAL_SERVER_ERROR.message,
      vars.status.INTERNAL_SERVER_ERROR.code,
      error
    );
  }
};

const isDesable = async (req, res) => {
  const userId = req.user.id;
  const availabilityId = req.params.id;

  try {
    const verifyUser = await prisma.user.findFirst({
      where: { id: userId, role: "COLLECTOR" },
    });

    const verifyAvailable = await prisma.availability.findFirst({
      where: { id: availabilityId },
    });

    if (!verifyUser || !verifyAvailable)
      return vars.setResponse(
        res,
        vars.status.NOT_FOUND.message,
        vars.status.NOT_FOUND.code
      );

    const availability = await prisma.availability.update({
      where: { userId },
      data: {
        available: false,
      },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      availability
    );
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);

    // Gestion des erreurs internes
    return vars.setResponse(
      res,
      vars.status.INTERNAL_SERVER_ERROR.message,
      vars.status.INTERNAL_SERVER_ERROR.code,
      error
    );
  }
};

export default {
  isAvailable,
  isDesable,
};

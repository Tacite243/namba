import prisma from "../utils/prisma.config.js";
import vars from "../utils/vars.js";

const create = async (req, res) => {
  const { phone, longitude, latitude } = req.body;

  // Validation initiale
  if (!phone || !longitude || !latitude) {
    return vars.setResponse(
      res,
      "Le numero, la longitude et la latitude sont obligatoires",
      vars.status.BAD_REQUEST.code
    );
  }

  try {
    const clientId = req.user.id;

    // Créer une commande
    const order = await prisma.order.create({
      data: { clientId },
    });

    await prisma.location.deleteMany({ where: { clientId } });

    const userLocalisation = await prisma.location.create({
      data: {
        longitude,
        latitude,
        userId,
      },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      { order, userLocalisation }
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

const setAssiged = async (req, res) => {
  const { collectorId } = req.body;
  const orderId = req.params.id;
  // Validation initiale
  if (!collectorId || !orderId) {
    return vars.setResponse(
      res,
      "Le collecteur et la commande sont obligatoires",
      vars.status.BAD_REQUEST.code
    );
  }

  if (req.user.role === "COLLECTOR" && collectorId !== req.user.id) {
    return vars.setResponse(
      res,
      vars.status.FORBIDDEN.message,
      vars.status.FORBIDDEN.code
    );
  }

  try {
    // Verify order
    const verifyOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    const verifyCollector = await prisma.user.findUnique({
      where: { id: collectorId, role: "COLLECTOR" },
    });

    if (!verifyOrder || !verifyCollector)
      return vars.setResponse(
        res,
        "La commande ou le collecteur n'existe pas",
        vars.status.NOT_FOUND.code
      );

    const assigned = await prisma.order.update({
      where: { id: orderId },
      data: { clientId, status: "ASSIGNED", updatedAt: new Date() },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      assigned
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

const setReceived = async (req, res) => {
  const orderId = req.params.id;
  // Validation initiale
  if (!orderId) {
    return vars.setResponse(
      res,
      "La commande est obligatoires",
      vars.status.BAD_REQUEST.code
    );
  }

  try {
    // Verify order
    const verifyOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!verifyOrder)
      return vars.setResponse(
        res,
        "La commande n'existe pas",
        vars.status.NOT_FOUND.code
      );

    const received = await prisma.order.update({
      where: { id: orderId },
      data: { status: "RECEIVED" },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      received
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

const setCompleted = async (req, res) => {
  const orderId = req.params.id;
  // Validation initiale
  if (!orderId) {
    return vars.setResponse(
      res,
      "La commande est obligatoires",
      vars.status.BAD_REQUEST.code
    );
  }

  try {
    // Verify order
    const verifyOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!verifyOrder)
      return vars.setResponse(
        res,
        "La commande n'existe pas",
        vars.status.NOT_FOUND.code
      );

    const completed = await prisma.order.update({
      where: { id: orderId },
      data: { status: "COMPLETED", updatedAt: new Date() },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      completed
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

const setCanceled = async (req, res) => {
  const { collectorId } = req.body;
  const orderId = req.params.id;
  // Validation initiale
  if (!collectorId || !orderId) {
    return vars.setResponse(
      res,
      "Le collecteur et la commande sont obligatoires",
      vars.status.BAD_REQUEST.code
    );
  }

  if (req.user.role === "COLLECTOR" && collectorId !== req.user.id) {
    return vars.setResponse(
      res,
      vars.status.FORBIDDEN.message,
      vars.status.FORBIDDEN.code
    );
  }

  try {
    // Verify order
    const verifyOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    const verifyCollector = await prisma.user.findUnique({
      where: { id: collectorId, role: "COLLECTOR" },
    });

    if (!verifyOrder || !verifyCollector)
      return vars.setResponse(
        res,
        "La commande ou le collecteur n'existe pas",
        vars.status.NOT_FOUND.code
      );

    const canceled = await prisma.order.update({
      where: { id: orderId },
      data: { clientId, status: "CANCELED", updatedAt: new Date() },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      canceled
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

const setDone = async (req, res) => {
  const orderId = req.params.id;
  // Validation initiale
  if (!orderId) {
    return vars.setResponse(
      res,
      "La commande est obligatoires",
      vars.status.BAD_REQUEST.code
    );
  }

  try {
    // Verify order
    const verifyOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!verifyOrder)
      return vars.setResponse(
        res,
        "La commande n'existe pas",
        vars.status.NOT_FOUND.code
      );

    if (req.user.id !== verifyOrder.clientId) {
      return vars.setResponse(
        res,
        vars.status.FORBIDDEN.message,
        vars.status.FORBIDDEN.code
      );
    }

    const done = await prisma.order.update({
      where: { id: orderId },
      data: { status: "DONE", updatedAt: new Date() },
    });

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      done
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

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      orders
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

const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return vars.setResponse(
        res,
        vars.status.NOT_ACCEPTABLE.message,
        vars.status.NOT_ACCEPTABLE.code
      );

    const order = await prisma.order.findFirst({
      where: { id: req.params.id },
    });

    if (!order)
      return vars.setResponse(
        res,
        vars.status.NOT_FOUND.message,
        vars.status.NOT_FOUND.code
      );

    return vars.setResponse(
      res,
      vars.status.SUCCESS.message,
      vars.status.SUCCESS.code,
      order
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

export default {
  create,
  setAssiged,
  setReceived,
  setCompleted,
  setCanceled,
  setDone,
  getOrders,
  getOneOrder,
};

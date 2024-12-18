import vars from "./vars.js";
import { validationResult, body } from "express-validator";

const ValidateFields = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`)
      .join(", ");
    vars.setResponse(
      res,
      `${errorMessages}`,
      vars.status.UNPROCESSABLE_ENTITY.code,
      req.body
    );
  } else {
    next();
  }
};

const createAccount = [
  body("username")
    .notEmpty()
    .withMessage("Le nom d'utilisateur est requis")
    .isLength({ min: 4, max: 15 })
    .withMessage("Le nom d'utilisateur doit contenir entre 4 et 15 caractères"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Veuillez fournir une adresse email valide"),

  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .matches(/[A-Z]/)
    .withMessage("Le mot de passe doit contenir au moins une lettre majuscule")
    .matches(/[a-z]/)
    .withMessage("Le mot de passe doit contenir au moins une lettre minuscule")
    .matches(/\d/)
    .withMessage("Le mot de passe doit contenir au moins un chiffre")
    .matches(/[@$!%*?&#]/)
    .withMessage(
      "Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, ?, &, #)"
    ),

  body("role")
    .optional() // Le rôle est optionnel
    .isIn(["ADMIN", "USER", "GATHERER"])
    .withMessage(
      "Le rôle doit être l'un des suivants : ADMIN, USER ou GATHERER"
    ),
];

const ValidateData = (TabValidator) => [TabValidator, ValidateFields];

export default { ValidateData, createAccount };

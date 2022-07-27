import { validationResult, body } from "express-validator";

export const validationUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array()[0].msg);
  }
  next();
};

export const registerValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("* Email is not valid")
    .isLength({ min: 5 })
    .withMessage("* Email must be at least 5 characters long")
    .isLength({ max: 30 })
    .withMessage("* Email must be less than 30 characters long"),
  body("username")
    .trim()
    .isLength({ max: 12 })
    .withMessage("* Username must be at least 12 characters long")
    .isLength({ min: 5 })
    .withMessage("* Username must be at least 5 characters long"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("* Password must be at least 5 characters long")
    .isLength({ max: 30 })
    .withMessage("* Password must be less than 30 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirmation) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  validationUser,
];

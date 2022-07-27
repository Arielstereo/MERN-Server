import { validationResult, body } from "express-validator";

export const validationPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(errors.array()[0].msg);
  }
  next();
};

export const postValidator = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("* Title must have at least 5 characters long")
    .isLength({ max: 20 })
    .withMessage("* Title must have at least 20 characters long"),
  body("content")
    .trim()
    .isLength({ min: 10 })
    .withMessage("* Message must have at least 10 characters long")
    .isLength({ max: 256 })
    .withMessage("* Message must be less than 30 characters long"),
  validationPost,
];

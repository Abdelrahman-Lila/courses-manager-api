import { body } from "express-validator";

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("the minimum length is: 2"),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isInt({ min: 1 })
      .withMessage("You didn't enter a number")
      .toInt(),
  ];
};

export { validationSchema };

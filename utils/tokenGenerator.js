import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

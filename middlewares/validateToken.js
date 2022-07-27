import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        error: "Token not found",
      });
    }
    token = token.split(" ")[1]; //esto para eliminar el espacio entre bearer y el token!
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(500).json({
      error: "Token invalid",
    });
  }
};

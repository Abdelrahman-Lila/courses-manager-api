import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = (req, res, next) => {
  const header = req.headers["authorization"] || req.headers["Authorization"];
  if (!header) {
    return res.status(400).json("token is required");
  }

  const token = header.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_secret_key);
    req.currentRole = currentUser.role;
    next();
  } catch (error) {
    return res.status(400).json("invalid token");
  }
};

export default verifyJWT;

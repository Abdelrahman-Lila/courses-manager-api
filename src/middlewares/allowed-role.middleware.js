const allowedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentRole)) {
      return res.status(401).json({ error: "you don't have permission" });
    }
    next();
  };
};

export default allowedRole;

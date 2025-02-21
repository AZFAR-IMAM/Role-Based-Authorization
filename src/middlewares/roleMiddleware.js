const authorizeRole = (...xyz) => {
  return (req, res, next) => {
    if (!xyz.includes(req.user.role)) {
      return res.status(403).json({ message: " Access Denied" });
    }
    next();
  };
};

module.exports = authorizeRole;

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization || req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded user is:", req.user);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token not valid" });
    }
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            res.sensStatus(403);
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("verified:", verified);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = verifyJWT;

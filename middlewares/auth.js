const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Accès refusé, token manquant" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || "secret123");
    req.artisanId = decoded.id; // On stocke l'id de l'artisan
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token invalide" });
  }
};

module.exports = auth;

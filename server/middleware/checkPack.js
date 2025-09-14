// middlewares/checkPack.js
module.exports = (req, res, next) => {
  const { pack } = req.body;

  if (!pack || isNaN(pack) || Number(pack) <= 0) {
    return res.status(400).json({ error: "Pack must be greater than 0" });
  }

  next();
};

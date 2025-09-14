// middlewares/checkCard.js
module.exports = (req, res, next) => {
  const { card } = req.body;

  if (!card || isNaN(card) || Number(card) <= 1000) {
    return res.status(400).json({ error: "Card must be greater than 1000" });
  }

  next();
};

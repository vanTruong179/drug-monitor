// middlewares/checkPerDay.js
module.exports = (req, res, next) => {
  const { perDay } = req.body;

  if (!perDay || isNaN(perDay) || Number(perDay) <= 0 || Number(perDay) >= 90) {
    return res.status(400).json({ error: "PerDay must be more than 0 and less than 90" });
  }

  next();
};

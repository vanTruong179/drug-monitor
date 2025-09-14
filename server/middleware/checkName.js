// middlewares/checkName.js
module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length <= 5) {
    return res.status(400).json({ error: "Name must be longer than 5 characters" });
  }

  next();
};

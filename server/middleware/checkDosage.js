// middlewares/checkDosage.js
module.exports = (req, res, next) => {
  const { dosage } = req.body;
  const regex = /^\d+-morning,\d+-afternoon,\d+-night$/;

  if (!dosage || !regex.test(dosage)) {
    return res.status(400).json({ error: "Dosage must follow format: XX-morning,XX-afternoon,XX-night" });
  }

  next();
};

// Validates required fields before the request hits the controller
const validateProduct = (req, res, next) => {
  const { name, category, price } = req.body;
  const errors = [];

  if (!name || name.trim() === "") errors.push("Name is required");
  if (!category) errors.push("Category is required");
  if (price === undefined || price === "") errors.push("Price is required");
  if (price !== undefined && price < 0) errors.push("Price cannot be negative");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next(); // All good — proceed to controller
};

module.exports = { validateProduct };

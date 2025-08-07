// utils/formatDate.js
exports.formatDate = (date = new Date()) => {
  return date.toISOString().split('T')[0]; // Ej: "2025-08-06"
};

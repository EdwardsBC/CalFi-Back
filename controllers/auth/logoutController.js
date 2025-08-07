exports.logout = async (req, res) => {
  // Con JWT, el logout se maneja simplemente eliminando el token del lado del cliente.
  return res.status(200).json({ success: true, message: 'Sesión cerrada correctamente.' });
};

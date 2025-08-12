// server.js
const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

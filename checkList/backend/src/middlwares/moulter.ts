const multer = require('multer');

// Configurar o multer para armazenar arquivos em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;

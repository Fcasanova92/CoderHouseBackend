import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDoc = JSON.parse(fs.readFileSync(path.join(__dirname, './user.json'), 'utf8'));

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de eCommerce',
    version: '1.0.0',
    description: 'Documentación de endpoints del sistema',
  },
  servers: [
    { url: 'http://localhost:8080/api', description: 'Servidor local' }
  ],
  tags: [
    ...(usersDoc.tags || []),
  ],
  paths: {
    ...usersDoc.paths,
  },
  components: {
    ...usersDoc.components,
  }
};

export { swaggerUi, swaggerDocument };

# Usamos Node.js Alpine
FROM node:20-alpine

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos dependencias de producción
RUN npm install

# Copiamos todo el proyecto al contenedor
COPY . .

EXPOSE 8080

CMD ["node", "src/server.js"]
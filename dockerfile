# Utiliza la imagen oficial de Node.js LTS basada en Alpine Linux
FROM node:lts-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de instalación de dependencias
COPY package.json pnpm-lock.yaml /app/

# Instala las dependencias
RUN npm install -g pnpm && pnpm install --force

# Copia el resto de los archivos
COPY . /app/

# Expone el puerto en el que se ejecutará la aplicación (por ejemplo, 3000)
EXPOSE 3000

# Comando para iniciar la aplicación (ajústalo según tus necesidades)
CMD ["pnpm", "run", "dev"]

# Comando para crear la imagen:
#
#   docker build -t inmuno-alpine-pnpm .

# Comando para crear el contenedor:
#
#   docker run -d --name inmunosalud-fe -p 3000:3000 -v ${PWD}:/app inmuno-alpine-pnpm
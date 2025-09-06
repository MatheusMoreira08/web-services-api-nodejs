# Use uma imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código da sua aplicação
COPY . .

# Expõe a porta que sua aplicação usa
EXPOSE 3001

# Comando para iniciar sua aplicação
CMD [ "npm", "start" ]
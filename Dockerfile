# Estágio 1: Definir a base
FROM node:22-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar PRIMEIRO os arquivos de dependência
COPY package.json package-lock.json ./

# Instalar TODAS as dependências (incluindo as de desenvolvimento)
RUN npm install

# Agora, copiar o resto do código do seu projeto
COPY . .

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
// src/server.js

require('module-alias/register');

const app = require('./app');
const sequelize = require('src/Infrastructure/Persistence/Sequelize/database');
const { connectRedis } = require('src/Infrastructure/Persistence/Redis/RedisClient');
const config = require('src/config/index');

const PORT = config.server.port;

async function startServer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Database connected and synchronized!');

        await connectRedis();


        app.listen(PORT, () => {
            console.log('🚀 Servidor rodando com sucesso!');

            console.log(`📚 Documentação Swagger: http://localhost:${PORT}`);
            console.log(`🔗 Acesso geral via API em: http://localhost:${PORT}`);
        });


    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Sai do processo com erro
    }
}

startServer();

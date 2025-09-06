require('dotenv').config();

// Objeto principal de configuração da aplicação
const appConfig = {
    server: { port: process.env.PORT || 3001 },
    db: {
        dialect: process.env.DB_DIALECT || 'postgres',
        url: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/exemplo_node',
    },
    jwt: {
        secret: 'minhaChaveSuperSecreta123', 
        expiresIn: '1h'
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        password: process.env.REDIS_PASSWORD || null,
    },
};


module.exports = {
    
    ...appConfig,

    development: {
        url: appConfig.db.url,
        dialect: appConfig.db.dialect,
    },
    test: {
        url: appConfig.db.url,
        dialect: appConfig.db.dialect,
    },
    production: {
        url: appConfig.db.url,
        dialect: appConfig.db.dialect,
    },
};
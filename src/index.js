import express from 'express';
import winston from 'winston';
import cors from 'cors';

import routerPokemons from './router/pokemons.js';
import routerClients from './router/clients.js';
import routerSales from './router/sales.js';

//configuracao do logger utilizando o Winston
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'poke-api.log' })
    ],
    format: combine(
        label({ label: 'poke-api' }),
        timestamp(),
        myFormat
    )
})

const app = express();
app.use(express.json());
app.use(cors());

//Rotas
app.use('/pokemon', routerPokemons);
app.use('/client', routerClients);
app.use('/sales', routerSales);

// Todas as Rotas que der Erro, o Next direcionará para o logger e o 
//retorno para o usuario.
app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

app.listen(3000, async () => {
    console.log('server on!');

}); 
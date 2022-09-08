import salesService from '../service/sales.service.js';

async function novoSales(req, res, next) {
    try {
        let sales = req.body;
        if (!sales.client_id || !sales.pokemon_id || !sales.value || !sales.date) {
            throw new Error('todas as informacoes sao necessárias para cadastrar uma venda')
        }
        sales = await salesService.novoSales(sales);
        res.send(sales);
        logger.info(`POST /sales - ${JSON.stringify(sales)}`);
    } catch (error) {
        next(error)
    }
}

async function getAllSales(req, res, next) {
    try {
        res.send(await salesService.getAllSales())
        logger.info(`GET /sales`);
    } catch (error) {
        next(error)
    }
}

async function getSales(req, res, next) {
    try {
        res.send(await salesService.getSales(req.params.id))
        logger.info(`GET /sales:id`);
    } catch (error) {
        next(error)
    }
}

async function deleteSales(req, res, next) {
    try {
        await salesService.deleteSales(req.params.id);
        res.end();
        logger.info(`DELETE /sales/${req.params.id} `)
    } catch (error) {
        next(error)
    }
}

async function updateSales(req, res, next) {
    try {
        let sales = req.body;
        if (!sales.client_id || !sales.pokemon_id || !sales.value || !sales.date || !sales.sale_id) {
            throw new Error(`todas as informacoes sao necessárias para atualizar uma venda`)
        }
        sales = await salesService.updateSales(sales);
        res.send(sales);
        logger.info(`PUT /sales - ${JSON.stringify(sales)}`);
    } catch (error) {
        next(error)
    }
}

export default {
    novoSales,
    getAllSales,
    getSales,
    deleteSales,
    updateSales
}
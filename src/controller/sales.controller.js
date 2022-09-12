import salesService from '../service/sales.service.js';
import clientService from '../service/client.service.js';
import pokemonService from '../service/pokemon.service.js';



async function novoSales(req, res, next) {
    try {
        if(req.userClass != 'admin') throw new Error('vc nao tem permição para cadastrar vendas');
        let sales = req.body;        

        let clientVerify = await clientService.getClient(sales.client_id);
        if(!clientVerify) return res.status(404).send('cliente nao existe');
        let pokeVerify = await pokemonService.getPokemon(sales.poke_id);
        if(!pokeVerify) return res.status(404).send('Pokemon nao existe');
       
        if (!sales.client_id || !sales.poke_id || !sales.value) {
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
        if(req.userClass != 'admin') throw new Error('vc nao tem permição para cadastrar vendas');
        res.send(await salesService.getAllSales())
        logger.info(`GET /sales`);
    } catch (error) {
        next(error)
    }
}

async function getSales(req, res, next) {
    try {
        if(req.userClass != 'admin') throw new Error('vc nao tem permição para cadastrar vendas');
        
        let sales = await salesService.getSales(req.params.id);
        if(!sales) return res.status(404).send('Venda nao cadastrada/existe');

        res.send(sales);
        logger.info(`GET /sales:id`);
    } catch (error) {
        next(error)
    }
}

async function deleteSales(req, res, next) {
    try {
        if(req.userClass != 'admin') throw new Error('vc nao tem permição para cadastrar vendas');

        let sales = await salesService.getSales(req.params.id);
        if(!sales) return res.status(404).send('Venda nao cadastrada/existe');

        await salesService.deleteSales(req.params.id);
        res.end();
        logger.info(`DELETE /sales/${req.params.id} `)
    } catch (error) {
        next(error)
    }
}

async function updateSales(req, res, next) {
    try {
        if(req.userClass != 'admin') throw new Error('vc nao tem permição para cadastrar vendas');

        let sales = req.body;
        if (!sales.client_id || !sales.poke_id || !sales.value || !sales.sale_id) {
            throw new Error(`todas as informacoes sao necessárias para atualizar uma venda`)
        }

        let clientVerify = await clientService.getClient(sales.client_id);
        if(!clientVerify) return res.status(404).send('cliente nao existe');
        let pokeVerify = await pokemonService.getPokemon(sales.poke_id);
        if(!pokeVerify) return res.status(404).send('Pokemon nao existe');
        let salesVerify = await salesService.getSales(sales.sale_id);
        if(!salesVerify) return res.status(404).send('Venda nao cadastrada/existe');
  
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
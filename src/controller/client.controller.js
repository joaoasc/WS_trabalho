import clientService from '../service/client.service.js';

async function novoClient(req, res, next) {
    try {
        
        if(req.userClass != 'admin') throw new Error('vc nao tem permição para cadastrar clientes');

        let client = req.body;
        if (!client.nome || !client.endereco || !client.cidade || !client.sexo) {
            throw new Error('todas as informacoes sao necessárias para cadastrar o cliente')
        }
        client = await clientService.novoClient(client);
        res.send(client);
        logger.info(`POST /client - ${JSON.stringify(client)}`);

    } catch (error) {
        next(error)
    }
}

async function getClients(req, res, next) {
    try {
        if(req.userClass != 'admin') throw new Error('vc nao tem permição para consultar clientes');
        res.send(await clientService.getClients())
        logger.info(`GET /client`);
    } catch (error) {
        next(error)
    }
}

async function getClient(req, res, next) {
    try {
        if(req.userClass != 'admin') throw new Error('vc nao tem permição para consultar clientes');
        let client = await clientService.getClient(req);
        if(!client) return res.status(404).send('cliente nao existe');
        res.send(client);
        logger.info(`GET /client:id`);
    } catch (error) {
        next(error)
    }
}

async function deleteClient(req, res, next) {
    try {

        if(req.userClass != 'admin') throw new Error('vc nao tem permição para deletar clientes');
        let client = await clientService.getClient(req);
        if(!client) return res.status(404).send('cliente nao existe');

        await clientService.deleteClient(req.params.id);
        res.end();
        logger.info(`DELETE /client/${req.params.id} `)
    } catch (error) {
        next(error)
    }
}

async function updateClient(req, res, next) {
    try {

        if(req.userClass != 'admin') throw new Error('vc nao tem permição para atualizar clientes');
        req.params.id = req.body.client_id;
        let client = await clientService.getClient(req);
        if(!client) return res.status(404).send('cliente nao existe');

        client = req.body;
        if (!client.nome || !client.endereco || !client.cidade || !client.sexo || !client.client_id) {
            throw new Error('todas as informacoes sao necessárias para atualizar o cliente')
        }
        client = await clientService.updateClient(client);
        res.send(client);
        logger.info(`PUT /client - ${JSON.stringify(client)}`);
    } catch (error) {
        next(error)
    }
}

export default {
    novoClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}
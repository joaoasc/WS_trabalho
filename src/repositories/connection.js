import pg from "pg";

async function connect(){
    // verifica se existi a POOL de conexão, caso sim retorna a mesma
    if(global.connection){
        return global.connection.connect();
    };

    // cria pool de conexao
    const pool = new pg.Pool({
        connectionString: 'postgres://erwzsbix:X8pI0GVzG_E59ITYD31xpsacnIr8ZgB0@kesavan.db.elephantsql.com/erwzsbix'
    });
    global.connection = pool;
    
    return pool.connect();
};

export{
    connect
};
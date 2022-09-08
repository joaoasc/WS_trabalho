import salesRepository from "../repositories/sales.repository.js";

async function novoSales(sales) {
    return await salesRepository.insertSales(sales)
};

async function getAllSales() {
    return await salesRepository.getAllSales()
};

async function getSales(id) {
    return await salesRepository.getSales(id)
};

async function deleteSales(id) {
    await salesRepository.deleteSales(id)
}

async function updateSales(sales) {
    return await salesRepository.updateSales(sales);
}

export default {
    novoSales,
    getAllSales,
    getSales,
    deleteSales,
    updateSales
}
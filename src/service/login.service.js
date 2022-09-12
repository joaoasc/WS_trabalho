import loginRepository from "../repositories/login.repository.js";

async function login(user) {
    
    return await loginRepository.login(user)
};

export default {
    login
}
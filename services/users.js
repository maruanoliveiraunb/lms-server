const User = require('../models/user');
const Request = require('./request');

class Users {
    constructor({ id, name, email }) {
        this.name = name;
        this.email = email;
        this.id = id;
    }

    static async getByName(name) {
        const result = await User.findOne({ name }).exec();
        if (result) {
            return Request.success(result, 'Usuário encontrado');
        }
        return Request.error(result, 'Falha ao encontrar usuário');
    }

    static async getById(id) {
        const result = await User.findById(id).exec();
        if (result) {
            return Request.success(result, 'Usuário encontrado');
        }
        return Request.error(result, 'Falha ao encontrar usuário');
    }

    static async deleteById(id) {
        const query = { _id: id };
        const result = await User.findOneAndRemove(query).exec();
        if (result) {
            return Request.success(result, 'Usuário deletado com sucesso');
        }
        return Request.error(result, 'Falha ao deletar usuário');
    }

    async insert() {
        const user = new User({ name: this.name, email: this.email });
        const result = await user.save();
        if (result) {
            return Request.success(result, 'Usuário cadastrado com sucesso');
        }
        return Request.error(result, 'Falha ao cadastrar usuário');
    }

    async update() {
        const query = { _id: this.id };
        const data = { name: this.name };
        const result = await User.findOneAndUpdate(query, data, { new: true });
        if (result) {
            return Request.success(result, 'Usuário atualizado com sucesso');
        }
        return Request.error(result, 'Falha ao atualizar usuário');
    }
}

module.exports = Users;

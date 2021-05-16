const mongoose = require('mongoose');
const Context = require('../models/context');
const Request = require('./request');

class Contexts {

    constructor({ id, name, type, users }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.users = users;
    }

    static async getByName(name) {
        const result = await Context.findOne({ name }).exec();
        if (result) {
            return Request.success(result, 'Context encontrado');
        }
        return Request.error(result, 'Falha ao encontrar context');
    }

    static async getById(id) {
        const result = await Context.findById(id).exec();
        if (result) {
            return Request.success(result, 'Context encontrado');
        }
        return Request.error(result, 'Falha ao encontrar context');
    }

    static async deleteById(id) {
        const query = { _id: id };
        const result = await Context.findOneAndRemove(query).exec();
        if (result) {
            return Request.success(result, 'Context deletado com sucesso');
        }
        return Request.error(result, 'Falha ao deletar context');
    }

    async insert() {
        const context = new Context({ name: this.name, type: this.type });
        const result = await context.save();
        if (result) {
            return Request.success(result, 'Context cadastrado com sucesso');
        }
        return Request.error(result, 'Falha ao cadastrar context');
    }

    async update() {
        const query = { _id: this.id };
        const objectIdUsers = this.users.map(user => {
            const { id, role } = user;
            return {
                role,
                _id: mongoose.Types.ObjectId(id)
            }
        });
        const data = { name: this.name, type: this.type, users: objectIdUsers };
        const result = await Context.findOneAndUpdate(query, data, { new: true });
        if (result) {
            return Request.success(result, 'Context atualizado com sucesso');
        }
        return Request.error(result, 'Falha ao atualizar context');
    }
}

module.exports = Contexts;

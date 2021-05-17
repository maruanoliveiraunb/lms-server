const mongoose = require('mongoose');
const Context = require('../models/context');
const Request = require('./request');

class Contexts {

    constructor({ id, name, type, users, lineItems }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.users = users;
        this.lineItems = lineItems;
    }

    static async getByName(name) {
        const result = await Context.findOne({ name }).populate('users').exec();
        if (result) {
            return Request.success(result, 'Context encontrado');
        }
        return Request.error(result, 'Falha ao encontrar context');
    }

    static async getById(id) {
        const result = await Context
            .findById(id)
            .populate('users.user')
            .populate('lineItems')
            .exec();
        if (result) {
            const { name, type, users, lineItems } = result;
            const newUsers = users.map(item => {
                const { role, user } = item;
                return {
                    role,
                    user,
                };
            })
            const clearedContext = {
                name,
                type,
                lineItems,
                users: newUsers,
            }
            return Request.success(clearedContext, 'Context encontrado');
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
        const objectIdUsers = this.users.map(item => {
            const { id, role } = item;
            return {
                role,
                user: mongoose.Types.ObjectId(id)
            }
        });
        const data = {
            name: this.name,
            type: this.type,
            users: objectIdUsers,
            lineItems: this.lineItems,
        };
        const result = await Context.findOneAndUpdate(query, data, { new: true });
        if (result) {
            return Request.success(result, 'Context atualizado com sucesso');
        }
        return Request.error(result, 'Falha ao atualizar context');
    }
}

module.exports = Contexts;

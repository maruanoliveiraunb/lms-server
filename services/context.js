const mongoose = require('mongoose');
const Context = require('../models/context');
const Request = require('./request');
const Roles = require('../constants/roles');

class Contexts {

    constructor({ id, name, type, users, lineItems }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.users = users;
        this.lineItems = lineItems;
    }

    static async getAll() {
        const result = await Context.find();
        if (result) {
            return Request.success(result, 'Context encontrado');
        }
        return Request.error(result, 'Falha ao encontrar context');
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
            .populate({
                path: 'lineItems',
                populate: {
                    path:  'answers',
                    model: 'Answer'
                }
            })
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
        const data = {};

        if (this.name) data.name = this.name;
        if (this.type) data.type = this.type;
        if (this.lineItems) data.lineItems = this.lineItems;
        if (this.users) {
            data.users = this.users.map(item => {
                const { id, role } = item;
                return {
                    role,
                    user: mongoose.Types.ObjectId(id)
                }
            });
        }

        const result = await Context.findOneAndUpdate(query, data, { new: true });
        if (result) {
            return Request.success(result, 'Context atualizado com sucesso');
        }
        return Request.error(result, 'Falha ao atualizar context');
    }

    static async updateLineItems(id, lineItem) {
        const query = { _id: id };
        const data = { $push: { lineItems: lineItem } };

        const result = await Context.findOneAndUpdate(query, data, { new: true });
        if (result) {
            return Request.success(result, 'Context atualizado com nova atividade com sucesso');
        }
        return Request.error(result, 'Falha ao atualizar context');
    }

    static async updateUsers(id, user) {
        const query = { _id: id };

        const userData = {
            role: Roles.LEARNER,
            user: user,
        };

        console.log('userData', userData);
        const data = { $push: { users: userData } };

        const result = await Context.findOneAndUpdate(query, data, { new: true });
        if (result) {
            return Request.success(result, 'Context atualizado com novo usuário com sucesso');
        }
        return Request.error(result, 'Falha ao atualizar context');
    }
}

module.exports = Contexts;

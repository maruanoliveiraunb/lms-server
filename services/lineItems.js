const LineItem = require('../models/lineItem');
const Request = require('./request');

class LineItems {
    constructor({ id, title, description }) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    static async getByTitle(title) {
        const result = await LineItem.findOne({ title }).exec();
        if (result) {
            return Request.success(result, 'Atividade encontrada');
        }
        return Request.error(result, 'Falha ao encontrar atividade');
    }

    static async getById(id) {
        const result = await LineItem
            .findById(id)
            .populate({
                path: 'answers',
                populate: {
                    path:  'learner',
                    model: 'User'
                }
            })
            .exec();
        if (result) {
            return Request.success(result, 'Atividade encontrada');
        }
        return Request.error(result, 'Falha ao encontrar atividade');
    }

    static async deleteById(id) {
        const query = { _id: id };
        const result = await LineItem.findOneAndRemove(query).exec();
        if (result) {
            return Request.success(result, 'Atividade deletada com sucesso');
        }
        return Request.error(result, 'Falha ao deletar atividade');
    }

    async insert() {
        const lineItem = new LineItem({ title: this.title, description: this.description });
        const result = await lineItem.save();
        if (result) {
            return Request.success(result, 'Atividade cadastrada com sucesso');
        }
        return Request.error(result, 'Falha ao cadastrar atividade');
    }

    async update() {
        const query = { _id: this.id };
        const data = {};

        if (this.title) data.title = this.title;
        if (this.description) data.description = this.description;

        const result = await LineItem.findOneAndUpdate(query, data, { new: true });
        if (result) {
            return Request.success(result, 'Atividade atualizada com sucesso');
        }
        return Request.error(result, 'Falha ao atualizar atividade');
    }

    static async updateAnswers(id, answer) {
        const query = { _id: id };
        const data = { $push: { answers: answer } };

        const result = await LineItem.findOneAndUpdate(query, data, { new: true });
        if (result) {
            return Request.success(result, 'Atividade atualizada com sucesso');
        }
        return Request.error(result, 'Falha ao atualizar atividade');
    }
}

module.exports = LineItems;

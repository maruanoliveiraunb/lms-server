const Answer = require('../models/answer');
const Request = require('./request');

class Answers {

    constructor({ id, file, feedback, grade, learner, instructor }) {
        this.id = id;
        this.file = file;
        this.feedback = feedback;
        this.grade = grade;
        this.learner = learner;
        this.instructor = instructor;
    }

    static async getById(id) {
        const result = await Answer
            .findById(id)
            .populate('learner')
            .populate('instructor')
            .exec();
        if (result) {
            return Request.success(result, 'Resposta encontrado');
        }
        return Request.error(result, 'Falha ao encontrar resposta');
    }

    static async deleteById(id) {
        const query = { _id: id };
        const result = await Answer.findOneAndRemove(query).exec();
        if (result) {
            return Request.success(result, 'Resposta deletada com sucesso');
        }
        return Request.error(result, 'Falha ao deletar resposta');
    }

    async insert() {
        const answer = new Answer({ file: this.file });
        const result = await answer.save();
        if (result) {
            return Request.success(result, 'Resposta cadastrada com sucesso');
        }
        return Request.error(result, 'Falha ao cadastrar resposta');
    }

    async update() {
        const query = { _id: this.id };
        const data = {};
        if (this.feedback) data.feedback = this.feedback;
        if (this.grade) data.grade = this.grade;
        if (this.learner) data.learner = this.learner;
        if (this.instructor) data.instructor = this.instructor;
        const result = await Answer.findOneAndUpdate(query, data, { new: true });
        if (result) {
            return Request.success(result, 'Resposta atualizada com sucesso');
        }
        return Request.error(result, 'Falha ao atualizar resposta');
    }
}

module.exports = Answers;

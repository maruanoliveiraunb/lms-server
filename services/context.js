const Context = require('../models/context');

class Contexts {

    constructor(name, type, users, id) {
        this.name = name;
        this.type = type;
        this.users = users;
        this.id = id;
    }

    async insert() {
        const context = new Context({ name: this.name, type: this.type });
        return await context.save();
    }

    async update() {
        const query = { _id: this.id };
        const data = { name: this.name, type: this.type, users: this.users };
        const result = await Context.updateOne(query, data);
        const { updatedCount } = result;
        if (updatedCount === 0) {
            return 'Falha ao atualizar o contexto';
        }
        return 'Contexto atualizado com sucesso'
    }

    async delete() {
        const query = { _id: this.id };
        const result = await Context.deleteOne(query);
        const { deletedCount } = result;
        if (deletedCount === 0) {
            return 'Falha ao deletar contexto';
        }
        return 'Contexto deletado com sucesso'
    }

}

module.exports = Contexts;

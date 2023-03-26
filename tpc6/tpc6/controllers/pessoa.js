var Pessoa = require('../models/pessoa')

//Pessoa list
module.exports.list = () => {
    return Pessoa
        .find()
        .sort({data:-1})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getPessoa = id => {
    return Pessoa.findOne({_id: id})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addPessoa = t => {
    return Pessoa.create(t)
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updatePessoa = t => {
    return Pessoa.updateOne({_id: t._id}, t)
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deletePessoa = id => {
    return Treino.deleteOne({_id: id})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}
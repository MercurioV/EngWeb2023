var mongose = require('mongoose')

var studentSchema = new mongose.Schema({
    _id: String,
    nome: String,
    gitLink: String,
    tpc1: String,
    tpc2: String,
    tpc3: String,
    tpc4: String,
    tpc5: String,
    tpc6: String,
    tpc7: String,
    tpc8: String
})

module.exports = mongose.model('student',studentSchema)
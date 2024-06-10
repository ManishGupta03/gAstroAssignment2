const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const astrologerSchema = new Schema({   
    astroId:{type : Number , required: true, unique:true},
    name:{ type : String, required : true},
    connections : {type : Number, default : 0},
    top : {type : Boolean, default : false}
});

module.exports = mongoose.model('Astrologer', astrologerSchema);
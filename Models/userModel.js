const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    userId:{type: Number , required : true, unique:true},
    name:{ type : String, required : true},
    assignedAstrologer : { type : mongoose.Schema.Types.ObjectId, ref: 'Astrologer'}
});

module.exports = mongoose.model('User', userSchema);
// 
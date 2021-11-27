const mongoose = require('mongoose')

const CateogorySchema = new mongoose.Schema({

name:{
    type:String,
    required:true
}

},

{timestamps:true}

)


module.exports = mongoose.model("Category",CateogorySchema);
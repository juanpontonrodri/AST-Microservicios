const mongoose=require("mongoose")

var usuarioSchema= new mongoose.Schema({
    nombre: {type: String},
    rol: { 
        type: String,
        enum: ["Administrador", "Cliente"]
        } ,   
   
})

//}
mongoose.model('usuario',usuarioSchema);


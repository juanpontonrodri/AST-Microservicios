const mongoose=require("mongoose")
//const Schema=mongoose.Schema

//exports = module.exports = function(app, mongoose) {
var pokemonSchema= new mongoose.Schema({
    nombre: {type: String},
    numero: { type: Number },//DE AQUI PODEMOS SACAR URL PARA IMAGEN:https://assets.pokemon.com/assets/cms2/img/pokedex/full/726.png
    generacion: {type: Number},
    region: { 
        type: String,
        enum: ["Teselia","Kanto", "Johto", "Hoenn", "Sinnoh",  "Kalos", "Alola", "Galar"]
        } ,   
    tipo: { 
        type: String,
        enum: ["Normal", "Agua", "Fuego", "Planta", "Eléctrico", "Hielo", "Lucha", "Veneno", "Tierra", "Volador", "Psiquico", "Bicho", "Roca", "Fantasma", "Dragón", "Siniestro", "Acero", "Hada"]
    },
    evolucion:{type: Boolean},
    legendario: { type: Boolean },
    cantidad: {type: Number},
    precio:{type:Number},
   // _pokemonId: {type: mongoose.Types.ObjectId
     //         }

})

//}
mongoose.model('pokemon',pokemonSchema);


//{
  //  "nombre":"juan",
   // "numero": 1,
    //"generacion":2,
    //"region":"Kanto",
    //"tipo":"Agua",
    //"evolucion":5,
    //"legendario":"true"
    //}
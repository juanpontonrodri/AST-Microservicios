
var mongoose = require("mongoose");
var Pokemon = mongoose.model("pokemon");
const ObjectId = require('mongodb').ObjectId;
//GET - Return all pokemon in the DB
const axios = require('axios');
exports.findAllpokemon = function (req, res) {
  Pokemon.find(function (err, pokemon) {
    if (err) res.send(500, err.message);

    console.log("GET /pokemon");
    res.status(200).jsonp(pokemon);
  });
};
//GET - Return a pokemon with specified ID
exports.findById = function(req, res) {
  var id = req.params.id;
  var objectId = ObjectId(id);
  console.log(id);
  console.log(objectId);
	Pokemon.find({ _id:objectId }, function(err, pokemon) {
    if(err) return res.send(500, err.message);

    console.log('GET /pokemon/id/' + req.params.id);
    
		res.status(200).jsonp(pokemon);
	});
};
//GET Return pokemon by name
exports.findByName = function (req, res) {
  var nombre = req.params.nombre;
  Pokemon.find({ nombre: nombre }, (err, pokemon) => {
    if (err) return res.status(500, err.message);
    console.log('GET /pokemon/nombre/' + req.params.nombre);
    console.log(req.body);
    res.status(200).jsonp(pokemon);
  })
}

//get rol
exports.getrol = function (req, res) {
  const id = req.params.id;
  
  axios.get(`http://localhost:3001/api/usuario/${id}`)
    .then((response) => {
      const usuariorol = response.data;
      console.log(usuariorol);
      res.status(200).json(usuariorol);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};
//GET Return pokemon by name

//POST - Insert new pokemon(s) in the DB
exports.addpokemon = function (req, res) {
  console.log("POST");
  console.log(req.body);

  var pokemonArr = req.body;

Pokemon.insertMany(pokemonArr, function (err, pokemon) {
if (err) return res.status(500).send(err.message);
return res.status(200).send({result: "Pokemon has been Added"});
 });
};

//POST - Insert a new pokemon in the DB
//exports.addpokemon = function (req, res) {
  //  console.log("POST");
   // console.log(req.body);
  
   // var pokemon = new Pokemon({
    //  nombre: req.body.nombre,
     // numero: req.body.numero,
     // generacion: req.body.generacion,
     // region: req.body.region,
     // tipo: req.body.tipo,
     // evolucion: req.body.evolucion,
     // legendario: req.body.legendario,
     // cantidad: req.body.cantidad,
     // precio: req.body.precio,
      
     
   // });
  
    //pokemon.save(function (err, pokemon) {
     // if (err) return res.status(500).send(err.message);
     // res.status(200).jsonp(pokemon);
    //});
  //};
  //PUT - Update a register already exists
  exports.updatepokemon = function (req, res) {
    console.log("PUT");
    console.log(req.body);
    
    let id = { _id : req.params.id };
   // let result = await Pokemon.deleteOne({ _id: id })
    var pokemonArr = req.body;
  
    Pokemon.updateOne(id,pokemonArr,function (err, pokemon) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(pokemon);
      
    });
  };

  //DELETE - Delete a pokemon with specified ID
////exports.deletepokemon = function (req, res) {
  //pokemon.findById(req.params.id, function (err, pokemon) {
    //pokemon.remove(function (err) {
      //if (err) return res.status(500).send(err.message);
      //res.status(200).send();
    //});
  //});
//};

//delete option

exports.deletePokemon = async function(req,res) {
try {
let id = req.params.id;
let result = await Pokemon.deleteOne({_id:id})
if(result) {
console.log('DELETE /pokemon/' + req.params.id);
return res.status(200).send({result: "Pokemon has been deleted"});
}
return res.status(200).send({result: "Not able to delete"})
}catch(error) {
  return res.status(500).send({message: error.message})
}

}

var mongoose = require("mongoose");
var Pokemon = mongoose.model("pokemon");
var Compra = mongoose.model("compra");
const ObjectId = require('mongodb').ObjectId;
const axios = require('axios');
//GET - Return all pokemon in the DB
 exports.findAllpokemon = function (req, res) {
   Pokemon.find(function (err, pokemon) {
     if (err) res.status(500, err.message);

     console.log("GET /pokemon");
     res.status(200).jsonp(pokemon);
   });
 };

//GET - Devuelve todas las compras realizadas por un cliente
exports.findAllCompras = function(req, res) {
    Compra.find(req.params.idCliente, function(err, compra) {
        if(err) return res.status(500, err.message);

        console.log("GET /compra");
        res.status(200).jsonp(compra);
    })
};

//GET - Return a compra with specified ID
exports.findCompraByID = function (req, res) {
  console.log("buscando compra por ID");
  var id = req.params.id;
  var objectId = ObjectId(id);
  Compra.find({ _id:objectId }, function (err, compra) {
    if (err) return res.status(500, err.message);

    console.log('GET /compra/id/' + req.params.id);
    console.log(compra);
    res.status(200).jsonp(compra);
  });
};

exports.findCompraByIDCliente = function (req, res) {
  var idCliente = req.params.idCliente;
  Compra.find({ idCliente: idCliente }, (err, compra) => {
    if (err) return res.status(500, err.message);

    console.log('GET /compra/idCliente/' + req.params.idCliente);
    res.status(200).jsonp(compra);
  });
};

//GET - Devuelve una compra con el ID y el ID del cliente especificados
exports.findCompraByIDAndClienteID = function (req, res) {
  console.log("buscando compra por ID y ID del cliente");
  var compraID = req.params.id;
  var clienteID = req.params.idCliente;
  Compra.find({ _id: compraID, idCliente: clienteID }, function (err, compra) {
    if (err) return res.status(500, err.message);

    console.log('GET /compra/idCompra/' + compraID + '/idCliente/' + clienteID);
    console.log(compra);
    res.status(200).jsonp(compra);
  });
};


exports.findCompraByIDClienteYNombre = function (req, res) {
  var idCliente = req.params.idCliente;
  var nombre = req.params.nombre;
  Compra.find({ idCliente: idCliente, nombre: nombre }, (err, compra) => {
    if (err) return res.status(500, err.message);

    console.log('GET /compra/idCliente/' + req.params.idCliente + '/nombre/' + req.params.nombre);
    res.status(200).jsonp(compra);
  });
};

//GET - Return a pokemon with specified ID
exports.findpokemonById = function(req, res) {
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
exports.findpokemonByName = function (req, res) {
  var nombre = req.params.nombre;
  Pokemon.find({ nombre: nombre }, (err, pokemon) => {
    if (err) return res.status(500, err.message);
    console.log('GET /pokemon/nombre/' + req.params.nombre);
    console.log(req.body);
    res.status(200).jsonp(pokemon);
  })
}

//POST - Nuevas compras en la BD
exports.addCompra = function(req,res) {
    console.log("POST");
    console.log(req.body);
    
    var compraArr = req.body;

    Compra.insertMany(compraArr, function(err, compra) {
        if(err) return res.status(500).send(err.message);
        const compraID = compra[0]._id;
        return res.status(200).send({result: compraID });
        
    });
};



//PUT - Update a register already exists
exports.updateCompra = function (req, res) {
    console.log("PUT");
    console.log(req.body);
  
    let id = { _id: req.params.id };
    // let result = await Pokemon.deleteOne({ _id: id })
    let compraArr = {
      nombre: req.body.nombre,
      direccionEnvio: req.body.direccionEnvio
    };
  
    Compra.updateOne(id, compraArr, function (err, compra) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(compra);
  
    });
};

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

exports.deleteCompra = async function (req, res) {
    try {
      let id = req.params.id;
      let result = await Compra.deleteOne({ _id: id })
      if (result) {
        console.log('DELETE /compra/' + req.params.id);

        return res.status(200).send({ result: "Compra has been deleted" });
      }
      return res.status(200).send({ result: "Not able to delete" })
    } catch (error) {
      return res.status(200).send({ message: error.message })
    }
  

};
exports.cantidadmas = function (req, res) {
    try {
      console.log("hello i am here in cantidad mas ");
      let suma = req.body.cantidad;
      const id = req.params.id;
      var objectId = ObjectId(id);
      console.log("estoy sumando a la cantidad");
      Pokemon.updateOne({ _id: objectId },{ $inc: { cantidad: suma } },function (err, pokemon) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(pokemon);

    });} catch (error) {
      return res.status(200).send({ message: error.message })
    }
  };

  exports.cantidadmenos = function (req, res) {
    try {
      const id = req.params.id;
      let pokemon = req.body.pokemon;
      var objectId = ObjectId(id);
  
      Pokemon.findOneAndUpdate({ _id: objectId }, pokemon, function (err, result) {
        if (err) {
          console.log(`Update failed: ${err.message}`);
          return res.status(400).send(err.message);
        } else {
          res.status(200).jsonp(result);
        }
      });
    } catch (error) {
      console.log(`Error: ${error.message}`);
      return res.status(500).send({ message: error.message });
    }
  };

var mongoose = require("mongoose");
var Usuario = mongoose.model("usuario");
const ObjectId = require('mongodb').ObjectId;

//GET - Return all usuarios in the DB
exports.findAllusuarios = function (req, res) {
  Usuario.find(function (err, usuarios) {
    if (err) return res.status(500).send({ message: err.message });

    console.log("GET /usuario");
    
    if (usuarios.length === 0) {
      return res.status(404).send({ message: "No se encontraron usuarios" });
    }

    res.status(200).jsonp(usuarios);
  });
};


//POST - Insert new usuario in the DB
exports.addusuario = function (req, res) {
  console.log("POST");
  console.log(req.body);

  var usuarioArr = req.body;

Usuario.insertMany(usuarioArr, function (err, usuario) {
if (err) return res.status(500).send(err.message);
const usuarioID = usuario[0]._id;
return res.status(200).send({result: usuarioID });
 });
};

//GET Return usuario by rol
exports.findByrol = function(req, res) {
  console.log("request!");
  var rol = req.params.rol;
  Usuario.find({ rol: rol }, (err, usuarios) => {
    if (err) return res.status(500).send({ message: err.message });

    console.log('GET /usuario/rol/' + req.params.rol);
    console.log(req.body);

    if (usuarios.length === 0) {
      return res.status(404).send({ message: "No se encontraron usuarios" });
    }

    res.status(200).jsonp(usuarios);
  });
};

//GET usuario by id 
Usuario.find({ _id:objectId }, function(err, usuarios) {
  if (err) return res.send(500, err.message);

  if (usuarios.length === 0) {
    return res.status(404).send("Usuario no encontrado");
  }

  const usuariorol = usuarios[0].rol;
  console.log(usuariorol);

  console.log('GET /usuario/id/' + req.params.id);
  
  res.status(200).jsonp(usuariorol);
});


  //DELETE usuario por id 
  exports.deleteUsuario = async function(req, res) {
    try {
      let id = req.params.id;
      let usuario = await Usuario.findById(id);
  
      if (!usuario) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
  
      let result = await Usuario.deleteOne({ _id: id });
  
      if (result.deletedCount) {
        console.log("DELETE /usuario/" + req.params.id);
        return res.status(200).send({ message: "Usuario ha sido eliminado" });
      }
  
      return res.status(200).send({ message: "No se pudo eliminar el usuario" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
  
    
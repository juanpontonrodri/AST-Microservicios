
var mongoose = require("mongoose");
var Usuario = mongoose.model("usuario");
const ObjectId = require('mongodb').ObjectId;

//GET - Return all usuarios in the DB
exports.findAllusuarios = function (req, res) {
    Usuario.find(function (err, usuario) {
    if (err) res.send(500, err.message);

    console.log("GET /pokemon");
    res.status(200).jsonp(usuario);
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
exports.findByrol = function (req, res) {
  console.log("request!");
    var rol = req.params.rol;
    Usuario.find({ rol: rol }, (err, usuario) => {
      if (err) return res.status(500, err.message);
      console.log('GET /usuario/rol/' + req.params.usuario);
      console.log(req.body);
      res.status(200).jsonp(usuario);
    })
  }
//GET usuario by id 
exports.findByid = function(req, res) {
  var id = req.params.id;
  var objectId = ObjectId(id);
  console.log(id);
  console.log(objectId);
	Usuario.find({ _id:objectId }, function(err, usuario) {
    const usuariorol = usuario[0].rol;
    console.log(usuariorol);
    if(err) return res.send(500, err.message);

    console.log('GET /usuario/id/' + req.params.id);
    
		res.status(200).jsonp(usuariorol);
	});
};

  //DELETE usuario por id 
  exports.deleteUsuario = async function(req,res) {
    try {
    let id = req.params.id;
    let result = await Usuario.deleteOne({_id:id})
    if(result) {
    console.log('DELETE /pokemon/' + req.params.id);
    return res.status(200).send({result: "Usuario has been deleted"});
    }
    return res.status(200).send({result: "Not able to delete"})
    }catch(error) {
      return res.status(500).send({message: error.message})
    }
    
    }
    
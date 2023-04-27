import { Injectable } from '@angular/core';
import { response } from 'express';
import Compra from './models/compra';
import { WebService } from './web.service';
import Pokemon from './models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  public rest = true
  public success = false
  public failure = false
  constructor(private webService: WebService) { }

  getCompras() {
    return this.webService.get(`api/compra`);
  }

  getPokemons() {
    return this.webService.get(`api/pokemon`);
  }

  getCompraByID(_id: string) {
    return this.webService.get(`api/compra/id/${_id}`);
  }

  getCompraByIDAndClienteID(_id: string, idCliente: string) {
    return this.webService.get(`api/compra/idCompra/${_id}/idCliente/${idCliente}`)}

  getCompraByIDCliente(idCliente: string) {
    return this.webService.get(`api/compra/idCliente/${idCliente}`);
  }

  getCompraByIDClienteYNombre(idCliente: string, nombre: string) {
    return this.webService.get(`api/compra/idCliente/${idCliente}/nombre/${nombre}`);
  }

  createCompra(idArticulo: string, idCliente: string, cantidad: number, nombre: string, direccionEnvio: string) {

    return this.webService.post(`api/compra`, { idArticulo, idCliente, cantidad, nombre, direccionEnvio })
  }

  deleteCompra(_id: string) {
    return this.webService.delete(`api/compra/id/${_id}`);
  }

  putCompra(_id: string, idArticulo: string, idCliente: string, cantidad: number, nombre: string, direccionEnvio: string) {
    return this.webService.put(`api/compra/id/${_id}`, { _id, idArticulo, idCliente, cantidad, nombre, direccionEnvio })
  }

  putsumarCantidad(_id: string, cantidad: number) {
    console.log("sumas al pokemon con id :"+_id+ " un valor a su cantidad de :"+cantidad);
    return this.webService.put(`api/pokemon/id/mas/${_id}`, { _id, cantidad })
  }
  putrestarCantidad(_id: string, pokemon: Pokemon) {
    return this.webService.put(`api/pokemon/id/menos/${_id}`, { _id, pokemon })
  }
  getuserrol(id: string){
   
    return this.webService.get(`api/compra/user/${id}`);
  }
  getPokemonByID(_id: string) {
    return this.webService.get(`api/pokemon/id/${_id}`);
  }
  getPokemonByName(_nombre: string) {
    return this.webService.get(`api/pokemon/nombre/${_nombre}`);
  }
}

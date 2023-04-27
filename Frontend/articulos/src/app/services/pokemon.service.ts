import { Injectable } from '@angular/core';
import { response } from 'express';
import { map } from 'rxjs';
import { WebService } from './webservice.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
 
  constructor(private webService: WebService) { }
 
  idUser!: string; 

  getPokemons() {
    return this.webService.get('api/pokemon');
  }
  getPokemonByID(_id: string) {
    return this.webService.get(`api/pokemon/${_id}`);
  }
  getPokemonByName(_nombre: string) {
    return this.webService.get(`api/pokemon/nombre/${_nombre}`);
  }
  
  createPokemon(nombre:string, numero: Number, generacion: Number, region: string, tipo:  string , evolucion: boolean, legendario: boolean, cantidad: number, precio: number) {

    return this.webService.post('api/pokemon', {nombre,  numero, generacion, region, tipo, evolucion, legendario, cantidad, precio })
  }
  deletePokemon(_id: string) {
    return this.webService.delete(`api/pokemon/${_id}`);
  }
  putPokemon(_id: string, nombre: String, numero: Number, generacion: Number, region: string, tipo: string , evolucion: boolean, legendario: boolean, cantidad: number, precio: number){
    return this.webService.put(`api/pokemon/${_id}`,{ _id,nombre, numero, generacion, region, tipo, evolucion, legendario, cantidad, precio })
  }
  getuserrol(id: string){
   
    return this.webService.get(`api/pokemon/user/${id}`);
  }
}

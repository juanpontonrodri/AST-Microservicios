import { Injectable } from '@angular/core';
import { response } from 'express';
import Usuario from '../models/usuario';
import { WebService } from './webservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public rest = true
  public success = false
  public failure = false
  http: any;
  constructor(private webService: WebService) { }


  getUsuario() {
    return this.webService.get(`api/usuario`);
  }

  getUsuarioByID(_id: string) {
    return this.webService.get(`api/usuario/${_id}`)
  }
 
  createUsuario(nombre: String, rol:String) {

    return this.webService.post(`api/usuario`, { nombre, rol })
  }
  deleteUsuario(_id: string) {
    return this.webService.delete(`api/usuario/${_id}`);
  }

  findUsuario(_id: string){
    return this.webService.get(`api/usuario/${_id}`)
  }
  findbyrol(rol :string){
    return this.webService.get(`api/usuario/rol/${rol}`)
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Pokemon from 'src/app/models/pokemon';
import {CompraService } from 'src/app/compra.service'
import Compra from 'src/app/models/compra';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

interface UsuarioResponse {
  result: string;
}
@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent implements OnInit{
  compraSeleccionada!: Compra
  showpokemonflag=false;
  showcompraform=false;
  showmodifyflag=false;
  usuariorol!: string;
  pokemonSeleccionado!: Pokemon;
  success = false;
  failure = false;
  pokemons: Pokemon[] = [];
  compras: Compra[] = [];
  compra!: Compra;
  url1: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
  url2: string = ".png";
  finalurl: string = "726";
  idPokemon: any;
  cantidadPokemon: any;
  idCliente!: string;
  showlistacompra=false;
  
  
constructor(private CompraService: CompraService, private _snackBar: MatSnackBar) {}
@Output() rstatus = new EventEmitter<boolean>();
ngOnInit() {
  this.CompraService.getPokemons()
  .subscribe((pokemons: any)=> this.pokemons = pokemons);
}

checkUserRole(id: string, allowedRoles: string[]): Observable<boolean> {
  return this.CompraService.getuserrol(id).pipe(
    map((data: any) => {
      const userRole = data.toString();
      console.log(userRole);
      if (allowedRoles.includes(userRole)) {
        console.log("you have access");
        return true;
      } else {
        console.log("you better get out of here");
        return false;
      }
    })
  );
}


getcompra(id: string){
  
  this.checkUserRole(id, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess) {
      this.CompraService.getCompraByIDCliente(id).subscribe((compras: any)=> this.compras = compras);
      this.showlistacompra=true;
      this.showpokemonflag=false;
    }
  });
}

getcomprabyID(id: string ,id_compra : string){
  console.log(id_compra);
  console.log(id);
  this.showlistacompra=false;
  this.showpokemonflag=false;
  this.checkUserRole(id, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess) {
      this.CompraService.getCompraByIDAndClienteID(id_compra,id).subscribe((compras: any)=> this.compras = compras);
      
        this.showlistacompra=true;
        this.showpokemonflag=false;
      
      
  
      
    }
    else{
      this.showlistacompra=false;
      this.showpokemonflag=false;
    }
  });
}


/* getcomprabyID(id: string ,id_compra : string){
  console.log(id_compra);
  console.log(id);
  this.showlistacompra=false;
  this.showpokemonflag=false;
  this.checkUserRole(id, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess) {
      this.CompraService.getCompraByID(id_compra).subscribe((compras: any)=> this.compras = compras);
      if(this.compras[0].idCliente===id){
        console.log(this.compras[0]._id);
        console.log(id);
        this.showlistacompra=true;
        this.showpokemonflag=false;
      }else{
        this.showlistacompra=false;
        this.showpokemonflag=false;
      }
      
  
      
    }
  });
} */

getcomprabynombre(id: string, nombre: string){
  this.checkUserRole(id, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess) {
      this.CompraService.getCompraByIDClienteYNombre(id,nombre).subscribe((compras: any)=> this.compras = compras);
      this.showlistacompra=true;
      this.showpokemonflag=false;
    }
  });
}


eliminarcompra(id_usuario:string, id_cliente:string,id:string, id_pokemon : string , cantidad : number){
  this.checkUserRole(id_usuario, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess && id_cliente==id_usuario) {
      this.showlistacompra=false;
      this.CompraService.putsumarCantidad(id_pokemon,cantidad).subscribe(response => {
        if (response.status == 200) {
          console.log("dadded true")
          this.rstatus.emit(true);   
        } else {
          console.log("added true")
          this.rstatus.emit(false);  
        }
      });
      this.CompraService.deleteCompra(id).subscribe(response => {
        if (response.status == 200) {
          this.bien2();
          console.log("dadded true")
          this.rstatus.emit(true);
        } else {
          console.log("added true")
          this.rstatus.emit(false);
        }
      });
    }
  });
} 







getByName(_nombre: string) { //para pokemons
  if(_nombre.length==0){
    
    this.pokemons=[];
  }else{
  this.CompraService.getPokemonByName(_nombre).subscribe((pokemons: any)=>  this.pokemons = pokemons ); 
}
}

getByID(id: string) { //para pokemons
  if(id.length==0){
    
    this.pokemons=[];
  }else{
    this.CompraService.getPokemonByID(id).subscribe((pokemons: any)=>  this.pokemons = pokemons ); 

  }
  }


 getBoolean(value: string){
  switch(value){
    case "true":
      return true;
     default:
        return false;
  }
}
activarShowpokemons(id: string) {
  this.checkUserRole(id, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess) {
      this.ngOnInit();
      if(this.showpokemonflag==false){
        this.showlistacompra=false;
        this.showpokemonflag=true;
      } else {
        this.showpokemonflag=false;
      }
      console.log("you have access");
    } else {
      console.log("you better get out of here");
    }
  });
}

activarShowpokemonsnombre(id: string,nombre : string) { 
  this.checkUserRole(id, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess) {
      this.getByName(nombre);
      this.showlistacompra=false;
        this.showpokemonflag=true;
      console.log("show pokemon por nombre");
    } else {
      console.log("you better get out of here");
    }
  });
}

activarShowpokemonsID(id: string, idpokemon : string) {
  
  this.checkUserRole(id, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess) {
      this.getByID(idpokemon);
      this.showlistacompra=false;
        this.showpokemonflag=true;
      console.log("you have access");
    } else {
      console.log("you better get out of here");
    }
  });
}

showcompraformulario(idCliente: string, idPokemon: any, cantidadPokemon: any, pokemon : Pokemon) {
  this.checkUserRole(idCliente, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess) {
  
    this.pokemonSeleccionado = pokemon;
    this.idCliente=idCliente;
    this.idPokemon = idPokemon;
    this.cantidadPokemon = cantidadPokemon;
    this.pokemons=[]//testearlo
    if (this.showcompraform == false) {
      this.showpokemonflag = false;
      this.showcompraform = true;
      this.showlistacompra=false;
    } else this.showcompraform = false
  }else{
    console.log("you better get out of here");
  }
  });
}

cancelform(){
  this.showcompraform = false;
  this.showlistacompra =false;
  this.showmodifyflag =false;
  this.showpokemonflag=false;
  
}
addCompra(id:string ,idArticulo: string, idCliente: string, cantidad: number, nombre: string, direccionEnvio: string) {
  this.checkUserRole(id, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess) {
      this.showcompraform = false;
      if (cantidad > this.cantidadPokemon || cantidad < 0 || cantidad == null) {
        console.log("compra imposible")
        this.rstatus.emit(false);
      } else {
        this.pokemonSeleccionado.cantidad = this.cantidadPokemon - cantidad;
        console.log("new quantity:"+this.pokemonSeleccionado.cantidad);
        this.CompraService.putrestarCantidad(this.idPokemon, this.pokemonSeleccionado).subscribe(response => {
          if (response.status == 200) {
            console.log("dadded true")
            this.rstatus.emit(true);   
          } else {
            console.log("added true")
            this.rstatus.emit(false);  
          }
        });
        this.CompraService.createCompra(idArticulo, idCliente, cantidad, nombre, direccionEnvio)
          .subscribe(response => {
            if (response.status == 200) {
              const compraID = (response.body as UsuarioResponse).result;
              this.bien(compraID)
              console.log("dadded true")
              this.rstatus.emit(true);
            } else {
              console.log("added true")
              this.rstatus.emit(false);
            }
          });
      }
      console.log("you have access");
    } else {
      console.log("you better get out of here");
    }
  });
}


modify(id_usuario:string, compra: Compra) {
  this.compraSeleccionada = compra;
  this.checkUserRole(id_usuario, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess && id_usuario==this.compraSeleccionada.idCliente) {
      this.showmodifyflag = true;
      this.showlistacompra=false;
      this.showcompraform=false;
      this.showpokemonflag=false
    }
    else{
      this._snackBar.open("Esta no es tu compra",'',{
        duration:4000,
        horizontalPosition: 'center',
              verticalPosition: 'top'
      })
    }
  });
}


modifyCompra(id_usuario:string, _id: string, idArticulo: string, idCliente: string, cantidad: number, nombre: string, direccionEnvio: string) {
  this.showmodifyflag = false;
  this.checkUserRole(idCliente, ['Cliente']).subscribe(hasAccess => {
    if (hasAccess && id_usuario==idCliente) {
      this.CompraService.putCompra(_id, idArticulo, idCliente, cantidad, nombre, direccionEnvio)
      .subscribe(response => {
        if (response.status == 200) {
          console.log("event true")
          this.rstatus.emit(true);
          this.bien2();
        } else {
          console.log("event true")
          this.rstatus.emit(false);
        }
      });
      console.log("you have access");
    } else {
      this._snackBar.open("Esta no es tu compra",'',{
        duration:4000,
        horizontalPosition: 'center',
              verticalPosition: 'top'
      })
    }
  });
}


bien(usuarioID: string){
  this._snackBar.open("Compra creada correctamente con ID : "+ usuarioID,'',{
    duration:7000,
    horizontalPosition: 'center',
              verticalPosition: 'top'
  })
}
bien2(){
  this._snackBar.open("Operación realizada correctamente",'',{
    duration:7000,
    horizontalPosition: 'center',
              verticalPosition: 'top'
  })
}

}
import { Component, OnInit } from '@angular/core';
import Pokemon from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/pokemon.service';


@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent implements OnInit{
 showformflag = false;
  showmodifyflag = false;
  showgetflag =false;
  rest= false;
  buttons=true;
  usuariorol!: string;
  success = false;
  failure = false;
  pokemons: Pokemon[] = [];
  pokemonSeleccionado!: Pokemon;
  url1: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
  url2: string = ".png";
  finalurl: string = "726";
  
constructor(private pokemonService: PokemonService) {}
cancelmessage(){
  this.success=false;
  this.failure=false;
  this.rest=true;
}

showform(id : string) {
  this.pokemonService.getuserrol(id).subscribe(data => {
    this.usuariorol = data.toString();
    console.log(this.usuariorol);
    if (this.usuariorol === 'Administrador') {
      this.showformflag = true;
      this.rest=false;
      console.log("you have access");
    } else {
      console.log("you better get out of here");
    }
  });
}

showget(id : string) { 
  this.pokemonService.getuserrol(id).subscribe(data => {
    this.usuariorol = data.toString();
    console.log(this.usuariorol);
    if (this.usuariorol === 'Administrador') {
      this.showgetflag = true;
      this.rest=false;
      console.log("you have access");
    } else {
      console.log("you better get out of here");
    }
  });
  
}
cancel() {
  this.showformflag = false;
  this.showgetflag = false;
  this.showmodifyflag = false;
  this.rest=true;
}

modify(pokemon: Pokemon, id:string){
  this.pokemonService.getuserrol(id).subscribe(data => {
    this.usuariorol = data.toString();
    console.log(this.usuariorol);
    if (this.usuariorol === 'Administrador') {
      this.pokemonSeleccionado = pokemon;
  this.showmodifyflag = true;
  this.rest=false;
      console.log("you have access");
    } else {
      console.log("you better get out of here");
    }
  });
  
}


tipoPokemon: string[] = [];

ngOnInit() {
  this.pokemonService.getPokemons()
  .subscribe((pokemons: any)=> this.pokemons = pokemons);
}

deletePokemon( pokemon : Pokemon,id: string) {

  this.pokemonService.getuserrol(id).subscribe(data => {
    this.usuariorol = data.toString();
    console.log(this.usuariorol);
    if (this.usuariorol === 'Administrador') {
     
      this.pokemonService.deletePokemon(pokemon._id).subscribe(response => {
        this.rest=false;
        this.ngOnInit();
       if (response.status == 200){
        this.success=true;
       }
        else {
          this.failure=true;
        }
      });;
      console.log("you have access");
    } else {
      console.log("you better get out of here");
    }
  });
  
 
  
}
addPokemon(id_admin : string ,nombre: string ,numero: number, generacion: number ,region: string ,tipo:string ,evolucion: boolean,legendario : boolean,cantidad : number, precio: number) {
  
  this.pokemonService.getuserrol(id_admin).subscribe(data => {
    this.usuariorol = data.toString();
    console.log(this.usuariorol);
    if (this.usuariorol === 'Administrador') {
      this.showformflag = false;
      this.pokemonService.createPokemon(nombre,numero,generacion,region , tipo, evolucion, legendario,cantidad,precio)
      .subscribe(response => {
        this.rest=false;
        this.ngOnInit();
       if (response.status == 200){
        this.success=true;
       }
       else {
          this.failure=true;
        }
      } );
      console.log("you have access");
    } else {
      console.log("you better get out of here");
    }
  });
}

modifyPokemon(id_admin : string,_id:string,nombre: string, numero: number, generacion: number, region: string, tipo:  string , evolucion: boolean, legendario: boolean, cantidad: number, precio: number){
  this.pokemonService.getuserrol(id_admin).subscribe(data => {
    this.usuariorol = data.toString();
    console.log(this.usuariorol);
    if (this.usuariorol === 'Administrador') {
      this.showmodifyflag = false;
      this.rest=true;
      this.pokemonService.putPokemon(_id,nombre,numero,generacion,region,tipo,evolucion,legendario,cantidad,precio)
      .subscribe(response => {
        this.rest=false;
        this.ngOnInit();
       if (response.status == 200){
        this.success=true;
       }
       else {
          this.failure=true;
        }
      });
    } else {
      console.log("you better get out of here");
    }
  });
}


getByName(id_admin : string ,_nombre: string) {
  this.pokemonService.getuserrol(id_admin).subscribe(data => {
    this.usuariorol = data.toString();
    console.log(this.usuariorol);
    if (this.usuariorol === 'Administrador') {
      this.pokemonService.getPokemonByName(_nombre).subscribe((pokemons: any)=>  this.pokemons = pokemons );
  this.showgetflag = false;
  this.rest=true;
    } else {
      console.log("you better get out of here");
    }
  });
  
}


getByID(id_admin : string , id: string) {
  this.pokemonService.getuserrol(id_admin).subscribe(data => {
    this.usuariorol = data.toString();
    console.log(this.usuariorol);
    if (this.usuariorol === 'Administrador') {
      this.pokemonService.getPokemonByID(id).subscribe((pokemons: any)=>  this.pokemons = pokemons);
      this.showgetflag = false;
      this.rest=true;
    } else {
      console.log("you better get out of here");
    }
  });

}
checkrol(id: string){
  
  this.pokemonService.getuserrol(id).subscribe(data => {
    this.usuariorol = data.toString();
   
    console.log(this.usuariorol);
    if (this.usuariorol === 'Administrador') {
      this.pokemonService.getPokemons()
      .subscribe((pokemons: any)=> this.pokemons = pokemons);
      this.rest=true;
      console.log("you have access");
      //this.bien3();
     
    } else {
      console.log("you better get out of here");
     // this.error();
    }
  });

}
 getBoolean(value: string){
  switch(value){
    case "true":
      return true;
     default:
        return false;
  }

}
}



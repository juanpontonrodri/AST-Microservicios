import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import Pokemon from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-get-pokemon',
  templateUrl: './get-pokemon.component.html',
  styleUrls: ['./get-pokemon.component.css']
})

export class GetPokemonComponent implements OnInit {
  idUser!: string;
  showresults = false
  showformflag = false
  pokemons: Pokemon[] = [];
  pokemonsolo!: Pokemon
  pokemonSeleccionado!: Pokemon
  showmodifyflag = false
  url1: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
  url2: string = ".png";
  
  constructor(private _snackBar: MatSnackBar, private PokemonService: PokemonService, private appComponent: AppComponent) {
    this.idUser = PokemonService.idUser;
    appComponent.idUserChanged.subscribe((newIdCliente: string) => {
      this.idUser = newIdCliente;
    });
  }

  ngOnInit(): void {
    this.pokemons=[]
    this.showresults = false
  }

   
checkUserRole(id: string, allowedRoles: string[]): Observable<boolean> {
  return this.PokemonService.getuserrol(id).pipe(
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

getByName(name: string) {
  this.checkUserRole(this.idUser, ['Administrador']).subscribe(hasAccess => {
    if (hasAccess) {
      this.pokemons=[]
      this.showformflag = false;
      this.showresults = true;
      this.PokemonService.getPokemonByName(name).subscribe((response: any) => {
        if (Array.isArray(response)) {
          this.pokemons = response; // La respuesta es un arreglo de Pokemon
        } else {
          this.pokemons = [response]; // La respuesta es un solo Pokemon
        }
        
      });
    } else {
      this._snackBar.open("No tienes permisos para buscar pokemons", '', {
        duration: 4000,
        horizontalPosition: 'center'
      });
    }
  });
}


/*   getByPrice(precio: string) {
    this.pokemons=[]
    this.showformflag = false;
    this.showresults = true;
    this.PokemonService.getPokemonByPrice(parseInt(precio)).subscribe((response: any) => {
      if (Array.isArray(response)) {
        this.pokemons = response; // La respuesta es un arreglo de Pokemon
      } else {
        this.pokemons = [response]; // La respuesta es un solo Pokemon
      }
    });
  } */

  getByID(id: string) {
    this.checkUserRole(this.idUser, ['Administrador']).subscribe(hasAccess => {
      if (hasAccess) {
        this.pokemons=[]
        this.showformflag = false;
        this.showresults = true;
        this.PokemonService.getPokemonByID(id).subscribe((response: any) => {
          if (Array.isArray(response)) {
            this.pokemons = response; // La respuesta es un arreglo de Pokemon
          } else {
            this.pokemons = [response]; // La respuesta es un solo Pokemon
          }
          
        });
      } else {
        this._snackBar.open("No tienes permisos para buscar pokemons", '', {
          duration: 4000,
          horizontalPosition: 'center'
        });
      }
    });
  }
  

  showform() {
    this.pokemons=[]//testearlo
    if (this.showformflag == false) {
      this.showresults = false
      this.showformflag = true;
      
    } else {
      this.showformflag = false
    }
  }
  

  @Output() rstatus = new EventEmitter<boolean>();

  deletePokemon(pokemon: Pokemon) {
    this.checkUserRole(this.idUser, ['Administrador']).subscribe(hasAccess => {
      if (hasAccess) {
        this.PokemonService.deletePokemon(pokemon._id).subscribe(response => {
          if (response.status == 200) {
            console.log("deleted true")
            this.rstatus.emit(true);
            this._snackBar.open("Pokémon eliminado correctamente", '', {
              duration: 4000,
              horizontalPosition: 'center'
            });
          } else {
            console.log("deleted true")
            this.rstatus.emit(false);
          }
        }, error => {
          console.error(error);
          this._snackBar.open("Error al eliminar el pokemon", '', {
            duration: 4000,
            horizontalPosition: 'center'
          });
        });
      } else {
        this._snackBar.open("No tienes permisos para eliminar el pokemon", '', {
          duration: 4000,
          horizontalPosition: 'center'
        });
      }
    });
  }
  
  
  modify(pokemon: Pokemon) {
    this.checkUserRole(this.idUser, ['Administrador']).subscribe(hasAccess => {
      if (hasAccess) {
        this.pokemonSeleccionado = pokemon;
        this.showmodifyflag = true;
        
      } else {
        this._snackBar.open("No tienes permisos para modificar el pokemon", '', {
          duration: 4000,
          horizontalPosition: 'center'
        });
      }
    });
  }
  
  
  
    modifyPokemon(_id: string, nombre: string, numero: number, generacion: number, region: string, tipo: string, evolucion: boolean, legendario: boolean, cantidad: number, precio: number) {
      this.checkUserRole(this.idUser, ['Administrador']).subscribe(hasAccess => {
        if (hasAccess) {
          this.showmodifyflag = false;
          this.PokemonService.putPokemon(_id, nombre, numero, generacion, region, tipo, evolucion, legendario, cantidad, precio).subscribe(response => {
            if (response.status == 200) {
              console.log("event true")
              this._snackBar.open("Pokémon modificado correctamente", '', {
                duration: 4000,
                horizontalPosition: 'center'
              });
              this.rstatus.emit(true);
            } else {
              console.log("event true")
              this.rstatus.emit(false);
            }
          }, error => {
            console.error(error);
            this._snackBar.open("Error al modificar el pokemon", '', {
              duration: 4000,
              horizontalPosition: 'center'
            });
          });
        } else {
          this._snackBar.open("No tienes permisos para modificar el pokemon", '', {
            duration: 4000,
            horizontalPosition: 'center'
          });
        }
      });
    }
    
  cancelmodify() {
    this.showmodifyflag = false;
  }
  getBoolean(value: string) {
    switch (value) {
      case "true":
        return true;
      default:
        return false;
    }

  }
}

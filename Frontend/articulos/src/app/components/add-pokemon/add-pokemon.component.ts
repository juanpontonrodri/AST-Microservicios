import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import Pokemon from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.css']
})
export class AddPokemonComponent {
  idUser!: string;

  showformflag = false
  tipoPokemon: string[] = [];
  numero: number | undefined

  constructor(private _snackBar: MatSnackBar, private PokemonService: PokemonService, private appComponent: AppComponent) {
    this.idUser = PokemonService.idUser;
    appComponent.idUserChanged.subscribe((newIdCliente: string) => {
      this.idUser = newIdCliente;
    });
  }

  ngOnInit(): void { }

  @Output() rstatus = new EventEmitter<boolean>();

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
showform() {
  this.checkUserRole(this.idUser, ['Administrador']).subscribe(hasAccess => {
    if (hasAccess) {
      if (this.showformflag == false) {
        this.showformflag = true;
        
      } else {
        this.showformflag = false
      }
    } else {
      this._snackBar.open("No tienes permisos para agregar un pokemon", '', {
        duration: 4000,
        horizontalPosition: 'center',
              verticalPosition: 'top'
      });
    }
  });
}

cancelform() {
  this.showformflag = false;
  
}
addPokemon(nombre: string, numero: number, generacion: number, region: string, tipo: string, evolucion: boolean, legendario: boolean, cantidad: number, precio: number) {
  this.checkUserRole(this.idUser, ['Administrador']).subscribe(hasAccess => {
    if (hasAccess) {
      this.showformflag = false;
      this.PokemonService.createPokemon(nombre, numero, generacion, region, tipo, evolucion, legendario, cantidad, precio)
        .subscribe(response => {
          if (response.status == 200) {
            console.log("dadded true")
            this.rstatus.emit(true);
            this._snackBar.open("Nuevo pokemon agregado", '', {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          } else {
            console.log("added true")
            this.rstatus.emit(false);
          }
        });}
        else {
          this._snackBar.open("No tienes permisos para agregar un pokemon", '', {
            duration: 4000,
            horizontalPosition: 'center',
              verticalPosition: 'top'
          });
        }
      });
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

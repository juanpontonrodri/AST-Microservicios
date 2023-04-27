import { Component, EventEmitter, Output} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Output() idUserChanged = new EventEmitter<string>();
  onIdClienteChanged(newIdUser: string) {
    this.PokemonService.idUser = newIdUser;
    this.idUserChanged.emit(newIdUser);
  }


  showmessage = false;
  success = false
  failure = false
  title = 'frontend';
  showPokemonVisible = false

  constructor(private PokemonService: PokemonService) {

  }


  onrstatus(success: boolean) {
    this.showmessage = true;
    this.success = success;
    this.failure = !success;
  }

  cancelmessage() {

    this.success = false;
    this.failure = false;
    this.showmessage = false;
    this.showPokemonVisible = false

  }
  activarShowPokemons(id:string) {
    this.PokemonService.idUser = id;
    this.checkUserRole(id, ['Administrador']).subscribe(hasAccess => {
    if (hasAccess) {
      if (this.showPokemonVisible == false) {
        this.showPokemonVisible = true
      } else this.showPokemonVisible = false;
    }
  });
  }

  desactivarMostrar(){
    this.showPokemonVisible=false;
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

}
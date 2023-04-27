import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nombre: string = "Nombre usuario"
  ngOnIit() {

  }
  cambiarNombre() {
    this.nombre = "manolito"
  }
}

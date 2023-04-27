import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonViewComponent } from './pages/pokemon-view/pokemon-view.component';

const routes: Routes = [
  {path: '' , component: PokemonViewComponent} ,
  {path: 'pokemon' , component: PokemonViewComponent} 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

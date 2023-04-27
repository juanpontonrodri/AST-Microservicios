import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    HttpClientModule
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

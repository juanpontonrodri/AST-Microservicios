import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonViewComponent } from './pages/pokemon-view/pokemon-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from './pages/pokemon-view/share/share.module';


@NgModule({
  declarations: [
    AppComponent,
    PokemonViewComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ShareModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FlipModule} from 'ngx-flip';
import {CardService} from './card/card.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlipModule
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

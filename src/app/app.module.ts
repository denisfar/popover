import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { PopoverComponent }  from './popover.component';
import { AppService } from './app.service';

import { SafeHtml } from './safeHtml.pipe';


@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, PopoverComponent,  SafeHtml ],
  providers:    [ AppService ],
  bootstrap:    [ AppComponent ],
  entryComponents: [ PopoverComponent ]
})
export class AppModule { }

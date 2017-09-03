import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
})



export class AppComponent implements OnInit  {
  constructor(private appService: AppService) {}

  pricelist :any;


  ngOnInit() {
    //pricelist request subscribe
    this.appService.getPriceList().subscribe(d => {
      this.pricelist = d.pricelist;
    });
  }


}

import { Component, Input, Renderer, ElementRef, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { SafeHtml } from './safeHtml.pipe';

@Component({
  selector: 'popover-component',
  template: `<div  [innerHtml]="popoverContent | safeHtml"
        class="Popover"
        [style.display]="style.display"
        [style.margin-top]="style.marginTop"
        [style.visibility]="style.visibility"
        [style.top]="style.top"></div>`
})

export class PopoverComponent implements OnInit {
  constructor(private _appService: AppService,
              private _renderer: Renderer,
              private _el: ElementRef) {}

  @Input() id: any;

  private popoverContent: any = "";
  private style: any  = "{}";


  ngOnInit() {

    //pricelist request subscribe
    this._appService.getPriceList().subscribe(d => {
      //find by item id
      for(let item of d.pricelist)
      if(item.id == this.id && (item.description_ru || item.description)){

          let content = (item.description_ru || item.description);

          //create DOM element of response
          let parser = new DOMParser()
          let el: any = parser.parseFromString("<div>"+content+"</div>", "text/xml").children[0];

          //remove "__localname__" div
          el.removeChild(el.children[0]);
          //set class name
          this._renderer.setElementClass(el,"PopoverContent", true);
          this.popoverContent = el.outerHTML;

          //initially component is hidden
          //render hidden element for calc its height
          this.style = { display: "block", marginTop: "0px", visibility: "hidden", top: "0px"};

          //setTimeout(() => { , 0); is executed when component fully rendered on page
          setTimeout(() => {  this.popoverPositioning() }, 0);
          break;
        }
      });

  }

  /*
  * positioning component on visible area
  *if component not fits into visible area then we set margin-top
  */
  popoverPositioning(): void{
      var viewportOffset = this._el.nativeElement.getBoundingClientRect();
      var height = this._el.nativeElement.children["0"].offsetHeight;
      if(this._el.nativeElement.parentElement.parentElement){
        var parentHeight = this._el.nativeElement.parentElement.parentElement.clientHeight/2;
        var windHeight = window.innerHeight;
        var offset = "0px"
        if( viewportOffset.top + height > windHeight){
          offset = (-height-parentHeight)+"px";
        }
        //show ringth positioned component
        this.style = { display: "block", marginTop: offset, visibility: "visible", top: "auto"};
    }
  }


}

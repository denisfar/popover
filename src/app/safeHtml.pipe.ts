import {DomSanitizer} from '@angular/platform-browser';
import { Component, Input, Pipe, PipeTransform  } from '@angular/core';

@Pipe({name: 'safeHtml'})
export class SafeHtml {
  constructor(private sanitizer:DomSanitizer){}

  transform(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

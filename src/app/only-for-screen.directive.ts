import { Directive, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

interface IConfig {
  mobile: number;
  tablet: number;
  desktop: number;
}

@Directive({
  selector: '[appOnlyForScreen]'
})

export class OnlyForScreenDirective {

  @Input() onlyForScreen: string;
  config: IConfig = {
    mobile: 500,
    tablet: 700,
    desktop: 1000
  }

  // @Input() highlightColor: string;
  innerWidth: number;

  constructor(private el: ElementRef) { }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.screenRes(innerWidth);
  }


  setDisplay(el: ElementRef, display = 'block') {
    el.nativeElement.style.display = display || 'none'
  }

  private screenRes(screenSize: number) {
    var child = this.el.nativeElement;
    if ((screenSize < this.config.mobile)) {
      (this.onlyForScreen !== 'mobile')
        ? this.setDisplay(this.el, 'none')
        : this.setDisplay(this.el)
    } else if ((screenSize < this.config.tablet)) {
      (this.onlyForScreen !== 'tablet')
        ? this.setDisplay(this.el, 'none')
        : this.setDisplay(this.el)
      console.log('tab')
    }
    else  {
      (this.onlyForScreen !== 'desktop')
        ? this.setDisplay(this.el, 'none')
        : this.setDisplay(this.el)
    }
  }
}


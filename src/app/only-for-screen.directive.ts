import { Directive, ElementRef, HostListener, Input } from '@angular/core';

interface IConfig {
  mobile: number;
  tablet: number;
  desktop: number;
}

const config: IConfig = {
  mobile: 500,
  tablet: 700,
  desktop: 1000
}
@Directive({
  selector: '[appOnlyForScreen]'
})
export class OnlyForScreenDirective {
  // @Input() screenSize: string;
  @Input() onlyForScreen: string;

  // @Input() highlightColor: string;
  innerWidth: number;




  constructor(private el: ElementRef) { }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.screenRes(innerWidth);
  }


  private screenRes(screenSize: number) {
    if (this.onlyForScreen === 'mobile' && screenSize < config.mobile) {
      console.log('mobile', screenSize)
      return this.el.nativeElement.style.display = 'block';
    } else if (this.onlyForScreen === 'tablet' && screenSize < config.tablet) {
      return this.el.nativeElement.style.display = 'block';
    }
    else if (this.onlyForScreen === 'desktop' && screenSize < config.desktop) {
      return this.el.nativeElement.style.display = 'block';
    }
    else {
      return this.el.nativeElement.style.display = 'none';
    }
  }
}


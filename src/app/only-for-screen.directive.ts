import { Directive, ElementRef, HostListener, Input } from '@angular/core';

interface IConfig {
  mobile: number;
  tablet: number;
  desktop: number;
}

@Directive({
  selector: '[appOnlyForScreen]'
})
export class OnlyForScreenDirective {
  // @Input() screenSize: string;
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


  private screenRes(screenSize: number) {
    if ((this.onlyForScreen === 'mobile') && (screenSize < this.config.mobile)) {
      console.log('mobile', this.config.mobile)
      this.el.nativeElement.style.display = 'block';
    } else if ((this.onlyForScreen === 'tablet') && (screenSize < this.config.tablet)) {
      this.el.nativeElement.style.display = 'block';
    }
    else if ((this.onlyForScreen === 'desktop') && (screenSize < this.config.desktop)) {
      this.el.nativeElement.style.display = 'block';
    }
    else {
      this.el.nativeElement.style.display = 'none';
    }
  }
}


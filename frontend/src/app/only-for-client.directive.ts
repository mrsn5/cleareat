import { Directive, ElementRef } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';

@Directive({
  selector: '[appOnlyForClient]'
})
export class OnlyForClientDirective {

  private displayVal;
  constructor(
    el: ElementRef,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(u => {
      if (!u || u.role === 'admin') {
        this.displayVal = el.nativeElement.style.display;
        el.nativeElement.style.display = 'none';
      } else if(this.displayVal != null) {
        el.nativeElement.style.display = this.displayVal;
      }
    });
  }

}

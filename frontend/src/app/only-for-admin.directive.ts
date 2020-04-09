import { Directive, ElementRef } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';

@Directive({
  selector: '[appOnlyForAdmin]'
})
export class OnlyForAdminDirective {
  constructor(
      el: ElementRef,
      private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUser.subscribe(u => {
        if (!u || u.role !== 'admin') {
          el.nativeElement.style.display = 'none';
        }
      });
    }
}

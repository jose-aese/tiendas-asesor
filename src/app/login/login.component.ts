import { Component, NgZone, OnInit } from '@angular/core';
import { CognitoUserInterface, } from '@aws-amplify/ui-components';

import { Router } from '@angular/router';

import { AmplifyService } from 'aws-amplify-angular';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {


  myValueSub: Subscription;
  user: CognitoUserInterface | undefined;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private amplifyService: AmplifyService) {
    this.amplifyService = amplifyService;
    this.myValueSub = this.amplifyService.authStateChange$.subscribe(authState => {
      if (authState.state === "signedIn") {
        this.user = authState.user as CognitoUserInterface;
        localStorage.setItem("usrtkn", this.user.signInUserSession.idToken.jwtToken)
        localStorage.setItem("username", this.user.username)
        this.ngZone.run(() => this.router.navigate(['/tiendas'])).then();
      }

    })
  }

  ngOnInit(): void {
    // This is intentional
  }
  ngOnDestroy(): void {
    if (this.myValueSub) {
      this.myValueSub.unsubscribe();
    }
  }
}

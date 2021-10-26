import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';
import { Amplify } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  constructor(private http: HttpClient, private ref: ChangeDetectorRef, private router: Router, private ngZone: NgZone) {
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      console.log(this.authState);
      console.log(authData);
      if ("signedin" == this.authState) {
        this.user = authData as CognitoUserInterface;
        localStorage.setItem("usrtkn",this.user.signInUserSession.accessToken.jwtToken)
        this.ngZone.run(() => this.router.navigate(['/tiendas'])).then();
      }
   
      this.ref.detectChanges();
      
    })
  }
  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { UserRegistration } from '../../models/user/user-registration';
import { SignupService } from '../../services/auth/signup/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignUpComponent {

  user: UserRegistration= new UserRegistration({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

    constructor(private signup: SignupService, private router: Router) { }



    signUp() {
      this.signup.signUp(this.user)
      this.signup.verifyEmail(this.user.email);
      this.router.navigate(['/verify']);
      
  }
}

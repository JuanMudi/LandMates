import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { UserRegistration } from '../../models/user/user-registration';
import { SignupService } from '../../services/auth/signup/signup.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule],
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
      console.log(this.user);
      this.signup.signUp(this.user).subscribe(response => {
        if (response.status === 201) {
          this.router.navigate(['/verify']);
        }
        else
        {
          alert('Error al registrar el usuario');
        }
      });

      
  }
}

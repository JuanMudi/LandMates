import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private service: AuthService, private router: Router, private headerService: HeaderService) {};

  login(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.service.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Login successful');
        this.headerService.setHeaderState(true);
        this.router.navigate(['/newProperty']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
    }
      
   
}


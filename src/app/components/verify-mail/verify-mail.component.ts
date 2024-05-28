import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from '../../services/auth/signup/signup.service';


@Component({
  selector: 'app-verify-mail',
  standalone: true,
  imports: [],
  templateUrl: './verify-mail.component.html',
  styleUrl: './verify-mail.component.css'
})
export class VerifyMailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private signUpService: SignupService, private router: Router) { }

  ngOnInit(): void {
    // Obtener el parámetro de consulta 'code'
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      console.log('Query parameter code:', code);
      this.signUpService.verifyEmail(code).subscribe(()=>
        this.router.navigate(['/login']
      ))
    });
  }
  



}

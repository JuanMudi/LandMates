import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth/auth.service';
import { HeaderService } from '../../../../services/header.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private auth: AuthService, private headerService: HeaderService, private router: Router) {
  }

  headerState: boolean = false;


  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.headerService.setHeaderState(true);
    }
    this.headerService.headerState$.subscribe(state => {
      this.headerState = state;
    });
  }

  
  
  logout(){
    this.auth.logout();
    this.headerService.setHeaderState(false);
    this.router.navigate(['/login']);
  };
  


}

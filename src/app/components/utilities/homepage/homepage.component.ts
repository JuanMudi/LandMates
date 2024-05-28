import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../services/header.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  
    constructor(private headerService: HeaderService) { }
  
    ngOnInit(): void {
      if (sessionStorage.getItem('token')) {
        this.headerService.setHeaderState(true);
      }
      else {
        this.headerService.setHeaderState(false);
      }
    }


}

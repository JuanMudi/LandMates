import { Component } from '@angular/core';
import { Property } from '../../../../models/property/property.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertiesService } from '../../../../services/property/properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-properties',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-properties.component.html',
  styleUrl: './list-properties.component.css'
})
export class ListPropertiesComponent {
  properties: Property[] = [];
  loadingDepartment: boolean = false;
  loadingMunicipality: boolean = false;

  constructor(private propertiesService: PropertiesService, private router: Router) { }

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    this.propertiesService.getMyProperties()
    .subscribe(properties => {
      this.properties = properties;
    });
  
  }



  editProperty(propertyId: string): void {
    sessionStorage.setItem('propertyID', propertyId);
    this.router.navigate(['/edit-property']);
  }

  deactivate(property: string) {
    this.propertiesService.deleteProperty(property)
    this.router.navigate(['/properties']);
    }
  seeProperty(propertyId: string): void {
    sessionStorage.setItem('propertyID', propertyId);
    this.router.navigate(['/property-details']);
  }
}

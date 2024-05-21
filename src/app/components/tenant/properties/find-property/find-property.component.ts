import { Component } from '@angular/core';
import { Department } from '../../../../models/location/department.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Municipality } from '../../../../models/location/municipality.model';
import { Property } from '../../../../models/property/property.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertiesService } from '../../../../services/property/properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-property',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './find-property.component.html',
  styleUrl: './find-property.component.css'
})
export class FindPropertyComponent {
  departments!: Observable<Department[]>; // Ahora es Observable<Department[]>
  municipalities = new BehaviorSubject<Municipality[]>([]);
  selectedDepartment: string = ''; // ID del departamento seleccionado
  searchName: string = '';
  searchMunicipality: string = '';
  properties: Property[] = [];

  constructor(private propertyService: PropertiesService, private router: Router ) { }

    ngOnInit(): void {
      this.departments = this.propertyService.loadDepartments();
  }

  onDepartmentChange() {
      this.departments.subscribe(departments => {
          const foundDept = departments.find(d => d.id === this.selectedDepartment);
          if (foundDept) {
              this.municipalities.next(foundDept.municipalities);
          } else {
              this.municipalities.next([]);
          }
      });
  }

  searchProperties() {
        this.propertyService.findProperties(this.searchMunicipality, this.searchName).subscribe(
            (data) => {
                this.properties = data;
                console.log('Propiedades encontradas:', this.properties);
            },
            (error) => {
                console.error('Error al buscar propiedades:', error);
            }
        );

  }
  seeProperty(propertyId: string): void {
    sessionStorage.setItem('propertyID', propertyId);
    this.router.navigate(['/see-property']);
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms'; // Importa FormBuilder y Validators
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Property } from '../../models/property/property.model';
import { Department } from '../../models/location/department.model';
import { Municipality } from '../../models/location/municipality.model';
import { PropertiesService } from '../../services/property/properties.service';
import { NewPropertyService } from '../../services/property/new-property.service';


@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css'],
  standalone  : true,
  imports: [FormsModule, CommonModule]
})
export class EditPropertyComponent implements OnInit {
  property: Property = {
    id: '',
    name: '',
    municipalityName: '',
    departmentName: '',
    accessType: '',
    description: '',
    rooms: 0,
    bathrooms: 0,
    petFriendly: false,
    pool: false,
    bbq: false,
    ownerID: '',
    pricePerNight: 0
  };
  departments!: Observable<Department[]>; // Ahora es Observable<Department[]>
  municipalities = new BehaviorSubject<Municipality[]>([]);
  selectedDepartment: string = ''; // ID del departamento seleccionado
  propertyForm!: FormGroup; // Declara una propiedad para el formulario
  municipalityID: string = '';



  constructor(private newPropertyService: NewPropertyService, private route: ActivatedRoute, private propertyService: PropertiesService, private formBuilder: FormBuilder, private router: Router) { // Agrega FormBuilder al constructor
  }

  ngOnInit(): void {
    this.departments = this.propertyService.loadDepartments();
    this.getProperty();

    this.propertyForm = this.formBuilder.group({
      name: [this.property.name, Validators.required],
      department: [this.property.departmentName, Validators.required],
      accessType: [this.property.accessType],
      description: [this.property.description, Validators.required],
      rooms: [this.property.rooms, Validators.required],
      bathrooms: [this.property.bathrooms, Validators.required],
      petFriendly: [this.property.petFriendly],
      pool: [this.property.pool],
      bbq: [this.property.bbq],
      pricePerNight: [this.property.pricePerNight, Validators.required]
    });
}

  getProperty(): void {
    const id = sessionStorage.getItem('propertyID');
    this.propertyService.getPropertyById(id!!).subscribe(
      property => {
        this.property = property;
         },
      error => {
        console.error('Error al obtener la propiedad:', error);
      }
    );
  }

  updateProperty(): void {
    const id = sessionStorage.getItem('propertyID');
    this.property.municipalityName = this.municipalityID;
    this.newPropertyService.updateProperty(this.property).subscribe(
      property => {
        console.log('Propiedad actualizada:', property);
        this.router.navigate(['/properties']);
      },
      error => {
        console.error('Error al actualizar la propiedad:', error);
      }
    );
  

  }

  onDepartmentChange() {
    this.departments.subscribe(departments => {
        const foundDept = departments.find(d => d.id === this.selectedDepartment);
        console.log('foundDept', foundDept);
        if (foundDept) {
            this.municipalities.next(foundDept.municipalities);
        } else {
            this.municipalities.next([]);
        }
    });
}

}

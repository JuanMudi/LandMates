import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertiesService } from '../../../../services/property/properties.service';
import { Property } from '../../../../models/property/property.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-see-property',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './see-property.component.html',
  styleUrls: ['./see-property.component.css'],
})
export class SeePropertyComponent implements OnInit {
  property: Property = {
    name: '',
    description: '',
    rooms: 0,
    bathrooms: 0,
    petFriendly: false,
    pool: false,
    bbq: false,
    pricePerNight: 0,
    ownerID: window.sessionStorage.getItem('token') || '',
    municipalityName: '',
    departmentName: '',
  };
  propertyForm!: FormGroup; // Declara una propiedad para el formulario

  constructor(
    private propertyService: PropertiesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log('PropertyDetailsComponent.onInit()');

    this.getProperty();
    this.propertyForm = this.formBuilder.group({
      name: [this.property.name, Validators.required],
      municipalityName: [this.property.municipalityName, Validators.required],
      description: [this.property.description, Validators.required],
      rooms: [this.property.rooms, Validators.required],
      bathrooms: [this.property.bathrooms, Validators.required],
      petFriendly: [this.property.petFriendly],
      pool: [this.property.pool],
      bbq: [this.property.bbq],
      pricePerNight: [this.property.pricePerNight, Validators.required],
    });
  }

  getProperty(): void {
    const id = sessionStorage.getItem('propertyID');
    this.propertyService.getPropertyById(id!!).subscribe(
      (property) => {
        console.log('Propiedad obtenida:', property);
        this.property = property;
        // Update form values after property is retrieved
        this.propertyForm.patchValue(this.property);
      },
      (error) => {
        console.error('Error al obtener la propiedad:', error);
      }
    );
  }

  rentProperty(): void {
    sessionStorage.setItem('propertyToRent', this.property.id!!);
    this.router.navigate(['/rent']);
  }
}

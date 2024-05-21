import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPropertyService } from '../../../services/property/new-property.service';
import { Property } from '../../../models/property/property.model';
import { FormsModule } from '@angular/forms';
import { Municipality} from '../../../models/location/municipality.model';
import { Department } from '../../../models/location/department.model';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-create-property',
    templateUrl: './new-property.component.html',
    imports: [FormsModule, CommonModule],
    styleUrls: ['./new-property.component.css']
})
export class NewPropertyComponent implements OnInit {
    departments!: Observable<Department[]>; // Ahora es Observable<Department[]>
    municipalities = new BehaviorSubject<Municipality[]>([]);
    selectedDepartment: string = ''; // ID del departamento seleccionado

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
        departmentName: ''
    };

    constructor(private newProperty: NewPropertyService, private router: Router ) { }

    ngOnInit(): void {
        this.departments = this.newProperty.loadDepartments();
    }

    onDepartmentChange() {
        this.departments.subscribe(departments => {
            console.log('Selected department:', this.selectedDepartment)
            const foundDept = departments.find(d => d.id === this.selectedDepartment);
            console.log('foundDept', foundDept);

            if (foundDept) {
                this.municipalities.next(foundDept.municipalities);
            } else {
                this.municipalities.next([]);
            }
        });
    }
    

    createProperty() {
        //Quitar la propiedad minicipalityName
        this.property.departmentName = this.selectedDepartment
        this.newProperty.createProperty(this.property).subscribe({
            next: (res) => this.router.navigate(['/properties']) ,
            error: (err) => console.error('Error creating property', err)
        });
        
    }
}

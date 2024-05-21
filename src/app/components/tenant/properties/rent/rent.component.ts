import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RentService } from '../../../../services/rent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  rentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private rentService: RentService, private router: Router) {}

  ngOnInit() {
    this.rentForm = this.formBuilder.group({
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      cantidadPersonas: [0, [Validators.required, Validators.min(1)]]
    });
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  

  onSubmit() {
    if (this.rentForm.valid && sessionStorage.getItem('propertyToRent')) {
      const formattedFechaInicial = this.formatDate(this.rentForm.value.fechaInicial);
      const formattedFechaFinal = this.formatDate(this.rentForm.value.fechaFinal);

      this.rentService.newBooking(
        formattedFechaInicial,
        formattedFechaFinal,
        this.rentForm.value.cantidadPersonas,
        sessionStorage.getItem('propertyToRent')!!
      ).subscribe(
        response => {
          // Manejo de respuesta exitosa
          console.log('Reserva realizada con éxito', response);
          this.router.navigate(['/bookings']);
        },
        error => {
          // Manejo de error de la API
          alert('Ocurrió un error al realizar la reserva. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      if (!sessionStorage.getItem('propertyToRent')) {
        alert('No hay una propiedad seleccionada para rentar.');
      } else {
        alert('Por favor, complete todos los campos correctamente.');
      }
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RentService } from '../../../services/rent.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  booking: any = null;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2023, 2024, 2025, 2026];

  endDate: Date | undefined ;
  startDate: Date | undefined ;
  totalDays: number = 0;
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private bookingService: RentService) {
    this.paymentForm = this.fb.group({
      fullName: ['', Validators.required],
      creditCardNum: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
    this.booking = JSON.parse(sessionStorage.getItem('booking') || '{}');
    this.startDate = new Date(this.booking.startDateObject);
    this.endDate = new Date(this.booking.endDateObject);
    this.totalDays = this.calculateDays();

    console.log('Total days:', this.totalDays);
    console.log('PRice:', this.booking.totalPrice)

  }
  calculateDays(): number {
    if (!this.startDate|| !this.endDate) {
      return 0;
    }
    const diffTime = Math.abs(this.endDate.getTime() - this.startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  ngOnInit() {
    console.log('Booking:', this.booking);
  }

  ngOnDestroy() {
    sessionStorage.removeItem('booking');
  }

  handlePayment() {
    if (this.paymentForm.valid) {
      alert('¡Pago realizado con éxito!');
      this.bookingService.updateBookingStatus(this.booking.id, 'PAYED').subscribe(
        response => {
          console.log('Booking updated:', response);
          this.router.navigate(['/bookings']);
        },
        error => {
          console.error('Error updating booking:', error);
        }
      );

    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }
}

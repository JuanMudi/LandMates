import { Component } from '@angular/core';
import { Booking } from '../../../models/booking/Booking.model';
import { BookingDetail } from '../../../models/booking/BookingDetails.model';
import { RentService } from '../../../services/rent.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PropertiesService } from '../../../services/property/properties.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-my-request',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-request.component.html',
  styleUrl: './my-request.component.css'
})
export class MyRequestComponent {

  bookings: Booking | null = null;
  //Fecha actual
  actualDate = new Date();

  constructor(private bookingService: RentService, private router: Router, private propertyService: PropertiesService, private userService: UserService ) {}

  
  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getMyRequest().subscribe(
      (data: Booking) => {
        this.bookings = this.convertBookingDates(data);
        console.log('Bookings:', this.bookings);
      },
      error => {
        console.error('Error al obtener las reservas:', error);
        alert('Ocurrió un error al obtener las reservas. Por favor, inténtelo de nuevo.');
      }
    );
  }

  
  convertBookingDates(booking: Booking): Booking {
    booking.asLessee.forEach(detail => {
      detail.startDateObject = this.convertToDate(detail.startDate);
      detail.endDateObject = this.convertToDate(detail.endDate);
      this.propertyService.getPropertyNameById(detail.propertyId).subscribe(propertyName => {
        detail.propertyName = propertyName;
      });

      this.propertyService.getPropertyPriceById(detail.propertyId).subscribe(price => {
        detail.totalPrice = price * (detail.endDateObject!!.getDate() - detail.startDateObject!!.getDate());
      });
      if ((this.actualDate > detail.endDateObject && detail.status != 'CLOSED' && detail.status === 'PAYED')) {
        this.bookingService.updateBookingStatus(detail.id, 'REVIEW').subscribe(
          () => {
            this.getBookings();
          },
          error => {
            console.error('Error al cerrar la solicitud:', error);
            alert('Ocurrió un error al cerrar la solicitud. Por favor, inténtelo de nuevo.');
          }
        );
      }
          });
  
    booking.asLessor.forEach(detail => {
      detail.startDateObject = this.convertToDate(detail.startDate);
      detail.endDateObject = this.convertToDate(detail.endDate);
      this.userService.getUserNameById(detail.lesseeId).subscribe(lesseeName => {
        detail.propertyName = lesseeName;
      });
      this.propertyService.getPropertyPriceById(detail.propertyId).subscribe(price => {
        detail.totalPrice = price * (detail.endDateObject!!.getDate() - detail.startDateObject!!.getDate());
      })
      if ((this.actualDate > detail.endDateObject && detail.status != 'CLOSED' && detail.status === 'PAYED')) {
        this.bookingService.updateBookingStatus(detail.id, 'REVIEW').subscribe(
          () => {
            this.getBookings();
          },
          error => {
            console.error('Error al cerrar la solicitud:', error);
            alert('Ocurrió un error al cerrar la solicitud. Por favor, inténtelo de nuevo.');
          }
        );
      }

    });
  
    return booking;
  }
  
  convertToDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Los meses en JavaScript son 0-indexed
  }

  handlePayment(booking: BookingDetail) {
    sessionStorage.setItem('booking', JSON.stringify(booking));
    this.router.navigate(['/checkout']);
    
  }

  handleRating(booking: BookingDetail) {
    sessionStorage.setItem('booking', JSON.stringify(booking));
    this.router.navigate(['/ranking']);
  }

  handleAccept(booking: BookingDetail) {
    this.bookingService.updateBookingStatus(booking.id, 'ACCEPTED').subscribe(
      () => {
        this.getBookings();
      },
      error => {
        console.error('Error al aceptar la solicitud:', error);
        alert('Ocurrió un error al aceptar la solicitud. Por favor, inténtelo de nuevo.');
      }
    );
  }

  handleReject(booking: BookingDetail) {
    this.bookingService.updateBookingStatus(booking.id, 'REJECTED').subscribe(
      () => {
        this.getBookings();
      },
      error => {
        console.error('Error al rechazar la solicitud:', error);
        alert('Ocurrió un error al rechazar la solicitud. Por favor, inténtelo de nuevo.');
      }
    );
  }

}

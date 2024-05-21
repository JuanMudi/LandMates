import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Booking } from '../models/booking/Booking.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  newBooking(startDate: string, endDate: string, guests: number, propertyId: string) {
    return this.http.post(`${this.apiUrl}/booking`, { startDate, endDate, guests, propertyId});
  }

  getBookings() {
    return this.http.get(`${this.apiUrl}/booking`);
  }

  getMyRequest(): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/booking/me`);
    
  }
  updateBookingStatus(id: string, status: string) {
    return this.http.put(`${this.apiUrl}/booking/status/${id}`, { status });
  }
  


}

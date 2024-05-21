import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  saveRating(rating: number, bookingId: string, comment: string) {
    return this.http.post(`${environment.apiUrl}/review`, { rating, bookingId, comment });
  }
}

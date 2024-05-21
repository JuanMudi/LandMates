import { Component, OnInit } from '@angular/core';
import { BookingDetail } from '../../../models/booking/BookingDetails.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingService } from '../../../services/rating.service';
import { RentService } from '../../../services/rent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit{

  message: string = '';
  rating: number = 0;
  bookingDetails: BookingDetail | undefined;

  constructor(private ratingService: RatingService, private bookingService: RentService, private router: Router) {}
  ngOnInit() {
    this.bookingDetails = JSON.parse(sessionStorage.getItem('booking') || '{}');
  }
  handleRating() {    
    this.rating = +this.rating;
    console.log('Rating:', this.rating);
    this.ratingService.saveRating(this.rating, this.bookingDetails!!.id, this.message).subscribe(
      response => {
        console.log('Rating saved:', response);
        alert('Rating saved successfully');
        this.bookingService.updateBookingStatus(this.bookingDetails!!.id, 'CLOSED').subscribe(
          () => {
            sessionStorage.removeItem('booking');
            this.router.navigate(['/bookings']);
          },
          error => {
            console.error('Error updating booking status:', error);
            alert('Error updating booking status. Please try again.');
          }
        );
      },
      error => {
        console.error('Error saving rating:', error);
        alert('Error saving rating. Please try again.');
      }
    );


  }

}

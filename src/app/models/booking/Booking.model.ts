import { BookingDetail } from "./BookingDetails.model";

export interface Booking {
    asLessee: BookingDetail[];
    asLessor: BookingDetail[];
  }
  
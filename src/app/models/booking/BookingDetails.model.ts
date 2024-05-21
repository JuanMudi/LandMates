export interface BookingDetail {
    id: string;
    startDate: string;
    endDate: string;
    guests: number;
    lesseeId: string;
    propertyId: string;
    status: string;
    startDateObject?: Date;
    endDateObject?: Date;
    propertyName?: string;
    totalPrice?: number;
  }
  
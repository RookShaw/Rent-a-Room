import { Component, OnInit } from '@angular/core';
import { HookupService } from '../hookup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.css'
})
export class ViewBookingsComponent {
  bookings: any[] = []


  constructor(public hookupService:HookupService){}


  deleteBooking(bookingId:number){
    this.hookupService.deleteBooking(bookingId).subscribe({
      next: ()=> {
        this.bookings = this.bookings.filter(booking => booking.bookingId !== bookingId)
      },
      error: (error)=> console.log("error: ", error)
    })
  }

  deleteSelected(){
    this.bookings.filter(booking => booking.selected).forEach(booking =>{
      this.deleteBooking(booking.bookingId)
    })
  }

 ngOnInit(){
  this.hookupService.viewBookings().subscribe({
    next: (data) => this.bookings = data, 
    error: (error)=> console.log("Error: ", error), 
    complete: ()=> console.log("Data fetching complete")
  })
 }

}

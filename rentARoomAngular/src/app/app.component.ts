import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddRoomComponent } from './add-room/add-room.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddRoomComponent, ViewBookingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rentARoomAngular';
}

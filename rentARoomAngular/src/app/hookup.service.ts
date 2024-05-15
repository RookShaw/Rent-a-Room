import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HookupService {


public baseURL:String = "http://localhost:3000"
  constructor(public http: HttpClient) { }

addRoom(buildingName:String, roomNumber:String){
  this.http.get(`${this.baseURL}/addRoom/${buildingName}/${roomNumber}`).subscribe({
    next: (response)=> console.log("Data sent successfully", response),
    error: (error) => console.log("Error sending data", error)
  })
}

deleteBooking(bookingId:number):Observable<any>{
  return this.http.get(`${this.baseURL}/deleteBooking/${bookingId}`)
}

viewBookings(): Observable<any[]>{
   return this.http.get<any[]>(`${this.baseURL}/checkBookings`)
}

}

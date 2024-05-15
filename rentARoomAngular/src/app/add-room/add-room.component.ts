import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HookupService } from '../hookup.service';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {

  buildingName = ''
  roomNumber =  ''


constructor(public hookupService:HookupService){

}
addRoom(){

this.hookupService.addRoom('Murray', '300')
}
 

}

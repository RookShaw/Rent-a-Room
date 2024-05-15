//
//  RoomView.swift
//  rentARoomIOS
//
//  Created by Rook Shaw on 5/7/24.
//

import Foundation

struct Room: Identifiable{
    var id = UUID()
    
    var building: String
    var roomNumber: Int
    var isBooked: Bool
}

var roomData = [
    Room(building: "Digital Tech", roomNumber: 101, isBooked: false),
    Room(building: "Digital Tech", roomNumber: 102, isBooked: false),
    Room(building: "Digital Tech", roomNumber: 103, isBooked: false),
    Room(building: "Digital Tech", roomNumber: 104, isBooked: false),
    Room(building: "Digital Tech", roomNumber: 105, isBooked: false)]

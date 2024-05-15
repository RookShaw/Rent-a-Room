//
//  RoomDetailView.swift
//  rentARoomIOS
//
//  Created by Rook Shaw on 5/7/24.
//

import SwiftUI

struct RoomDetailView: View {
    @State private var instructor: String = ""
    @State private var subject: String = ""
    @State private var startDate: Date = Date()
    @State private var endDate: Date = Date()
    var roomData: Room
    var body: some View {
        VStack(alignment: .center){
            Text(roomData.building)
                .font(.title)
            Text("Room: \(roomData.roomNumber)")
                .font(.title2)
            TextField("Instructor", text: $instructor)
                .padding()
                .textFieldStyle(RoundedBorderTextFieldStyle())
            TextField("Subject", text: $subject)
                .padding()
                .textFieldStyle(RoundedBorderTextFieldStyle())
            DatePicker("Start date and time:",
                       selection: $startDate,
                       displayedComponents: [.date])
            .padding()
            DatePicker("End date and time:", selection: $endDate,
                       displayedComponents: [.date])
            .padding()
            Button{
                //action go here
                Task{
                    do{
                        let result = try await NetworkManager().bookRoom(buildingName: "Digital Tech", roomNumber: 101)
                        print("Booking Response: \(result)")
                    } catch{
                        print("An error occured: \(error)")
                    }
                }
            } label:{
                Text("Book Room!")
                    .fontWeight(.bold)
                    .padding()
                    .background(Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(50)
            }
            
        }
    }
}

#Preview {
    RoomDetailView(roomData: Room(building: "Administration", roomNumber: 7361, isBooked: false))
}

//
//  RoomMenuItemView.swift
//  rentARoomIOS
//
//  Created by Rook Shaw on 5/7/24.
//

import SwiftUI

struct RoomMenuItemView: View {
    var roomData: Room
    var body: some View {
        VStack(alignment: .center){
            Text(roomData.building)
                .font(.title)
            
            Text("\(roomData.roomNumber)")
                .font(.title2)
            Divider()
        }.frame(maxWidth: .infinity, alignment: .center)
            .padding()
    }
}

#Preview {
    RoomMenuItemView(roomData: Room(building: "Welding", roomNumber: 666, isBooked: false))
}

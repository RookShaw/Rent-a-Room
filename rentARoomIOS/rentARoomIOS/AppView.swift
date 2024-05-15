//
//  AppView.swift
//  rentARoomIOS
//
//  Created by Rook Shaw on 5/7/24.
//

import SwiftUI

struct AppView: View {
    let RFC3339DateFormatter = DateFormatter()
  
    var body: some View {
        NavigationView{
            VStack{
                ScrollView{
                    ForEach(roomData){
                        room in
                        NavigationLink{
                            RoomDetailView(roomData: room)
                                
                        } label:{
                            RoomMenuItemView(roomData: room)
                            
                        }
                       
                    }
                        
                    }
                }
            }
        }
    }


#Preview {
    AppView()
}

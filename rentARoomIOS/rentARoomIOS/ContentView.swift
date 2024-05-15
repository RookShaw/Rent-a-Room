//
//  ContentView.swift
//  rentARoomIOS
//
//  Created by Rook Shaw on 5/6/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView{
            VStack {
              
                Text("Welcome to")
                    .bold()
                    .font(Font.system(size: 40))
                Text("NWKTC")
                    .bold()
                    .font(Font.system(size: 80))
                    .foregroundColor(.red)
                Text("Rent-A-Room")
                    .bold()
                    .font(Font.system(size: 40))
                    .padding(.bottom, 50)
                NavigationLink(destination: AppView()){
                    Text("Tap to enter App")
                        .fontWeight(.bold)
                        .padding()
                        .background(Color.red)
                        .foregroundColor(.white)
                        .cornerRadius(50)
                }
                
                
            }
            
            .padding()
        }
    }
}

#Preview {
    ContentView()
}

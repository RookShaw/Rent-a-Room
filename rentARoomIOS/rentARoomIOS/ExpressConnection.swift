//
//  ExpressConnection.swift
//  rentARoomIOS
//
//  Created by Rook Shaw on 5/9/24.
//

import Foundation

enum NetworkError:Error{
    case invalidURL
    case invalidResponse
    case invalidStatusCode
}

class NetworkManager{
    func bookRoom(buildingName: String, roomNumber: Int) async throws -> String{
        let urlString = "http://localhost:3000/bookRoom/\(buildingName)/\(roomNumber)"
        guard let url = URL(string: urlString) else{
            throw NetworkError.invalidURL
        }
        let (data, response) = try await URLSession.shared.data(from: url)
        guard let httpResponse = response as? HTTPURLResponse 
        else {
            throw NetworkError.invalidResponse
        }
        guard httpResponse.statusCode == 200 
        else{
            throw NetworkError.invalidStatusCode
        }
        if let responseString = String(data: data, encoding: .utf8) {
            return responseString
        } else{
            throw NetworkError.invalidResponse
        }
    }
}


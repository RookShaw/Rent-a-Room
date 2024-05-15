const express = require('express')

const app = express()
const mysql = require('mysql2');

async function runQuery(query){
    return new Promise((success, fail)=>{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'grandpaSpanky',
            password: '',
            database: 'rentARoom',
            port: 3306
        })
        connection.connect((err)=> {
            if(err){
                fail(err);
            }else{
                console.log("Connected, Daddy");
            }
        })
        connection.query(query, (err, result) => {
            if(err){
                fail(err)
                return;
            }
            success(result)
        });
    })
}

app.get('/', (request, response) => {
     response.send("Hello Big Daddy Skrt and the Pritch")
})

app.get('/addRoom/:buildingName/:roomNumber', (request, response) => {
     const {buildingName, roomNumber} = request.params;

     const addRoom = `INSERT INTO Room( Building, RoomNumber) VALUES ('${buildingName}', '${roomNumber}')`

     runQuery(addRoom).then((data)=>{
        response.send(data)
    }).catch((err)=>{
        response.send({"Error": err})
    })
})
app.get('/deleteBooking/:bookingId', (request, response) => {
    const {bookingId } = request.params;
     const deleteBooking = `DELETE FROM Bookings WHERE bookingId=${bookingId}`

     runQuery(deleteBooking).then((data)=>{
        response.status(200).send("Booking Deleted Successfully", data)
    }).catch((err)=>{
        response.status(503).send({"Error": err})
    })
})

app.get('/bookRoom/:buildingName/:roomNumber/:instructor/:subject/:startDate/:endDate', (request, response) => {
    const { buildingName, roomNumber, instructor, subject, startDate, endDate } = request.params;
    
    
    const findRoomID = `SELECT ID FROM Room WHERE Building='${buildingName}' && RoomNumber=${roomNumber}`
   
    runQuery(findRoomID).then(results => {
    if(results.length == 0){
    response.status(404).json({message: 'No room found in that building with that number'})
    return
    }
    const roomID = results[0].ID
   
    // Checks if the roomID has any bookings that overlap our requested dates in any way
    const isBookedQuery = `SELECT * FROM Bookings
    WHERE RoomID = ${roomID}
    AND (
    (Start <= ('${endDate} 04:00:00') AND End >= ('${startDate} 08:00:00'))
    OR (Start <= ('${startDate} 08:00:00') AND End >= ('${endDate} 04:00:00'))
    OR (Start >= ('${startDate} 08:00:00') AND End <= ('${endDate} 04:00:00'))
    )`
    return runQuery(isBookedQuery).then(results => {
    if(results.length > 0){
    response.status(409).json({message: 'Room is not available for the selected dates'})
    }else{
    const bookTheRoom = `INSERT INTO Bookings(RoomID, Start, End, Instructor, Subject) VALUES (${roomID}, ('${startDate} 08:00:00'), ('${endDate} 04:00:00'), '${instructor}', '${subject}')`
   
    return runQuery(bookTheRoom)
   
   
    }
    }).then(result => {
    if(result){
    response.status(201).json({message: "Room booked successfully"}) 
    }
    })
    }).catch(err => {
    response.status(500).json({"Error": err})
    })
   })

app.get('/checkRooms', (request, response) => {
    const checkRooms = `SELECT * FROM Room `
    runQuery(checkRooms).then((data)=>{
        response.send(data)
    }).catch((err)=>{
        response.send({"Error": err})
    })
})
app.get('/checkBookings', (request, response) => {
    const checkRooms = `SELECT * FROM Bookings `
    runQuery(checkRooms).then((data)=>{
        response.send(data)
    }).catch((err)=>{
        response.send({"Error": err})
    })
})

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})
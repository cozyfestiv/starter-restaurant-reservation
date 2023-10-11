# Thinkful Capstone: Restaurant Reservation System


This is a full-stack application completed as a capstone project for Thinkful's full-stack software engineering program. This application allows a restauarant to manage reservations by creating, editing, seating, and canceling reservations. It includes a search feature for finding reservations by phone number. 

## Live Demo

A live version of the project can be viewed [here][Live Version] . 

## Applied Technologies

<table border="0">
 <tr>
    <td>* React</td>
    <td>* Node.js</td>
    <td>* Express </td>
 </tr>
 <tr>
    <td>* HTML</td>
    <td>* Jest / Puppeteer</td>
    <td>* Knex</td>
 </tr>
   <tr>
    <td>* CSS / Bootstrap</td>
    <td>* Javascript </td>
    <td>* PostgreSQL API</td>
 </tr>
</table>

## Screenshots

![Dashboard](/images/Dashboard.png)
![New Reservation](/images/Reservation.png)
![Mobile](/images/Mobile.png)




## API Documentation

| Route                     | Method     |                          Description                             |
| ------------------------- | :----------: | :---------------------------------------------------------------------- |
| `/reservations`          |  GET | Returns a list of reservations for the current date  |
| `/reservations?{date}`    |  GET | Returns a list of reservations for the given date |
| `/reservations/new`          |  POST | Returns a list of reservations for the current date  |
| `/reservations/:reservation_id`    |  GET | Returns the reservation for the given ID |
| `/reservations/:reservation_id`    |  PUT | Updates the reservation for the given ID  |
| `/reservations/:reservation_id/status`    |  PUT | Updates the status of the reservation for the given ID |
| `/tables`          |  GET | Returns a list of tables  |
| `/tables`          |  POST | Creates a new table  |
| `/tables/:table_id`          |  GET | Returns the table fo the given ID  |
| `/tables/:table_id/seat`          |  PUT | Seats a reservation at the given table_id  |
| `/tables/:table_id/seat`          |  DELETE | Changes the occupied status to be unoccupaied for the given table_id  |

## Installation

1. Fork and clone this repository.
2. Run cp ./back-end/.env.sample ./back-end/.env.
3. Update the ./back-end/.env file with db connections. You can set some up for free with ElephantSQL database instances.
4. Run cp ./front-end/.env.sample ./front-end/.env.
5. You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5000.
6. Run npm install to install project dependencies.
7. Run npm run start:dev from the back-end directory to start your server in development mode.
8. Run npm start from the front-end directory to start the React app at http://localhost:3000.
  
[Live Version]: https://periodic-tables-restaurant-reservation-fo68.onrender.com/



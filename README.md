# Installation
  * node populate.js // for dummy data to database 
  * npm install
  * npm run start

# Pre-requestics
  * mongodb installed 
  * create db named  capital

# heroku host -- https://glacial-savannah-49803.herokuapp.com/

# API- List
  + Restaurant Apis
    1. /api/restaurant/ -- get all restaurants
       * method -- GET
    2. /api/restaurant/:id -- get single restaurant
       * method -- GET
       * id -- restaurantid 
    3. /api/restaurant/ -- create new Restaurant
       * method -- POST
       * params
         * name -- String 
         * location -- String
    4. /api/restaurant/:id -- delete restaurant
       * method -- DELETE
       * id -- restaurant id

    5. /api/restaurant/search/restaurant --serach restaurant by name, location
       * method -- GET
       * params
         * search -- String
  + Table Apis
    1. /api/tables -- add new Table
       * method -- POST
       * params 
         * restaurant -- String(id of restaurant)
         * table_number -- Number
         * capacity -- Number
    2. /api/tables/:id -- remove table
       * method -- DELETE
       * id -- String(tableid)
    3. /api/tables/:id/capacity --  update capacity
       * method -- PUT
       * params 
         * id -- String(table id)
         * capacity -- Number
    4. /api/tables/search/capacity -- serach table by cpacity for given restaurant
       * method -- GET
       * params 
         * restaurant -- String(restaurant id)
         * capacity -- Number
  + Booking Apis
    1. /api/bookings/ -- create bookings
       * method -- POST
       * params
         * table -- String(tableid)
         * booked_ from -- Date
         * booked_to -- Date
    2. /api/bookings/:bookingId/cancel -- cancel booking
       * method -- PUT
       * bookingId -- String (booking id)

    3. /api/bookings/:id/table/alloted -- Get bookings for a table by time range
       * method -- PUT
       * params
         * table -- String(tableid)
         * booked_ from -- Date
         * booked_to -- Date

  + Review Apis
    1. /api/reviews/:restaurantId -- get all review for restaurant
       * method -- GET
       * restaurantId -- String

    2. /api/reviews/ -- create new Review for restaurant
       * method -- POST
       * restaurant -- String(restaurant id)
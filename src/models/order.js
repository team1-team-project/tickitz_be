const db = require("../helpers/connection");
const { v4: uuidv4 } = require("uuid");

const orderModel = {
    getDetail : ({id_profile, id_booking}) => {
        return new Promise((resolve, reject) => {
            db.query(`select booking.seat, id_booking, booking.id_data,profile.id_profile,movies.movie_name,category.category,cinemas.cinema_name, cinemas.cinema_room,cinemas.price,
            profile.email,profile.phone,profile.first_name from booking
            left join data_movies on booking.id_data=data_movies.id_data     
            left join movies on movies.id_movies = data_movies.id_movies      
            left join cinemas on cinemas.id_cinema = data_movies.id_cinema       
            left join profile on profile.id_profile = booking.id_profile            
            left join category on category.id_category = movies.id_category where profile.id_profile='${id_profile}' and booking.id_booking='${id_booking}'`, (err, result) => {
                if(err) {
                    return reject(err.message)
                } else {
                    return resolve(result.rows[0])
                }
            })
        })

    },
}

module.exports = orderModel

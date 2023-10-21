const pool = require('../config/db');

class Movies {
    constructor(id, title, genres, year, photo) {
        this.id = id; // Tidak perlu melakukan parsing ke tipe data number
        this.title = title;
        this.genres = genres;
        this.year = year;
        this.photo = photo;
    }

    static getMovies(callback) {
        const query = 'SELECT * FROM public.movies';
        pool.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result.rows);
            }
        });
    }

    static uploadMovies(req, callback) {
        const { id, title, genres, year, photo } = req;
        const query = 'UPDATE public.movies SET title=$1, genres=$2, year=$3, photo=$4 WHERE id=$5';
        const values = [title, genres, year, photo, id];

        pool.query(query, values, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result.rows);
            }
        });
    }
}

module.exports = Movies;

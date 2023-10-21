const Movies = require('../model/moviesModel');

class Controller {
    static getMovies(req, res) {
        Movies.getMovies((error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json(result);
            }
        });
    }

    static uploadMovies(req, res) {
        const { id, title, genres, year } = req.body;
        const photo = req.file.filename;

        Movies.uploadMovies({ id, title, genres, year, photo }, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json(result);
            }
            console.log(req.file.filename);

        });
    }
}

module.exports = Controller;

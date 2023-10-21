const express = require('express');
const route = express.Router();
const Controller = require('../controller/moviesController');
const multer = require('multer');
const path = require('path');

// Konfigurasi multer
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

route.put(
    "/uploads",
    multer({ storage: diskStorage }).single("photo"),
    (req, res) => {
        const file = req.file.path;
        console.log(file);
        if (!file) {
            res.status(400).send({
                status: false,
                data: "No File is selected.",
            });
        }else{
            res.json({
                message : 'Success to Upload',
                storage : file
            })
        }
        
    }
);

const upload = multer({ storage: diskStorage });

route.use('/uploads', express.static(path.join(__dirname, "../uploads")));

route.get("/", Controller.getMovies);
route.put("/", upload.single('photo'), Controller.uploadMovies);


module.exports = route;

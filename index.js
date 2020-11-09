const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const index = express();
const port = 5000;

// vuew engine hbs
index.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'ilham',
    password: '0000',
    database: 'My_TODO'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

index.get('/', (req, res) => {
    koneksi.query('SELECT*FROM aktivitas', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'ACTIVITAS',
            data: hasil
        });
    });
});


index.post('/tambahkegiatan', (req, res) =>{
    var detailkegiatan = req.body.inputdetailkegiatan;
    var tanggal = req.body.inputtanggal;
    koneksi.query('INSERT INTO aktivitas(detail_kegiatan, tanggal)values(?,?)',
    [detailkegiatan, tanggal],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});
index.listen(port, () => {
    console.log(`app MY_TODO berjalan pada port ${port}`);
});


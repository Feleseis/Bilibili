const db = require('./server/mongo.js');
const path = require('path');
const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 4000);


// 设置路由
app.get('/', (req, res) => {
    res.type('text/html');
    res.sendfile('./public/index.html');
});

// app.get('/about', (req, res) => {
//     res.type('text/html');
//     res.sendfile('./public/info.html');
// });



// app.get('/info', (req, res) => {
//     res.type('text/json');
//
//     // db.find('users', 'find', [{}, {'_id' : 0, 'fans' : 1}], (data) => {
//     //     console.log(data);
//     //     res.send(data);
//     // });
// });



app.listen(app.get('port'), () => {
    console.log(app.get('port'));
});

const path = require('path');
const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 4000);

// app.use('/', indexRouter);

// 设置路由
app.get('/', (req, res) => {
    // res.type('text/plain');
    // res.render('home');
    // res.send('index.html')
    res.type('text/html');
    res.sendfile('./public/index.html');
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.sendfile('./public/info.html');
});

// // 设置 handlebars 视图引擎
// app.set('views', path.join(__dirname, 'views'));
// const handlebars = require('express-handlebars').create({defaultLayout : 'main'});
// app.engine('handlebars', handlebars.engine);
// app.set('view engine', 'handlebars');
// // 定制 404 页面
// app.use((req, res) => {
//     res.type('text/plain').status(404).render('404');
// });
//
// // 定制 500 页面
// app.use((err, req, res, next) => {
//     res.type('text/plain').status(500).render('500');
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'));
});

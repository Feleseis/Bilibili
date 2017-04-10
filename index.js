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
app.get('/ranking', (req, res) => {
    res.type('text/html');
    res.sendfile('./public/ranking.html');
});
app.get('/info', (req, res) => {
    res.type('text/html');
    res.sendfile('./public/info.html');
});

app.get('/ajax', (req, res) => {
    res.type('text/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    switch (req.query.type) {
        case 'index':
            res.sendfile(`${__dirname}/server/static/index.json`);
            break;
        case 'ranking':
            res.sendfile(`${__dirname}/server/static/ranking.json`);
            break;
        case 'uplist':
            res.sendfile(`${__dirname}/server/static/uplist.json`);
            break;
        case 'user':
            if (req.query.mid) {
                const obj = {};
                db.find('users', 'find', [{'mid' : req.query.mid}, {
                    '_id' : 0,
                    'mid' : 1,
                    'name' : 1,
                    'regtime' : 1,
                    'place' : 1,
                    'fans' : 1,
                    'playNum' : 1,
                    'current_exp' : 1,
                    'submit' : 1,
                    'tlist' : 1
                }], (result) => {
                    obj['user'] = result[0];
                    db.find('videos', 'find', [{'mid' : +obj['user']['mid']}, {
                        '_id' : 0,
                        'title' : 1,
                        'mid' : 1,
                        'aid' : 1,
                        'favorites' : 1,
                        'play' : 1,
                        'coin' : 1,
                        'share' : 1,
                        'tlist' : 1,
                        'danmaku' : 1
                    }], (result2) => {
                        obj['video'] = result2;
                        res.send(obj);
                    });
                });
            }
            break;
        default:
            console.log('no res');
            break;
    }

});


app.listen(app.get('port'), () => {
    console.log(app.get('port'));
});

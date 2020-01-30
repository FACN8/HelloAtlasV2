const test = require('tape');
const supertest = require('supertest');
const router =require('./router');
const optionsForI = [
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq"
  ];
  const denmarkPhotoResults = ["https://images.unsplash.com/photo-1551651767-d5ffbdd04b83?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExMzA4Nn0","https://images.unsplash.com/photo-1521240104483-b3e91583366c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExMzA4Nn0","https://images.unsplash.com/photo-1520430825812-775990ecfb13?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExMzA4Nn0","https://images.unsplash.com/photo-1534684105949-56869170677f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExMzA4Nn0","https://images.unsplash.com/photo-1531834486615-2aef2d365673?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExMzA4Nn0","https://images.unsplash.com/photo-1530778371056-14819149fb48?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExMzA4Nn0"]
test('Home route should work', t=>{
    supertest(router)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end ((err,res)=>{
            t.error(err)
            t.equal(res.type,'text/html','Response should return the index.html');
            t.end();
    })
})

test('Public route should work for html files', t=>{
    supertest(router)
    .get('/public/index.html')
    .expect(200)
    .expect('Content-Type', /html/)
    .end ((err,res)=>{
            t.error(err)
            t.equal(res.type,'text/html','Response should return the index.html');
            t.end();
    })
})

test('Public route should work for css files', t=>{
    supertest(router)
    .get('/public/style.css')
    .expect(200)
    .expect('Content-Type', 'text/css')
    .end ((err,res)=>{
            t.error(err)
            t.equal(res.type,'text/css','Response should return the styles.css');
            t.end();
    })
})
test('Public route should work for javascript files', t=>{
    supertest(router)
    .get('/public/script.js')
    .expect(200)
    .expect('Content-Type', /javascript/)
    .end ((err,res)=>{
            t.error(err)
            t.equal(res.type,'application/javascript','Response should return the styles.css');
            t.end();
    })
})
test('Public route should work for Images', t=>{
    supertest(router)
    .get('/public/res/BackGround.jpg')
    .expect(200)
    .expect('Content-Type', /image/)
    .end ((err,res)=>{
            t.error(err)
            t.equal(res.type,'image/x-icon','Response should return the styles.css');
            t.end();
    })
})
test('Type route should return an array with 5 options', t=>{
    supertest(router)
    .get('/type/i')
    .expect(200)
    .end ((err,res)=>{
            t.error(err)
            t.equal(res.text,JSON.stringify(optionsForI));
            t.end();
    })
})

test('Photos route should return an array with 6 image urls', t=>{
    supertest(router)
    .get('/photos?query=Denmark')
    .expect(200)
    .end ((err,res)=>{
        const result = JSON.parse(res.text);
            t.error(err)
            t.equal(result.length,6);
            t.end();
    })
})

test('Photos route for denmark should return the denmark results', t=>{
    supertest(router)
    .get('/photos?query=Denmark')
    .expect(200)
    .end ((err,res)=>{
        const result = JSON.parse(res.text);
            t.error(err)
            t.deepEqual(result,denmarkPhotoResults);
            t.end();
    })
})


const test = require('tape');
const supertest = require('supertest');
const router =require('./router');

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


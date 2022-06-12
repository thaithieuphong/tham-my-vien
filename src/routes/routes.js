// const express = require('express');
const managerRouter = require('./manager');
const loginRouter = require('./login');
const adminRouter = require('./admin');


function route(app) {

    app.use('/admin', adminRouter);
    app.use('/manager', managerRouter);
    app.use('/', loginRouter);
    
      
    // app.post('/', (req, res) => {      
    //     res.render('manager');
    // });

    // app.use('/manager', managerRouter);
      
    // app.get('/home', (req, res) => {
    //     res.render('home');
    // });
      
    // app.get('/news', (req, res) => {
    //     res.render('news');
    // });
}

module.exports = route;
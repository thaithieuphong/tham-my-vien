
function route(app) {
    app.get('/', (req, res) => {
        res.render('login', {layout: false});
    });
      
    app.post('/home', (req, res) => {      
        res.render('home');
    });
      
    app.get('/home', (req, res) => {
        res.render('home');
    });
      
    app.get('/news', (req, res) => {
        res.render('news');
    });
}

module.exports = route;
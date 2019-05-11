


app.get('/home', function(req, res) {
    res.send('Welcome!');
});

app.get('/secret', function(req, res) {
    res.send('The password is potato');
});
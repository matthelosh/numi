var express = require('express'),
    app     = express(),
    port    = process.env.PORT || 3784,
    mongoose= require('mongoose'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    appRoutes = require('./app/routes/api')(router),
    path = require('path'),
    morgan  = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/numi', function(err){
  if (err){
    console.log('Not Connected to DB'+ err);
  }else {
    console.log('Connected to DB');
  }
});

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
  console.log('Running on port ' + port);
});

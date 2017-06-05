var User    = require('../models/user');
module.exports = function(router){
  router.post('/users', function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email    = req.body.email;
    if (req.body.username == null || req.body.username == "" || req.body.password == '' || req.body.email == '' ) {
      res.json({ success: false, message:'Ensure username, password and email were provided' })
    } else {
      user.save((err)=>{
        if(err){
          res.json({ success: false, message:'Username or Email already exists' });
        }else{
          res.json({ success: true, message:'User created' });
        }
      });
    }

  });

  router.get('/getUsers', function(req, res){
    User.find({}, function(err, users){
      if(err) throw err;
      else{
        console.log(users);
        res.send(users);
      }
    });
  })

  return router;
}

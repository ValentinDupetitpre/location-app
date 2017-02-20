var express = require('express');
var fs = require('fs');
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended : false});

var app=express();
app.use(bodyParser.json());

function readContent(callback){
  fs.readFile('users.json', 'utf8', function(err, data){
    if (err) throw err;
    callback(null,data);
  });
};

function writeContent(jsonData, callback){
  fs.writeFile('users.json', jsonData, 'utf8', function(err){
    if(err) throw err;
    callback(null);
  });
};

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/index', function(req, res){
  var jsoncontent;

  readContent(function(err, data){
    jsoncontent = JSON.parse(data);
    res.send(jsoncontent);
  })
});



app.post('/index/addRunner', function (req, res){
  if (req.body != ''){
    var jsoncontent;

    readContent(function(err, data){
      jsoncontent = JSON.parse(data);
      //si l'utilisateur à rentré toutes les infos
      if(req.body.locations.label != '' && req.body.locations.lat != ''){
        jsoncontent.push({
          email:req.body.email,
          locations:{
            label: req.body.locations.label,
            lng: req.body.locations.lng,
            lat: req.body.locations.lat
          }
        });
      //si l'utilisateur n'a pas saisi le nom de la ville (label)
      }else if (req.body.locations.lat != '') {
        jsoncontent.push({
          email:req.body.email,
          locations:{
            lng: req.body.locations.lng,
            lat: req.body.locations.lat
          }
        });

      }else{
        jsoncontent.push({
          email:req.body.email,
          locations:{
            label: req.body.locations.label
          }
        });
      }

      writeContent(JSON.stringify(jsoncontent), function(err){
        console.log("fichier sauvegardé !");
      });
    });
  }else{
    console.log("newRunner est vide !");
  }

  res.redirect('/index');
});

function toRadians(degree){
  return Math.PI * degree / 180;
}


function distance(lat1_deg, lng1_deg, lat2_deg, lng2_deg){
    var R = 6371000; //Rayon de la Terre en mètres
    //On transforme les données en radians
    var lat1=toRadians(lat1_deg);
    var lat2=toRadians(lat2_deg);
    var dLat=toRadians(lat2_deg - lat1_deg);
    var dLng=toRadians(lng2_deg - lng1_deg);

    // formule :
    // a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
    // c = 2 ⋅ atan2( √a, √(1−a) )
    // d = R ⋅ c

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng/2) * Math.sin(dLng/2);
    var c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

    return R*c;
}


app.get('/findRunner', function(req,res){
  var lat=req.query['lat'];
  var lng=req.query['lng'];
  var response = [];
  var jsoncontent;

  readContent(function(err, data){
    jsoncontent = JSON.parse(data);
    for (k=0; k<jsoncontent.length; k++){
      console.log (k, ' : ', jsoncontent[k].locations.lat, ' - ', jsoncontent[k].locations.lng);
      if (distance(lat, lng, jsoncontent[k].locations.lat, jsoncontent[k].locations.lng) < 20000) {
        console.log('email : ', jsoncontent[k].email);
        response.push({
          email:jsoncontent[k].email,
          locations:{
            label: jsoncontent[k].locations.label,
            lng: jsoncontent[k].locations.lng,
            lat: jsoncontent[k].locations.lat
          }
        });
      }
    }
    res.send(response);
  })
})



app.listen(3000, function () {
    console.log("Listening 3000")
});

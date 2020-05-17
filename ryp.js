// var MongoClient = require('mongodb').MongoClient;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://root:toor@cluster0-vjlvh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url, {
    useUnifiedTopology: true
});
client.connect(err => {
    const collection = client.db("ryp").collection("users");
    console.log(err)
        // perform actions on the collection object
        // client.close();
});
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var http = require('http');
var ObjectId = require('mongodb').ObjectID;
let ejs = require('ejs');

const app = express();
const Joi = require('joi');
var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
// app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat'
}));
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
app.use(express.static('public'));
app.set('view engine', 'ejs');
// app.use(express.bodyParser());
app.get('/css/bootstrap.min.css', (req, res) => {
    res.sendFile(__dirname + "/" + "css/bootstrap.min.css");
})
app.get('/css/all.css', (req, res) => {
    res.sendFile(__dirname + "/" + "css/all.css");
})
app.get('/css/bootstrap.bundle.min.js', (req, res) => {
    res.sendFile(__dirname + "/" + "css/bootstrap.bundle.min.js");
})
app.get('/jq.js', (req, res) => {
    res.sendFile(__dirname + "/" + "jq.js");
})
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/" + "style.css");
})
app.get('/anime.min.js', (req, res) => {
    res.sendFile(__dirname + "/" + "anime.min.js");
})
app.get('/signIn', (req, res) => {
    // res.sendFile(__dirname+"/"+"form.html");
    res.sendFile(__dirname + "/" + "send.html");
})
app.get('/logo.png', (req, res) => {
    res.sendFile(__dirname + "/" + "logo.png");
})
app.get('/log', (req, res) => {
    // res.sendFile(__dirname+"/"+"form.html");
    res.sendFile(__dirname + "/" + "login.html");
})
app.get('/home', (req, res) => {

    response = {
        name: req.query.name,
        Email: req.query.Email,
        password: req.query.Password
    };
    console.log(response);
    res.push(response);
    res.end();
})
app.post('/data', urlencodedParser, (req, res) => {
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function(err, db) {
            if (err) throw err;
            var dbs = db.db('ryp');
            dbs.collection("users").insertOne({
                name: req.body.name,
                Email: req.body.Email,
                password: req.body.pass
            }, function(err, ress) {
                if (err) throw err;
                console.log("User Rec Inserted");
            })
            res.redirect('/log');
            res.end();
        })
    })
    // app.post('/loginc',urlencodedParser,function(req,res){

// 	MongoClient.connect(url,function(err,db){
// 		if (err) throw err;
// 		var dbs=db.db('ryp');

// 		dbs.collection("users").find({Email:req.body.uname}).toArray(function(err,ress){
// 		if (err) throw err
// 		else{
// 			// console.log(ress.toString());
// 			// console.log(JSON.stringify(ress));

// 				var data=JSON.stringify(ress);
// 				var j=JSON.parse(data);
// 				var idd=j[0]['_id'];
// 				return idd;

// 			// console.log(j[0]['_id']);
// 			// ejs.render('welcome',{id:idd};
// 			// var id="id";
// 			req.session['ids']=idd;
// 			// req.session.save();
// 			console.log(" iii "+req.session.ids);

// 		}
// 		db.close();

// 		});

// 	});
// 	var id=1;
// 	res.redirect('/welcome/'+id);
// 	res.end();
// })

app.post("/InsertRating", urlencodedParser, (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbs = db.db('ryp');
        var Rating = (Number(req.body.rating) + Number(req.body.tskills) + Number(req.body.tsuport)) / 3
        console.log();
        var tid = req.body.Tid;
        dbs.collection('tdata').update({
                "_id": ObjectId(tid)
            }, {
                $set: {
                    "rating": Rating.toFixed(1)
                }
            },
            function(err, result) {
                if (err) {
                    throw err
                } else {
                    console.log("Updated")
                }
            }
        )
        dbs.collection("rating").insert({
            "uid": req.body.Uid,
            "tid": req.body.Tid,
            "Nature": req.body.a,
            "Tag": req.body.tag,
            "cmt": req.body.cmt
        }, function(err, ress) {
            if (err) throw err;
            console.log("1 Rec Inserted");
        })
        res.send(req.body)
        res.end();
    })
})

app.get("/welcome", (req, res) => {
    function send(res, uid, name, email) {
        var uid = uid;
        var name = name;
        console.log("Uid " + uid);
        // return uid;
        res.redirect("/welcome/" + uid)
    }

    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbs = db.db('ryp');
    //     dbs.collection("users").find({
    //         "Email": req.query.uname
    //     }).toArray(function(err, ress) {
    //         if (err) throw err
    //         else {
    //             // console.log(ress.toString());
    //             // console.log(JSON.stringify(ress));

    //             var data = JSON.stringify(ress);
    //             var j = JSON.parse(data);
    //             var idd = j[0]['_id'];
    //             var name = j[0]['name'];
    //             var email = j[0]['Email'];
    //             // res.redirect('/?valid=' + idd);
    //             // send(res,idd,name,email);
    //             res.render(__dirname + "/" + "welcome", {
    //                 id: idd
    //             });
    //             // return idd;
    //             // res.write(idd);
    //             // console.log(j[0]['_id']);
    //             // ejs.render('welcome',{id:idd};
    //             // var id="id";
    //             // req.session['ids']=idd;
    //             // req.session.save();
    //             // console.log(" iii "+req.session.ids);

    //         }
    //         db.close();

    //     });

    // });


    // var id=1;
    // res.redirect('/welcome/'+id);
    // res.end();
})




app.post('/tdata', (req, res) => {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        var dbs = db.db('ryp');
        var dep = JSON.stringify(req.body.dep);
        var course = JSON.stringify(req.body.course);
        var dep = JSON.parse(dep);
        var course = JSON.parse(course);
        dbs.collection("tdata").find({
            'department': dep,
            'course': course
        }).toArray((err, ress) => {
            if (err) throw err
            else {
                var data = JSON.stringify(ress);
                var j = JSON.parse(data);
                res.send(j);
                // console.log(ress);
                // var idd=j[0]['_id'];

                // var name=j[0]['name'];
                // var email=j[0]['Email'];
                // res.render(__dirname+"/"+"tsearch",{tid:idd,tname:name});
            }
        });
    });
});
// app.get('/welcome/:id',(req,res)=>{
// 	var uid=req.params.id;
// 	var name=req.params.name;
// 	var email=req.params.email;
// 	// res.send(uid);
// 	res.render(__dirname+"/"+"welcome",{id:uid});

// })
function valiuser(user) {
    const schema = {
        name: Joi.string().required(),
        Email: Joi.string().required().email(),
        pass: Joi.required(),
        submit: Joi.required()
    };
    return Joi.validate(user, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Opening Port ${port} ........`));
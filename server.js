
// gqvquintela@gmail.com   -- gregorio 
var express = require('express'),
cors = require('cors'),
app = express(),
port = process.env.PORT || 8080;

var request = require('request');

mongoose = require('mongoose'),
// Exam = require('./api/models/ExamModel'),
User = require('./api/models/UserModel'),
Area = require('./api/models/AreaModel'),
Tema = require('./api/models/TemaModel'),
Question = require('./api/models/QuestionModel'),
Option = require('./api/models/OptionModel'),
Evaluation = require('./api/models/EvaluationModel')
// auth = require('./api/auth'),




// Category = require('./api/models/CategoryModel'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/olimpiadadb');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/public'));
// app.use(function(req, res, next) {
// res.header("Access-Control-Allow-Origin", "*");
// res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
// res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept");
// next();
// });
   
var routeUser = require('./api/routes/UserRoutes');
var routeArea = require('./api/routes/AreaRoutes');
var routeTemario = require('./api/routes/TemarioRoutes');
var routeQuestion = require('./api/routes/QuestionRoutes');
var routeEvaluation = require('./api/routes/evaluationRoutes');

routeUser(app);
routeArea(app);
routeTemario(app);
routeQuestion(app);
routeEvaluation(app);
app.listen(port);

console.log('exam list rest API server started on:'+port);


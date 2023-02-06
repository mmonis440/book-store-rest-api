var express = require('express');
var bodyparser = require('body-parser');
var morgan = require ('morgan');
const app= express();
var cors = require('cors');
const helmet = require('helmet');
var debug = require('debug');
var path = require('path');
var cookieparser = require ('cookie-parser');
var mongoose = require('mongoose');

//require('dotenv').config();
//const mongoString = process.env.DATABASE_URL

//mongoose.connect(mongoString);
//const database = mongoose.connection

/*database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
});*/

const ads = [
  {title: 'Hello, world (again)!'}
];

app.use(helmet());
app.use(bodyparser.json());
app.use(cors());
app.use(morgan('combined'));

const port = 8000;
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/ads');
const {deleteAd,updateAd} = require ('./database/ads');



 app.get('/',async(req,res,next)=>{
   res.send(await getAds());
 });

 app.post('/',async (req,res)=>{
  const newadd = req.body ;
  await insertAd(newadd);
  res.send({messagge:'new add inserted in the database'});
 })

 app.delete('/:id',async (req,res)=>{
  await deleteAd(req.params.id);
  res.send({messagge:`database deleted with id ${id}`})
 });

 app.put('/:id',async (req,res)=>{
  const updateAd = req.body ;
  await updateAd(req.params.id,updateAd);
res.send({messaggeupdate : 'item updated sucessfully'}) 
 })

async function start(){
  await insertAd({title :"Hello the rest api of volume bank amsws console"});
};


 app.listen(port , ()=>console.log(`databases is listening on ${port}`))
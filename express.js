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
const {deleteAd,updateAd} = require ('./database/ads')



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

 startDatabase().then(async () => {
  await insertAd({title: 'Hello, now from the in-memory database!'});
 });


 app.listen(port , ()=>console.log(`databases is listening on ${port}`))
const express = require('express');
 const ObjectID = require('mongodb').ObjectID;
const port = 3001;
const bodyparser = require('body-parser')
const app = express();

app.use(express.static('public'))

// Body-parser middleware

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
//mongo connection


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html')
})


app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
})

app.get('/showData', (req, res) => {
    res.sendFile(__dirname + '/public/showData.html')
})










const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://nur:99088@cluster0.jzt6s.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("college").collection("student");
    console.log('Connection successfull')

  app.patch('/updateData/:id',(req,res)=>{
      collection.updateOne({_id:ObjectID(req.params.id)},
      {
          $set:{name:req.body.name,age:req.body.age,city:req.body.city,date:req.body.data}
      } )
      .then(result=>{
          console.log(result)
      })
  })



    app.get('/load/:id',(req,res)=>{
        collection.find({_id:ObjectID(req.params.id)}).toArray((err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                res.send(result[0])
            }
        })
    })





    app.post('/addData', (req, res) => {
        const data = {
            name: req.body.name,
            age: req.body.age,
            city:req.body.city,
            date:req.body.date
        }
        collection.insertOne(data, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(`1 item added successfully`)
                res.sendFile(__dirname+'/public/success.html')
            }
           
        })
     
    })


    app.get('/show', (req, res) => {
        collection.find({}).toArray((err, result) => {
            res.send(result)
        })
    })

    app.delete('/deleteData/:id',(req,res)=>{

        let id=req.params.id;
        collection.deleteOne({'_id':ObjectID(id)},(err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log('1 item deleted successfully')
              
            }
        })




    })


});





































// server listening
app.listen(port, () => {
    console.log(`your server is listening at port ${port}`)
})
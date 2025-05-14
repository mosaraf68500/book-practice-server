const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port=process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());



// CRUD_OPARETION
// pZHMhsOBNRNqZ86d



const uri = "mongodb+srv://CRUD_OPARETION:pZHMhsOBNRNqZ86d@cluster0.bvkgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();

    const collectionBooks=client.db('booksdb').collection('books');


    app.post("/books",async(req,res)=>{
        const book=req.body;
        const result=await collectionBooks.insertOne(book);
        res.send(result);
    })



    app.get("/books",async(req,res)=>{
        const cursor=collectionBooks.find();
        const result=await cursor.toArray();
        res.send(result);
    })

    app.get("/books/:id", async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const result=await collectionBooks.findOne(query);
        res.send(result)
    })


    app.delete("/books/:id",async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const result=await collectionBooks.deleteOne(query);
        res.send(result);

    })







    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);






app.get("/",(req,res)=>{
    res.send("crud operation server ");
})

app.listen(port,()=>{
    console.log(`CRUD opertion server side in runngin on:${port}`);
})
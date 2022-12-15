const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const Article = require('./models/articles');



app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');  

// Get Method To Get all the Articles
app.get('/articles',function(req,res){

 Article.find(function(err,foundArticles){
    if(!err){
        res.send(foundArticles);
    }
    res.send(err);
})

})

//post method to post a new article

app.post('/articles',function(req,res){

 const newArticle = new Article({
    title:req.body.title,
    content:req.body.content
 });
   
 newArticle.save(function(err){
    if(!err){
        res.send("Succesfully added new Article")
    }
    else{
        res.send(err);
    }
 });
         })

//Delete Method To Delete all the articles

app.delete('/articles',function(req,res){

    Article.deleteMany(function(err){
        if(!err){
            res.send("All items are deleted");
        }
        else{
            res.send(err);
        }
    })

})



///Request Targeting a Specific article
//get a Specific Article
app.route("/articles/:articleTitle")

.get(function(req,res){

    Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
         if(foundArticle){
            res.send(foundArticle);
         }
         else{
            res.send("No Matching Title was found");
         }
    })

})
//Updated Article

.put(function(req,res){
    var myquery = { title:req.params.articleTitle};
    var newvalues = { $set: { title:req.body.title, content:req.body.content} };
    Article.updateOne(myquery,newvalues,
        function(err){
            if(!err){
                res.send("Article Updated");
            }
        }
        )


})
//patch specific field
.patch(function(req,res){
    var myquery = { title:req.params.articleTitle};
    var newvalues = { $set: { title:req.body.title} };
    Article.updateOne(myquery,newvalues,
        function(err){
            if(!err){
                res.send("Article Updated");
            }
        }
        )


})

.delete(function(req,res){
    var myquery = { title:req.params.articleTitle};
    var newvalues = { $set: { title:req.body.title} };
    Article.deleteOne(myquery,
        function(err){
            if(!err){
                res.send("Article Deleted Succesfully");
            }
        }
        )


})




app.listen(port,function(err){
    if(err){
        console.log("Error running the server");
    }
    console.log(`Server is Running on port ${port}`);
})
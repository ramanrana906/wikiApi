const mongoose  = require('mongoose');


let articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    content :{
        type:String,
        required: true
    }
    
  })

  const Article = mongoose.model('Article', articleSchema);
module.exports = Article;   
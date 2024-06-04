const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

const path = require('path'); // Required for absolute path

mongoose.connect('mongodb://localhost/bharatInternDatabase')
app.set('views', path.join(__dirname, 'views')); // Absolute path to views directory
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles }) // Adjust filename if needed
})

app.use('/articles', articleRouter)

app.listen(3000, () => {
  console.log("Server started at port 3000...")
})

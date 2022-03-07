const express = require('express');
require('dotenv').config();
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const User = require('./models/User');
const Category = require('./models/category')
const auth = require('./middleware/auth');
const path= require('path');
const mongoose = require('mongoose')

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})

app.use(express.json());

app.use(express.static(path.join(__dirname,'./public')));

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/register',(req,res)=>{
    res.render('register');
})
app.get('/category',(req,res)=>{
    res.render('category');
})
app.get('/addquestion',async (req,res)=>{
    const categories = await Category.find();
    res.render('addquestion',{categories});
})

app.get('/questionnaire',(req,res)=>{
    res.render('questionnaire');
})

app.post('/user/register', async (req, res) => {
    const user = new User(req.body);
    try { 
        await user.save(); 
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    }catch(e){
        res.status(400).send(e);
    }
})

app.post('/addcategory',auth, async (req, res) => {
    const category = new Category(req.body);
    try { 
        await category.save(); 
        res.status(201).send();
    }catch(e){
        res.status(400).send(e);
    }
})

app.post('/user/login',  async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

app.get('/getCategory/:id',async (req,res)=>{
    const category= await Category.findById(req.params.id);
    res.status(200).send({
            category:category.category
    })
})

app.get('/questions',auth, async (req,res)=>{
    const questions= await Question.find();
    res.status(200).send({
            questions
    })
})

app.post('/question',auth, async (req, res) => {
    const question = new Question(req.body);
    try {
        await question.save();
        return res.status(201).send();
    } catch(e) {
        console.log(e)
        res.status(404).send();
    }
});

app.post('/postanswers',auth, async (req,res)=>{
    const answer = new Answer(req.body);
    try {
        await answer.save();
        return res.status(201).send();
    } catch(e) {
        console.log(e)
        res.status(404).send();
    }
})


app.listen(process.env.PORT,()=>{
    console.log("------------Server running on port ", process.env.PORT);
})
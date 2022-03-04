const express = require('express');
require('dotenv').config();
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const User = require('./models/User');
const auth = require('registry-auth-token');
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
app.get('/addquestion',async (req,res)=>{
    const categories = await Question.find().distinct('category');
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

app.get('/questions',async (req,res)=>{
    const questions= await Question.find();
    res.status(200).send({
            questions
    })
})

app.post('/question', async (req, res) => {

    const question = new Question(req.body);
    try {
        await question.save();
        return res.status(201).send();
    } catch(e) {
        console.log(e)
        res.status(404).send();
    }
});


app.listen(process.env.PORT,()=>{
    console.log("------------Server running on port ", process.env.PORT);
})
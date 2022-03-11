const express = require('express');
require('dotenv').config();
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const User = require('./models/User');
const Category = require('./models/category')
const auth = require('./middleware/auth');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})

app.use(express.json());

app.use(cors());

app.use(express.static(path.resolve(__dirname, "./react-app/build")));

app.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

app.post('/user/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
})

app.post('/addcategory', auth, async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        res.status(201).send();
    } catch (e) {
        res.status(400).send(e);
    }
})



app.get('/getCategory/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.status(200).send({
        category: category.category
    })
})


app.get('/qa/getcategories', async (req, res) => {
    const categories = await Category.find();
    res.send({ categories });
})

app.get('/qa/getquestions', auth, async (req, res) => {
    const questions = await Question.find();
    res.status(200).send({
        questions
    })
})

app.post('/qa/postquestion', auth, async (req, res) => {
    const question = new Question(req.body);
    try {
        await question.save();
        return res.status(201).send();
    } catch (e) {
        console.log(e)
        res.status(404).send();
    }
});



app.post('/qa/postanswers', auth, async (req, res) => {
    console.log(req.body)
    const answer = new Answer(req.body);
    try {
        await answer.save();
        return res.status(201).send();
    } catch (e) {
        console.log(e)
        res.status(404).send();
    }
})
app.get('/qa/showAnswers', async (req, res) => {
    const user = await User.findOne({})
    const answers = await Answer.find({ user_id: user._id });
    const ans = []
    for (let i = 0; i < answers.length; i++) {
        const ques = await Question.findOne({ _id: answers[i].question_id })
        ans.push({ name: user.name, question: ques?.question, answer: answers[i].answer, createdAt: answers[i].createdAt })
        console.log(answers[i].createdAt)
    }
    res.send({ ans })
})



app.listen(process.env.PORT, () => {
    console.log("------------Server running on port ", process.env.PORT);
})
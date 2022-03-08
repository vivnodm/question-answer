const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
    { timestamps: true }
);

userSchema.virtual('question', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'question'
})

userSchema.virtual('answer', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'answer'
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userCopy = user.toObject();

    delete userCopy.password;
    delete userCopy.tokens;

    return userCopy;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login user')
    }
    const isMatch = password===user.password;

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = await jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

// userSchema.pre('save', async function (next) {
//     const user = this

//     user.password = await bcrypt.hash(user.password, 8)

//     next()
// })

const User = mongoose.model('User', userSchema);

module.exports = User;
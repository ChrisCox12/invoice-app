import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', userSchema);

export default User;
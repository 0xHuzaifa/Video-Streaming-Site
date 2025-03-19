import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username required"],
        unique: true,
        trim: true,
        lowercase: true,
        min: [3, "minimun 3 characters required"],
        max: [20, "maximum 20 characters are allowed"],
        index: true,
    },

    fullName: {
        type: String,
        required: [true, "fullname required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: [true, "password required"],
        lowercase: true,
        min: [6, "minimun 6 characters required"],
    },

    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dnanaysnp/image/upload/v1742406123/video_streaming/dto2i5xepwzuknt34aqg.jpg"
    },

    coverImage: {
        type: String,
    },

    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },

    refreshToken: {
        type: String,
    }
}, {timestamps: true});


userSchema.pre('save', async function(next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
});

userSchema.method.comparePassword = function (password) {
    return bcrypt.compare( this.passowrd, password);
};

userSchema.method.generateAccessToken = function (id, username, email) {
    const accessToken = jwt.sign(
        {
            id: this._id,
            username: this.username,
            email: this.email
        }, 
        process.env.JWT_ACCESS_TOKEN_SECRETE, 
        {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY}
    );
    return accessToken
};

userSchema.method.generateRefreshToken = function (id) {
    const refreshToken = jwt.sign(
        {
            id: this._id,
        }, 
        process.env.JWT_ACCESS_TOKEN_SECRETE, 
        {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY}
    );
    return refreshToken
};


const User = mongoose.model("User", userSchema);
export default User
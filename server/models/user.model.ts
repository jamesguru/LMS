require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
    name: string;
    email: string;
    password: string,
    avatar: {
        public_id: string,
        url: string
    },
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>,
    SignAccessToken: () => string;
    SignRefreshToken: () => string;

}

const userSchema: Schema<IUser> = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"],

    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value)
            },
            message: "Please enter a valid email"
        },

        unique: true

    },

    password: {
        type: String,

        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    avatar: {

        public_id: String,
        url: String,
    },

    role: {
        type: String,
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    courses: [
        {
            courseId: String,
        }
    ]
}, { timestamps: true })

// Hash password before saving 

userSchema.pre<IUser>('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next()

})

// sign access token
userSchema.methods.SignAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACTIVATION_TOKEN || '6If6k+YIEkQ8#xK9&;2"&h7@o£.Ki,[2^GY*!gHWKYv85.c\#e', {
        expiresIn: "5m"
    })
}
// sign refresh token
userSchema.methods.SignRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || 'CYU$V;0s}Ozv/(j}qhlLG~46.2L"=tOM^O[UNyzyt8#E}3E4£v', {
        expiresIn: "3d"
    })
}

// compare password

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {

    return await bcrypt.compare(enteredPassword, this.password)

}

const userModel: Model<IUser> = mongoose.model("user", userSchema);
export default userModel;



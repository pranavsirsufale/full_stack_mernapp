import mongoose , {Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true
        },
        phone : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        isAdmin : {
            type : Boolean,
            default : false 
        }

    },
    {
        timestamps : true 
    }
)

///? secure the password with the bcrypt 
userSchema.pre("save" , async function(next){
    const user = this;
    if(!user.isModified("password")){
        next()
    }
    try {
        user.password = await bcrypt.hash(this.password,10)
    } catch (error) {
       console.log("something went wrong while hashing passowrd",error);
       next() 
    }
})



//? instance method ( we can create our own method)
userSchema.methods.generateToken =  async function(){
    try {
        return jwt.sign(
            {
                userId : this._id.toString() ,
                username:this.username,
                email : this.email ,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn : '1d'
            }
        )
    } catch (error) {
        console.error(error);
    }
}


//? compare the password
userSchema.methods.checkPassword = async function(passowrd){
    try {
        if(!passowrd) return undefined
        return bcrypt.compare(passowrd, this.password)
    } catch (error) {
        console.log(error)
    }
}


const User = mongoose.model("User" , userSchema)

export { User }

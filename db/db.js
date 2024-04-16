import mongoose from 'mongoose'



const dock = 'mern'

const connectDB =  async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URI}/${dock}`)
        console.log('DATABSE CONNECTED SUCCESSFULLY ::' , res.connection.host);
        return res

    } catch (error) {
        console.log('THE ERROR OCCURED WHILE CONNECTING THE DATABASE :: THE ERRORS ARE :: >>>' , error );
        process.exit(0)
    }
}

export { connectDB }
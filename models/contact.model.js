import { Schema , model } from 'mongoose'

const contactShema = new Schema(
    {
        username : {
            type : String,
            required : true   
        },
        email : {
            type : String,
            required : true   
        },
        message : {
            type : String,
            required : true   
        },
    },
    {
        timestamps : true
    }
)


//* create a model or a collection
const Contact = model("Contact" , contactShema)

export { Contact }
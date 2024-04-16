import mongoose from "mongoose"
import { User } from "../models/user.model.js"
import { Contact } from "../models/contact.model.js"



//*------------------------------------------------------
//* gettheuser Logic
//*------------------------------------------------------

const getTheUser = async (req,res) => {
    try {
        const id = req.params.id
        
        const user = await User.findById(id,{password:0})

        return res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}


//*------------------------------------------------------
//* getAllUsers Logic
//*------------------------------------------------------

const getAllUsers = async (req,res) => {
    try {
        const user = req.user
        if(!user) res.status(400).json({message : 'Unauthorized access ❌☠'})
        const isAdmin = user.isAdmin
        if(!isAdmin) return res.status(400).json({ message : 'Access only for Admin'})

        let users = await User.find({},{password : 0}).limit(10)

        if(!users || users.length === 0) return res.status(404).json({message : "user not found"})

        res.status(200).json( users )

    } catch (error) {
        next(error)
    }
}



//*------------------------------------------------------
//* getAllContacts Logic 
//*------------------------------------------------------
const getAllContacts = async (req,res) => {
    try {
        const user = req.user
        if(!user) res.status(400).json({message : 'Unauthorized access ❌☠'})
        const isAdmin = user.isAdmin
        if(!isAdmin) return res.status(400).json({ message : 'Access only for Admin'})

        let contacts = await Contact.find()
        if(!contacts) res.status(404).json({message : "No contact found"})

        res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
}




//*------------------------------------------------------
//* Delte User  Logic 
//*------------------------------------------------------

const delteUser = async (req,res) => {
    try {
        const reqUserId = req.userId
        const userId = req.params.id
        
        if( reqUserId == userId ){
            return res.status(400).json({message : 'You cannot delete yourself'})
        }
        
        
        
        
        if(!userId) return res.status(404).json({message: 'Invalid UserId'})
        
        const deletedUser = await User.findByIdAndDelete(userId).select({password:0})
        if(!delteUser) return res.status(400).json({message:'something went wrong while deleting user from database'})
        return res.status(200).json(deletedUser)
    
} catch (error) {
    next(error)
}
}


//*------------------------------------------------------
//* delete contact Logic 
//*------------------------------------------------------
const deleteContact = async (req,res) => {
    try {
        const id = req.params.id
        if(!id) return res.status(400).json({message : 'Invalid User Id'})
        const deletedContact = await Contact.findByIdAndDelete(id)

        if(!deletedContact) return res.status(400).json({message : 'Something went wrong while deleting contact'})
        return res.status(200).json(deletedContact)
    } catch (error) {
        next(error)
    }
}



//*------------------------------------------------------
//* update User  Logic 
//*------------------------------------------------------

const updateUser = async (req,res) => {
    const id = req.params.id
    const { username , email , phone } = req.body;
    console.log(phone , email, username);

    console.log(id);
    console.log(username);
    const updataedData = await User.findByIdAndUpdate(
        id,
        {
            $set : {username : username , email : email , phone :phone }
        },
        {
            new : true
        }
    ).select({password:0})


    return res.status(200).json(updataedData)






    // const updatedDate = User.findByIdAndUpdate(id,{username,email,phone},{new:true})
}





export { getAllUsers , deleteContact , getAllContacts ,delteUser , getTheUser , updateUser }
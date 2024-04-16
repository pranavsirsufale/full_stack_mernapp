import { Contact } from '../models/contact.model.js'


const contactForm = async (req,res,next) => {
    try {
        const response = req.body;
        const contact = await Contact.create(response)
        return res.status(200).json({message : "message sent successfully" , contact})
    } catch (error) {
        return res.status(500).json({message : "Message not delieverd"})
    }

}


export { contactForm }
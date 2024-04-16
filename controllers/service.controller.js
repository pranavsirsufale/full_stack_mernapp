import { Service } from '../models/service.model.js'
const services = async(req,res) => {
    try {
        const response = await Service.find();
        if(!response) res.status(404).json({msg:'no service found'})
        return res.status(200).json({response})
    } catch (error) {
        console.log('ERROR FROM SERVICE CON:: ',error);
    }
}




export { services }
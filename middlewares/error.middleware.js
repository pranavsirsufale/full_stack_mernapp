const errorMiddleware = (error,req,res,next) => {
    const status = error.staus || 500 ;
    const message = error.message || "BACEND ERROR";
    const extraDetails = error.extraDetails || "Error from backend"


    return res.status(status).json({message , extraDetails})

}

export { errorMiddleware }
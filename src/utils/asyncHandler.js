const asycHandler=(requestHandler)=>{
    (res,req,next)=>{
        Promise.resolve(requestHandler(res,req,next)).catch((err)=> next(err))
    }
    
}



export {asycHandler};

// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try {
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }
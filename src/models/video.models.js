import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videoFile:{
        type:String,  //cloudinary url
        required:true,
    },
    thumbnail:{
        type:String,  //cloudinary url
        required:true,
    },
    tittle:{
        type:String,  //cloudinary url
        required:true,
    },
    description:{
        type:String,  
        required:true,
    },
    duration:{      
        type:Number,     //cloudinary url  
        required:true,
    },
    views:{      
        type:Number,     //cloudinary url  
        default:0,
    },
    isPublised:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
        
    }

},{timestamps:true})



export const Video=mongoose.model("Video",videoSchema)
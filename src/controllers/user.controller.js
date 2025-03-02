import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exist: username and email
    // check for images, cheack for avatar
    // upload them in cloudinary
    // create user object- create entry in db
    //remove password and token from respones
    // check for user creation
    // return response


   const {fullName,email,userName,password} = req.body

    if ([fullName,email,userName,password].some((field)=>field?.trim()==="")) {
        throw new ApiError(400, "All fields are compulsory")
    }
       const existedUser= User.findOne({
            $or:[{ userName },{ email }]
        })

        if (existedUser) {
            throw new ApiError(409,"User with email and username already exist")
        }
        const avatarLocalPath=req.files?.avatar[0].path;
        const coverImageLocalPath= req.files?.coverImage[0].path

        if (!avatarLocalPath) {
            throw new ApiError(400,"Avatar file is required")
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath) 
        if (!avatar) {
            throw new ApiError(400,"Avatar file is required")
        }
       const user = await User.create({
            avatar:avatar.url,
            fullName,
            coverImage:coverImage?.url || "",
            email,
            password,
            userName:userName.tolowerCase()
 
        })

       const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
       )
       if (!createdUser) {
        throw new ApiError (500,"Something went worng while registring the user")
       }
       return res.status(201).json(
        new ApiResponse(200,"User registered sucessfully")
       )
});



export {registerUser}
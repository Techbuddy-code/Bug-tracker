import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = new mongoose.Schema(
    {
        name : {
            type:String,
            required:[true,"Name is required"],
            trim:true,
        },
       email : {
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true,

    },

    password:{
        type:String,
        required:[true,"password is required"],
        minlength:6
    },
},
{
    timestamps:true,
}

);

//hashpassword before saving 

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }



const salt = await bcrypt.genSalt(10);

this.password = await
bcrypt.hash(this.password,salt);
next();
});


//compare password during login

userSchema.methods.matchPassword =
async function (enteredPassword) {
    return await
    bcrypt.compare(enteredPassword,this.password);
    
};


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
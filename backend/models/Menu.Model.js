import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    price:{
        type:Number,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    category:{
        type:String
    },

    available:{
        type:Boolean,
        default:true
    }

},
{timestamps:true}
);

export default mongoose.model("Menu",MenuSchema);
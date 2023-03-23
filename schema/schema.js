
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DataSchema = new Schema({

	
	name: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		default: true
	},
	email:{
        type:String,
        default:true
    },
    hobbies:{
        type:String,
        default:true
    }

	


});

const Data = mongoose.model("Data", DataSchema);

export default Data;
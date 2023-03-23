import Data from "../schema/schema.js";


export const getData=async(req,res)=>{
// console.log("inside getdata");
    // console.log(req.params);
    // const data = await Data.find({ _id: req.params.id });
    const data=await Data.findById(req.params.id);

	res.json(data)
}

export const getDatas=async(req,res)=>{
    const datas=await Data.find();

    res.json(datas);
}

export const addData=async(req,res)=>{
        // console.log("req.body",req.body);
    const response=req.body;
    // const data=req.body.datas;
    const data=new Data({
        name:response.name,
        phone:response.phone,
        email:response.email,
        hobbies:response.hobbies
    })
    await data.save();
    res.json(data);
}

export const updateData=async(req,res)=>{
    console.log("inside update data");

    const data=await Data.findById(req.params.id);

    console.log(req.body);
    const response=req.body;
    // let data = request.body;
    console.log(req.params.id);
    const updatedData = new Data(data);
    console.log("updated data",updatedData)
    try{
        const data = await Data.findByIdAndUpdate(req.params.id, response,{returnDocument: 'after'});
        console.log("data of updateone",data);
        data.save();
        res.json(data);
        // res.json(data);
    }catch{(error)=>console.log(error)}
    
    // data.save();
    
}

export const deleteData=async(req,res)=>{
    const result = await Data.findByIdAndDelete(req.params.id);

	res.json({result});
}



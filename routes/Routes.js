import express from "express";
import {getData,getDatas,addData,updateData,deleteData} from "../controller/controller.js";
import  sendEmail  from "../controller/sendemail.js";
const router=express();

router.get("/datas",getDatas);
router.get("/data/:id",getData);
router.post("/data/new",addData);
router.post("/sendemail",sendEmail);
router.put("/data/update/:id",updateData);
router.delete("/data/delete/:id",deleteData);

export default router;
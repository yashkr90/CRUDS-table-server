import Data from "../schema/schema.js";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

const sendEmail = async (req, res) => {

    console.log(req.body);
    const receiveremail=req.body.mail;
    const ids=req.body.rowSelectionModel;
    console.log("ids are",ids);
    console.log(receiveremail);
    // const followedIDs = await ids.map(id => ObjectId(id));
    // console.log("followed ids",followedIDs);
    const records =  await Data.find({ '_id': { $in: ids } });
    // console.log(records);
    // const[{_id,...details}]=records;
    const details=await records.map((item)=>{
      return {name:item.name,phone:item.phone,email:item.email,hobbies:item.hobbies}
    })
    console.log("details",details);
    // const(_id)
    // records.map((obj)=>{

    // })
  let config = {
    service: "gmail",
    auth: {
      user: process.env.FROMEMAIL,
      pass: process.env.PASS,
    },
  };
  let transporter = nodemailer.createTransport(config);

  var mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "Yash",
      link: "https://mailgen.js/",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });
  let response = {
    body: {
      name: "Your mail",
      intro: "Selected datas",
      table: {
        data: details,
      },

      outro: "Thanks",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.FROMEMAIL,
    to: receiveremail,
    subject: "selected canditates",
    html: mail,
  };

  transporter.sendMail(message).then(() => {
    return res
      
      .json({
        msg: "You should receive an email",
      })
      
  });

  console.log("sendeamil");
};

export default sendEmail;

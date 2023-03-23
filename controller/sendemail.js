import Data from "../schema/schema.js";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

const sendEmail = async (req, res) => {

    const ids=req.body;
    console.log("ids are",ids);
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
      user: process.env.EMAIL,
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
    from: process.env.MAIL,
    to: process.env.TOMAIL,
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

import nodemailer from "nodemailer"

const sendEmail = async(to,subject,text)=>{
       try {
        const transporter =nodemailer.createTransport({
             service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
        })
        const mailOption = {
        from : process.env.EMAIL_USER,
        to,
        subject,
        text
    }
         await transporter.sendMail(mailOption)
       } catch (error) {
        console.log("sending email error",error); 
       }
}
export default sendEmail
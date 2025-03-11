const mailer = require('nodemailer');

//function
const sendingMail = async(to,subject,text)=>{

    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"petcircle00@gmail.com",
            pass:"lsqs fsue bakl vhwu"
        }
    });

    const mailOptions = {
        from:"petcircle00@gmail.com",
        to:to,
        subject:subject,
        html:"<div>"+text+"</div>"
    }

    const mailresponse =await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports={sendingMail}



   
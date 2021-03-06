const Invite = require("../models/invite");
const nodemailer = require("nodemailer");
const User = require("../models/user");

exports.createInvitation = async(req, res) => {
    try{
        const { email, role } = req.body;
        if(!email || !role){
            return res.status(400).json({
                success: false,
                error: "All Fields are required."
            });
        }
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                success: false,
                error: "User with this mail Id Already have an account."
            });
        }
        
        const invite = await Invite.create(req.body);
        const { SENDER_EMAIL, SENDER_EMAIL_PASSWORD } = process.env;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: SENDER_EMAIL,
                pass: SENDER_EMAIL_PASSWORD,
            },
            from: {
                name: "Hari Karthyk",
                address: "hari.jsmith494@gmail.com"
            }
        });
        const subject = "Login Invitation for HKs new Web App";
        const PRE_URL = process.env.PRE_URL;
        const url = `${PRE_URL}${invite._id}`
        const html = `
            <a href=${url}>Click here to Join the link</a>
        `
        const mailOptions = {
            from: {
                name: "Hari Karthyk",
                address: "hari.jsmith494@gmail.com"
            },
            to: req.body.email,
            subject: subject,
            html: html,
        };
        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            success: true
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error?.message || error
        });
    }
}
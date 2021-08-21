const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const app = express();

app.use(express.static('public'))
app.use(express.json());



app.get('/contact-me', (req, res) => {
    res.sendFile(__dirname +'/public/contactform.html')
    //res.render('contactme')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/index.html')
    //res.render('contactme')
})

app.post('/contact-me', (req, res) => {
    console.log('sending mail......')
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.name,
        to: process.env.EMAIL2,
        subject: `Message from ${req.body.email}:   ${req.body.subject}`,
        text: req.body.message
    }


    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(error)
            res.send('error')
        }else{
            console.log('Email sent: ' + info.response)
            res.send('success')
        }
    })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

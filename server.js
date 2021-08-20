const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const PORT = process.env.port || 5000;

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
            user: 'testing39526@gmail.com',
            pass: 'test39526@'
        }
    })

    const mailOptions = {
        from: req.body.name,
        to: 'dylan4luv@gmail.com',
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

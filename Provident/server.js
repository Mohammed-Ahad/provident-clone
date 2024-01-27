const express = require('express')
const app = express()
const port = 3000

const path = require('path')
const public = path.join(__dirname, 'public')

let nodemailer = require('nodemailer');

app.use(express.json())

app.use('/', express.static(public))
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/home', (req, res) => {
    return res.sendFile(path.join(public, 'index.html'))
})


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'inayathmohammed48@gmail.com',
        pass: 'skvfqrppjheawgaj'
    }
});

app.post('/sendMail', (req, res) => {
    const {name, phone, email } = req.body

    let text = ` 
        Name : ${name} 
        Phone : ${phone} 
        email : ${email}
    `
    let mailOptions = {
        from: 'inayathmohammed48@gmail.com',
        to: 'inayathmohammed48@gmail.com',
        subject: 'Providant',
        text: text
    };

    try {
        transporter.sendMail(mailOptions, function (error, info) {
            console.log(info.response)
            if (error) {
                return res.send('Try again!')
            }
            else{
                console.log('mail sent!')
            }
        });

    } catch (error) {
        console.log(error)
    }
    return res.send('Thanks for reaching out!')
})



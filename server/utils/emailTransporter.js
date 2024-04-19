import nodemailer from 'nodemailer'
export const sendMail = async(email,subject,text)=> {
    try {
        const transporter = nodemailer.createTransport({
            port: 587,
            service: "gmail",
            auth: {
                user: "soufianehmamou92@gmail.com",
                pass: "hmzivlerbulgzsyu"
            },
            secure: false,
            host: "smtp.gmail.com"
        })
        const htmlTemplate = `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    text-align: center;
                }
                .container {
                    
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    width: 500px;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                    padding: 0.75rem 1.25rem;
                    background: white;
                }
                h2 {
                    color: black;
                    margin: 0.5rem 0;
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                .ptag {
                    line-height: 1.7;
                    font-size: 18px;
                    font-weight: 500;
                    color: gray;
                }
                .sub-ptag {
                    line-height: 1.7;
                    font-size: 14px;
                    font-weight: 500;
                    color: #c0c0c0;
                }
                a {
                    display: inline-block;
                  
                   
                    color: #fff;
                    text-decoration: none;
                    margin-top: 12px;
                    font-weight: 700;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://img.freepik.com/free-vector/computer-with-mail-element-icon-cartoon-vector-isolated-laptop-with-envelope-letter-graphic-object-new-chat-message-desktop-device-monitor-digital-notification-alert-inbox-website_107791-23561.jpg?w=740&t=1713369506" alt="email" style="object-fit: cover; width: 250px;" />
                <h2>Verify your Email address</h2>
               
                    <p class="ptag">You've entered <span>${email} </span> as the email address for your account.</p>
                    <p class="sub-ptag">Please verify this email address by clicking the button below.</p>
                
                <a href="${text}" target="_blank" >Verify your email</a>
            </div>
        </body>
        </html>
    `;
        await transporter.sendMail({
             from: "soufianehmamou92@gmail.com",
             to: email,
             subject: subject,
             text: text,
             html: htmlTemplate,
        })
        console.log('email was sent successfuly')
    } catch (error) {
         console.log(error, "failed to send email")
         
    }
   
}
export const sendEmailForResetPassword = async(email,subject,text)=> {
    try {
        // transporter 
        // mailOptions
        // sendmail
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: "soufianehmamou92@gmail.com",
                pass: "hmzivlerbulgzsyu",  
            }
        })
        
        const htmlTemplate = `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    text-align: center;
                }
                .container {
                    
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    width: 500px;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                    padding: 0.75rem 1.25rem;
                    background: white;
                }
                h2 {
                    color: black;
                    margin: 0.5rem 0;
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                .ptag {
                    line-height: 1.7;
                    font-size: 18px;
                    font-weight: 500;
                    color: gray;
                }
                .sub-ptag {
                    line-height: 1.7;
                    font-size: 14px;
                    font-weight: 500;
                    color: #c0c0c0;
                }
                a {
                    display: inline-block;
                    padding: 10px 20px;
                    color: #000!important;
                    text-decoration: none;
                    margin-top: 12px;
                    font-weight: 700;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7876.jpg?t=st=1713373505~exp=1713377105~hmac=23a84cb687d2b469c12c0ade55d50bd284a96af2f93b54d0598bbc067bcf9192&w=740" alt="email" style="object-fit: cover; width: 250px;" />
                <h2>Reset your account password</h2>
               
                    <p class="ptag">You've requested a request to reset your password for your appGram account.</p>
                    <p class="sub-ptag">Please to reset your password click on the button below.</p>
                
                <a href="${text}" target="_blank" >Reset your password</a>
            </div>
        </body>
        </html>
    `;
    
        await transporter.sendMail({
           from: "soufianehmamou92@gmail.com",
           to:email,
           subject: subject,
           text: text,
           html: htmlTemplate
        })
        console.log('email  was sent successfuly')
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
}
export const sendEmailForResetSeccuss = async(email,subject,text)=> {
    try {
        // transporter 
        // mailOptions
        // sendmail
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: "soufianehmamou92@gmail.com",
                pass: "hmzivlerbulgzsyu",  
            }
        })
        
        const htmlTemplate = `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    text-align: center;
                }
                .container {
                    
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    width: 500px;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                    padding: 0.75rem 1.25rem;
                    background: white;
                }
                h2 {
                    color: black;
                    margin: 0.5rem 0;
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                .ptag {
                    line-height: 1.7;
                    font-size: 18px;
                    font-weight: 500;
                    color: gray;
                }
                .sub-ptag {
                    line-height: 1.7;
                    font-size: 14px;
                    font-weight: 500;
                    color: #c0c0c0;
                }
                a {
                    display: inline-block;
                    padding: 10px 20px;
                    color: #000!important;
                    text-decoration: none;
                    margin-top: 12px;
                    font-weight: 700;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://media.istockphoto.com/id/1199025903/vector/congratulations-greeting-card-vector-lettering.jpg?s=612x612&w=0&k=20&c=JBjYOnkRerY0uxBrYAtKccIk6tdiBCuzwClegCucpmw=" alt="email" style="object-fit: cover; width: 250px;" />
                <h2>congratulations</h2>
               
                 
                 
            </div>
        </body>
        </html>
    `;
    
        await transporter.sendMail({
           from: "soufianehmamou92@gmail.com",
           to:email,
           subject: subject,
           text: text,
           html: htmlTemplate
        })
        console.log('email  was sent successfuly')
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
}
// // https://media.istockphoto.com/id/1199025903/vector/congratulations-greeting-card-vector-lettering.jpg?s=612x612&w=0&k=20&c=JBjYOnkRerY0uxBrYAtKccIk6tdiBCuzwClegCucpmw=
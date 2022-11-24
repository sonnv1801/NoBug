const nodemailer = require("nodemailer");

exports.sendConfirmationEmail = function ({ toUser }, id) {
  const sendEmail = async (req, res) => {
    var transporter = nodemailer.createTransport({
      // config mail server
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    var mainOptions = {
      // thiết lập đối tượng, nội dung gửi mail
      from: process.env.GOOGLE_USER,
      to: toUser.email,
      subject: "Authenticate Email",
      text: "You recieved message from " + toUser.email,
      html: `
      <h3>Hello ${toUser.username}</h3>
      <p>You recieved message from ${process.env.GOOGLE_USER} with: </p>
      <p>Username: ${toUser.username}</p>
      <p>Email: ${toUser.email}</p>
      <p>To activate your account please follow this link: <a target="_" href="http://localhost:3000/api/auth/active-account?id=${id}">Active your account</a></p>
      <p>Thank you!</p>
  `,
    };
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
      }
    });
  };
  sendEmail();
};

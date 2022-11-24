const nodemailer = require("nodemailer");

exports.sendResetPasswordEmail = function ({ myUser }, id) {
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
      to: myUser.email,
      subject: "Reset password",
      text: "You recieved message from " + myUser.email,
      html: `
      <p>You recieved message from ${process.env.GOOGLE_USER} with: </p>
      <p>Email: ${myUser.email}</p>
      <p>To reset your password please follow this link: <a target="_" href="http://localhost:3000/api/auth/reset-password?id=${id}">Reset your password</a></p>
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

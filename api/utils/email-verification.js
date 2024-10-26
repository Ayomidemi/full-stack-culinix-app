const { createMailTransporter } = require("./mail-transporter");

const sendVerificationMail = (user) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: `"Culin6" <${process.env.EMAIL}>`,
    to: user.email,
    subject: "Verify your email",
    html: `
      <h1> One more step! </h1>

      <img src="https://asset.cloudinary.com/dr8cc4tbe/4d79736e65a24b122581720dc1518d76" alt="Recipe Image" style="width: 100%; height: auto;">

      <p>Hi <b> ${user.name}, </b></p>
      <p>Thank you for signing up on Culin6.</p>
      <p>Please click on the link below to verify your email address:</p>
      <a href="${process.env.BASE_URL}?emailToken=${user.emailToken}">Verify Email</a>
      <p>Thank you!</p>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendVerificationMail };

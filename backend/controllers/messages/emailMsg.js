const EmailMsg = require("../../models/Messaging/EmailMessaging");
const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const Filter = require("bad-words");

const sendEmailMsg = expressAsyncHandler(async (req, res) => {
  const { to, subject, message } = req.body;

  const emailMessage = subject + " " + message;
  const filter = new Filter();
  const isProfane = filter.isProfane(emailMessage);
  if (isProfane) throw new Error("Email failed for using profane language");

  try {
    // build up message
    const msg = {
      to,
      subject,
      text: message,
      from: "clindell.tassin@selu.edu",
    };
    // send message
    await sgMail.send(msg);
    // save into database
    await EmailMsg.create({
      sentBy: req?.user?._id,
      from: req?.user?.email,
      to,
      message,
      subject,
    });
    res.json("Mail Sent");
  } catch (error) {
    res.json(error);
  }
});

module.exports = { sendEmailMsg };

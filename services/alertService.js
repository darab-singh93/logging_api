const nodemailer = require('nodemailer');
const axios = require('axios');
const { text } = require('express');

const EMAIL_ALERT_LEVELS = ['error', 'fatal'];
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Setup Nodemailer transport
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey', // literally the word "apikey"
    pass: process.env.ALERT_EMAIL_PASSWORD
  }
});

const sendEmailAlert = async (log) => {
  if (!EMAIL_ALERT_LEVELS.includes(log.level)) return;

  const mailOptions = {
    from: `"Logging Tool" <${process.env.ALERT_EMAIL}>`,
    to: process.env.ALERT_RECEIVER,
    subject: `🚨 [${log.level.toUpperCase()}] Alert from Logging Tool`,
    text: `Message: ${log.message}\n\nMeta: ${JSON.stringify(log.meta, null, 2)}\n\nTimestamp: ${log.timestamp} \n\n This is an automated alert from your Logging Tool system.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Email alert sent!');
  } catch (error) {
    console.error('Failed to send email alert:', error.message);
  }
};

const sendSlackAlert = async (log) => {
  if (!EMAIL_ALERT_LEVELS.includes(log.level) || !SLACK_WEBHOOK_URL) return;

  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: `🚨 *${log.level.toUpperCase()}* log from *${log.source}*\n> ${log.message}`,
    });
    console.log('📨 Slack alert sent!');
  } catch (error) {
    console.error('Failed to send Slack alert:', error.message);
  }
};

module.exports = {
  sendEmailAlert,
  sendSlackAlert,
};

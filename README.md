# 🪵 Logging API - Node.js Based Centralized Log Collector

A lightweight, secure, and extensible logging API system built using **Node.js**, designed to collect logs from client applications (like Flutter, Web, Mobile, Backend), send alerts to **email** and **Slack**, and store logs in **MongoDB**. Optionally extensible for monitoring via **Grafana** and **Loki**.

---

## 🚀 Features

- 📥 Receive logs via REST API
- ✅ Input validation and sanitization
- 🔒 Rate limiting and API key protection
- 🧼 Prevents XSS attacks and unwanted data
- 📧 Sends alerts on `error` or `fatal` logs via **Gmail**
- 💬 Sends alerts to **Slack** channel
- 🛡️ Security via `helmet`, `xss-clean`, and `rate-limiter`
---

## 🛠 Technologies Used
 - Node.js
 - Express.js
 - MongoDB (Mongoose)
 - Nodemailer
 - Slack Webhook


## 📄 License
MIT © Darab Singh

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const reportRoute = require("./routes/Report");
const viewReportsRoute = require("./routes/viewReports");
const usersCountRoute = require("./routes/userCount");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const deleteAccountRoute = require("./routes/deleteAccount");
const sendOtpRoute = require("./routes/api/send-otp");
const verifyOtpRoute = require("./routes/api/verify-otp");
const adminReportsRoutes = require("./routes/adminReports");
const threatFeedRoute = require("./routes/ThreatFeed");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "front-end")));

app.use("/api", reportRoute);
app.use("/api", viewReportsRoute);
app.use("/api", usersCountRoute);
app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", deleteAccountRoute);
app.use("/api", sendOtpRoute);
app.use("/api", verifyOtpRoute);
app.use("/api", adminReportsRoutes);
app.use("/api/threatFeed", threatFeedRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front-end", "index.html"));
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log("MongoDB connection error:", err.message));
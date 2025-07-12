const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt");

const userModel = require('./models/user'); 
const candidateModel = require('./models/candidatemodel');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");


app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
      role: "admin" // ✅ Force admin role
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password is incorrect" });

    res.json("success");
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err.message });
  }
});

app.post("/admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password is incorrect" });

    // 👇 REMOVE this check if you want everyone to be admin
    // if (user.role !== "admin") return res.status(403).json({ message: "Not an admin account" });

    // ✅ Bypass admin check: everyone can login
    res.json("success");

  } catch (err) {
    res.status(500).json({ message: "Server error", details: err.message });
  }
});




app.post("/candidate", (req, res) => {
    candidateModel.create(req.body)
        .then(candidate => res.json(candidate))
        .catch(err => res.status(500).json(err));
});


app.get("/candidate", (req, res) => {
    candidateModel.find()
        .then(candidates => res.json(candidates))
        .catch(err => res.status(500).json({ error: err.message }));
});



app.delete("/candidates/:id", (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    candidateModel.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json({ message: "Candidate deleted successfully" });
            } else {
                res.status(404).json({ error: "Candidate not found" });
            }
        })
        .catch(err => res.status(500).json({ error: "Failed to delete candidate", details: err.message }));
});



app.put("/candidate/vote/:id", (req, res) => {
    const { id } = req.params;

  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid candidate ID" });
    }

    
    candidateModel.findByIdAndUpdate(id, { $inc: { vote: 1 } }, { new: true })
        .then(candidate => {
            if (candidate) {
                res.json({ message: "Vote recorded successfully", candidate });
            } else {
                res.status(404).json({ error: "Candidate not found" });
            }
        })
        .catch(err => res.status(500).json({ error: "Failed to update vote count", details: err.message }));
});


async function createAdmin() {
  const existing = await userModel.findOne({ email: "admin@example.com" });
  if (existing) return console.log("Admin already exists");

  const hashedPassword = await bcrypt.hash("admin123", 10);
  await userModel.create({
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin"
  });
  console.log("✅ Admin created with email: admin@example.com");
}

createAdmin();


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

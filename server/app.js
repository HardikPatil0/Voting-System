const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const userModel = require('./models/user'); 
const candidateModel = require('./models/candidatemodel');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");


app.post("/register", (req, res) => {
    userModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});


app.post("/", (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("password is incorrect");
                }
            } else {
                res.json("no data found");
            }
        })
        .catch(err => res.status(500).json(err));
});
app.post("/admin", (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("password is incorrect");
                }
            } else {
                res.json("no data found");
            }
        })
        .catch(err => res.status(500).json(err));
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



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

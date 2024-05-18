// const express = require("express");
// const path = require("path");
// // Assuming './config' contains your MongoDB connection
// const collection = require("./config");
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));

// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//     res.render("login");
// });

// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

// app.post("/signup", async (req, res) => {
//     try {
//         const data = {
//             name: req.body.username,
//             password: req.body.password
//         }

//         const existingUser = await collection.findOne({ name: data.name });
//         if (existingUser) {
//             return res.send('User already exists. Please choose a different username.');
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(data.password, saltRounds);

//         data.password = hashedPassword;

//         await collection.insertOne(data); // Use insertOne for single document insertion

//         console.log("User registered successfully");
//         res.redirect("/"); // Redirect to login page after successful registration
//     } catch (error) {
//         console.error("Error during registration:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.post("/login", async (req, res) => {
//     try {
//         const check = await collection.findOne({ name: req.body.username });
//         if (!check) {
//             return res.send("User name cannot found");
//         }

//         const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
//         if (!isPasswordMatch) {
//             return res.send("Wrong password");
//         }
        
//         res.render("home");
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Route for location.html
app.get("/location", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "location.html"));
});

// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    try {
        // Check if the username already exists in the database
        const existingUser = await collection.findOne({ name: data.name });

        if (existingUser) {
            res.send('User already exists. Please choose a different username.');
        } else {
            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword;

            const userdata = await collection.insertMany(data);
            console.log(userdata);

            res.send('User registered successfully.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot be found");
        } else {
            // Compare the hashed password from the database with the plaintext password
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (!isPasswordMatch) {
                res.send("Wrong password");
            } else {
                // Redirect to the home HTML file upon successful login
                res.redirect("location.html");
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Define Port for Application
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// const express = require('express');
// const path = require("path");
// const bcrypt = require("bcrypt");
// const collection = require("./config");
// // const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// app.set('view engine', 'ejs');
// app.use(express.static("public"));

// app.get( '/' , (req, res) => {
//   res.render("login");
//   });

// app.get( "/signup" , (req,res)=>{
//   res.render("signup");
// });

// app.post("/signup", )

// const PORT = process.env.PORT || 3000;




// mongoose.connect('mongodb://localhost:27017/registrationapp')
//   .then(() => {
//     console.log('Connected to MongoDB database');
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//   });


// const registrationSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   enrollmentNumber: String,
//   dob: Date
// });

// const Registration = mongoose.model('Registration', registrationSchema); // Changed from 'collection' to 'Registration'

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/r.html'); // Change the path to your HTML file
// });

// app.post('/submit_registration', async (req, res) => {
//   console.log('Received form data:', req.body); // Logging the received form data

//   try {
//     // Extract registration data from request body
//     const registrationsData = req.body.registrations;

//     // Insert the registrations data into the database
//     const result = await Registration.insertMany(registrationsData); // Changed from 'Registration' to 'collection'

//     res.status(200).json({ message: 'Registrations saved successfully', result });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



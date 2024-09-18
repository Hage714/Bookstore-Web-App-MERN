const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); 
const bodyParser = require('body-parser');  
const path = require('path');

const PORT = process.env.PORT || 6000;
const app = express();   //initialise express variable

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'public')));

// Database Configuration
const { connect_database } = require("./db/connect");
connect_database();

// Authenticate Middleware
const { verifyToken } = require("./middleware/authenticate");

// Routes
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const customerRoutes = require("./routes/customers");
const saleRoutes = require("./routes/sales");
const borrowBookRoutes = require("./routes/borrowbooks");
const purchaseBookRoutes = require("./routes/purchasedbooks");
const userRoutes = require('./routes/users');
const requestBookRoutes = require("./routes/requestedbooks");
const orderRoutes = require("./routes/orders");
const contactRoutes = require("./routes/contact");

// base route
app.get("/", (req, res) => {
    res.send({ "message": "Server is running" }).status(200);
});

app.use("/auth", authRoutes);
app.use("/books", verifyToken, bookRoutes);
app.use("/customers", verifyToken, customerRoutes);
app.use("/sales", verifyToken, saleRoutes);
app.use("/borrowbooks", verifyToken, borrowBookRoutes);
app.use("/purchasedbooks", verifyToken, purchaseBookRoutes);
app.use("/users", verifyToken, userRoutes);
app.use("/requestedbooks", verifyToken, requestBookRoutes);
app.use("/orders", verifyToken, orderRoutes);
app.use("/contact", verifyToken, contactRoutes); 


// start the server
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})
const mongoose = require("mongoose");
//const connectionString = "mongodb://localhost:27017/bookstoredb";
const newConnectionString = "mongodb+srv://hagewoche99:Hage1234@cluster0.o4jhw.mongodb.net/bookstoreApp?retryWrites=true&w=majority&appName=Cluster0"

const connect_database = async () => {
    await mongoose
        .connect(newConnectionString)
        .then(() => console.log("Database connected successfully"))
        .catch((error) => console.log(error.message))
};

module.exports = {
    connect_database
}
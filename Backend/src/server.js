import { app } from "./app.js"; 
import connectDB from "./config/db.config.js"; 

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Once the DB connection is successful, start the server
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log("DB connection error: ", error);
  });

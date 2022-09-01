const mongoose = require("mongoose");
const app = require("./app");

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connect successfull");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

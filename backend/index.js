const connectToMongoose = require('./db')
const express = require("express");
const cors = require("cors");
connectToMongoose();

const app = express();
const port = 5000;



app.use(cors());
app.use(express.json())
//available routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
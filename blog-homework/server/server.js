const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());


const db = require('./models')

// routers 
const userRouter = require("./routes/user-routes");
app.use('/users', userRouter);



db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("server running on port 8080");
    })
})



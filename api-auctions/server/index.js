const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const db = require("./models");

// routers 
const auctionRouter = require("./routes/auction-items");
app.use('/items', auctionRouter);



db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("server is running on port 8080.")
    });
});

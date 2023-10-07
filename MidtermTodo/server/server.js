const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "userId",
    secret: "sessionSecret",
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        expires: 60 * 60 * 24
    }
}))

const db = require('./models')

const todoRouter = require("./routes/todo-routes");
app.use('/api/todos', todoRouter);

const userRouter = require("./routes/user-routes");
app.use('/api/users', userRouter);


db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("server running on port 8080");
    })
})
/******** CONFIGURING ENVIRONMENT   ***********/
const dotenv=require("dotenv")
dotenv.config()


/******** CONFIGURING SERVER PORTS  ***********/
const primaryPort=process.env.primaryPort
const secondaryPort=process.env.secondaryPort
const tertiaryPort=process.env.tertiaryPort


/******** CREATING THE SERVER   ***********/

const express=require("express")
const server =express()

/******** USING CORS TO ALLOW REQUESTS  ***********/
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000', // specify your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
    credentials: true, // if you need to send cookies
    optionsSuccessStatus: 200 // some legacy browsers choke on 204
};
server.use(cors(corsOptions));
server.use(express.json());
/********** USING COOKIES PARSER  *******************/
const cookieParser = require('cookie-parser');

server.use(cookieParser());


/******** IMPORTING AND USING ROUTES  ***********/
// admin Routes
const adminRoutes=require("./routes/adminRoutes")
server.use("/",adminRoutes);
// category Routes
const categoryRoutes=require("./routes/categoryRoutes")
server.use("/",categoryRoutes);
// chapter Routes
const chapterRoutes=require("./routes/chapterRoutes")
server.use("/",chapterRoutes);
// course Routes
const courseRoutes=require("./routes/courseRoutes")
server.use("/",courseRoutes);
// exercice Routes
const exerciceRoutes=require("./routes/exerciseRoutes")
server.use("/",exerciceRoutes);
// lesson Routes
const lessonRoutes=require("./routes/lessonRoutes")
server.use("/",lessonRoutes);
// login Routes
const loginRoutes=require("./routes/loginRoutes")
server.use("/",loginRoutes);
// question Routes
const questionRoutes=require("./routes/questionRoutes")
server.use("/",questionRoutes);
// quiz Routes
const quizRoutes=require("./routes/quizRoutes")
server.use("/",quizRoutes);
// subscription Routes
const subscriptionRoutes=require("./routes/subscriptionRoutes")
server.use("/",subscriptionRoutes);
// teacher Routes
const teacherRoutes=require("./routes/teacherRoutes")
server.use("/",teacherRoutes);
// student Routes
const studentRoutes=require("./routes/studentRoutes")
server.use("/",studentRoutes);
// user Routes
const userRoutes=require("./routes/userRoutes")
server.use("/",userRoutes);
// chapter Routes
const chapterRouters=require("./routes/chapterRoutes")
server.use("/",chapterRouters);
// assignments Routes
const assignmentRouters=require("./routes/assignmentRoutes")
server.use("/",assignmentRouters);
// quiz responses Routes
const quizResponseRouters=require("./routes/quizResponseRoute")
server.use("/",quizResponseRouters);

/******** STARTING THE CONNECTION WITH THE DATABASE     ***********/
const connectToDatabase=require("./database/connectDatabase")
connectToDatabase()

/******** STARTING THE DEVELOPMENT SERVER   ***********/

const port = primaryPort || secondaryPort || tertiaryPort;

server.listen(port, () => {
    console.log(`Server is actually running on port ${port}`);
});

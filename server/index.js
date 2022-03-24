const express = require("express");
// const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const admin = require("firebase-admin");
const app = express();
const fileUpload = require("express-fileupload");
var cors = require("cors");

app.use(cors());

const productRouter = require("./routes/productRoute");
const contactRouter = require("./routes/contactRoute");
const placesRouter = require("./routes/placesRoute");
const businessRouter = require("./routes/businessRoute");
const categoryRouter = require("./routes/categoryRoute");
const userRouter = require("./routes/userRoute");
const recommendationRouter = require("./routes/recommendationRoute");
const mainCategoryRouter = require("./routes/mainCategoryRoute");
const searchRouter = require('./routes/searchRoute')
const storeRouter = require("./routes/storeRoute");
const productCategoryRouter = require("./routes/productCategoryRoute");
const orderRoute = require("./routes/orderRoute");
const scheduleRouter = require("./routes/scheduleRoute");
const businessHistoryRoter= require("./routes/businessHistoryRoute")
const serviceRouter=require("./routes/serviceRoute")

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/easycart";


/*TODO: protection middleware */
//app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

app.use("/contact", contactRouter);
app.use("/product", productRouter);
app.use("/places", placesRouter);
app.use("/user", userRouter);
app.use("/business", businessRouter);
app.use("/category", categoryRouter);
app.use("/search", searchRouter);
app.use("/mainCategory", mainCategoryRouter);
app.use("/recommendation", recommendationRouter);
app.use("/store", storeRouter);
app.use("/productCategory", productCategoryRouter);
app.use("/order", orderRoute);
app.use((req, res, next) => { next() })
app.use("/schedule", scheduleRouter);
app.use("/businessHistory", businessHistoryRoter)
app.use("/service", serviceRouter)


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// app.post("/upload",async function (req, res) {
//   let f =await req.files.File.mv("./uploads/" + req.headers["name"]);

//   // res.json("WOW!");
//   res.status(200).json({ img: f });

// });
mongoose.connect(
  MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    ConnectFlag = true;
    console.log("Connected to MongoDB");
  }
);

process.on("uncaughtException", function (err) {
  if(err){
  console.error("Caught exception: " + err);
  // throw err;
  }
});

// Bellow MongoDB and Above Listen Sever
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.error("Server is running on port", PORT);
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
const port = process.env.PORT || 4000;
import express from "express"
const app = express();
import bodyParser from "body-parser";
import cors from "cors"
import { connectDB } from "./config/db.js";
import dressRouter from "./routes/DressRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import searchRouter from "./routes/searchRoute.js";
import dotenv from 'dotenv';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';


dotenv.config();




app.use((req, res, next) => {
  const maxHeaderSize = 8192; // Example: Set the max header size in bytes
  const headers = Object.keys(req.headers);
  let totalHeaderSize = 0;

  headers.forEach(header => {
      totalHeaderSize += req.headers[header].length;
  });

  if (totalHeaderSize > maxHeaderSize) {
      return res.status(431).json({ success: false, message: 'Request headers too large' });
  }

  next();


});



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const allowedOrigins = ['https://panachebyfunmi.onrender.com', 'https://admin-l4ne.onrender.com'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json())

// database connection
connectDB();

//api endpoints

app.use("/api/dress",dressRouter)
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/items",searchRouter)


// API creation

app.get("/",(req,res)=>{
    res.send("Express App is running")
})


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update the Excel file
const updateExcelFile = (email) => {
  const filePath = path.join(__dirname, 'subscribers.xlsx');
  let workbook;

  // Check if the Excel file already exists
  if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
  } else {
    workbook = xlsx.utils.book_new();
  }

  let worksheet = workbook.Sheets['Subscribers'];

  // If the worksheet doesn't exist, create one
  if (!worksheet) {
    worksheet = xlsx.utils.aoa_to_sheet([['Email', 'Subscribed On']]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Subscribers');
  }

  // Add new row for the subscriber's email
  const newRow = [email, new Date().toISOString()];
  const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  rows.push(newRow);

  // Write updated data back to the worksheet
  const newWorksheet = xlsx.utils.aoa_to_sheet(rows);
  workbook.Sheets['Subscribers'] = newWorksheet;

  // Save the workbook
  xlsx.writeFile(workbook, filePath);
};


app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
  
    try {
      updateExcelFile(email);
      res.json({ message: 'Subscription successful!' });
    } catch (error) {
      console.error('Error updating Excel file:', error);
      res.status(500).json({ message: 'Failed to subscribe.' });
    }
  });
  
  app.get('/api/download-subscribers', (req, res) => {
    const filePath = path.join(__dirname, 'subscribers.xlsx');
  
    // Check if the Excel file exists
    if (fs.existsSync(filePath)) {
      res.download(filePath, 'subscribers.xlsx', (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Error downloading the file.');
        }
      });
    } else {
      res.status(404).send('No subscriber data found.');
    }
  });


app.listen(port,(error)=>{
    if (!error){
        console.log("Server running on Port "+port)
    }
    else{
        console.log("Error : "+error)
    }
})
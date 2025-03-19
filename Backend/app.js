const dotenv=require('dotenv');
dotenv.config();

const cookiePraser=require('cookie-parser');
const express=require("express");
const cors=require('cors');
const app =express();
const connectToDb=require('./Db/db')
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');

connectToDb();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello there');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports=app;



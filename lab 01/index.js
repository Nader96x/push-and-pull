const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
require('./models/Notification');


const Notification = mongoose.model("Notification");

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://nodejs:GFob73CZAgGizUNy@cluster1.o7wzswg.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))
    



app.get('/notifications', (req, res) => {
    // console.log(req.query);
    lastTime = req.query?.lastTime?.trim() || 0;
    // console.log(lastTime);
    Notification.find({createdAt:{$gt:lastTime}}).then((notifications) => {
        res.json(notifications);
    }).catch(e=>{
        console.log(e);
    })
})

app.post('/notifications', (req, res) => {
    const body = req.body;
    Notification.create(body).then((notification) => {
        res.json(notification);
    })
})
    



const subscribers = {}
app.get('/long/notifications', (req, res) => {
    let id = Math.floor(Math.random()*100000);
    subscribers[id] = res;
    // console.log(Object.keys(subscribers));
})

app.post('/long/notifications', async(req, res) => {
    const body = req.body;
    const notification = await Notification.create(body);
    console.log(Object.keys(subscribers))
    Object.keys(subscribers).forEach((id) => {
        subscribers[id].json(notification);
        delete subscribers[id];
    })
    
    res.json(notification)
    
    
    
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
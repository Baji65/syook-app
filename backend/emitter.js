const express = require('express');
const http = require('http');
const {Server}= require('socket.io');
const crypto = require('crypto');
const data = require('./data.json');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io1 = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  },
});
const cors = require('cors'); 
const { io } = require('socket.io-client');
app.use(cors()); 
const socket = io("http://localhost:4000/");

const model=require('./models/model')

const iv = crypto.randomBytes(16);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(data=>{

  console.log("connected to mongodb")
}).catch(error=>{
  console.log("not connected to mongodb")
})



function generateRandomMessage() {

  const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const originalMessage = {
  
  name: getRandomValue(data.names),
  origin: getRandomValue(data.origins),
  destination: getRandomValue(data.destinations)
};
 
const secretKey = crypto.createHash('sha256').update(JSON.stringify(originalMessage)).digest('hex');
const summessage={
  ...originalMessage,
  secretKey
}

const OriginalMessage=JSON.stringify(summessage)



const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(process.env.passKey),iv);
let encryptedPayload = cipher.update(OriginalMessage, 'utf-8', 'hex');
encryptedPayload += cipher.final('hex');





return  encryptedPayload;

}




io1.on('connection', (socket) => {

  setInterval(() => {
    const numMessages = Math.floor(Math.random() * (499 - 49 + 1)) + 49;

    
    for (let i = 0; i < numMessages; i++) {
   const message = generateRandomMessage();
   socket.emit('messageStream', message);
   }



}, 10000); 

  });

  let totalReceived = 0; 
let successfulCount = 0;

 //Listener
 
  socket.on('messageStream', encryptedStrings => {
   
    totalReceived++; 
   

    const decipher = crypto.createDecipheriv('aes-256-ctr',  Buffer.from(process.env.passKey), iv);
 
  let decryptedMessage = decipher.update(encryptedStrings, 'hex', 'utf-8');
  decryptedMessage += decipher.final('utf-8');
  
   const decryptedData = JSON.parse(decryptedMessage);

 
const originalMessage1 = {
    name: decryptedData.name,
    origin: decryptedData.origin,
    destination: decryptedData.destination
  };


  
const calculatesecretKey = crypto.createHash('sha256').update(JSON.stringify(originalMessage1)).digest('hex');

  if (calculatesecretKey === decryptedData.secretKey) {
   
    const now = new Date();
    const datadecrypt= {
   
      now,
      data: originalMessage1
    }
  
  
model.create(datadecrypt)

.then(savedData => {
  console.log('Data saved:');
  
  io1.emit('decryptedDataToFrontend', savedData.data);
})
.catch(error => {
  console.log('Error saving data:', error);
});
successfulCount++;

}else {
  console.log('Data integrity failed. Discarding data.');
}

const successRate = (successfulCount / totalReceived) * 100;
io1.emit('successRate', successRate);
    });

   

 

   
     server.listen(4000, () => {
      console.log('Emitter service is running on port 4000');
    });
    

   






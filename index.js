require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const axios = require('axios'); //add this line at the top


const client = new Discord.Client(); //create new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


//add this function below client.on('message' ...
async function getMeme(){
    const res = await axios.get('https://memeapi.pythonanywhere.com/');
    return res.data.memes[0].url;
  }

let interval;

client.on('message', async msg => {
switch (msg.content) {
    case "ping":
        msg.reply("Pong!");
        break;
    case "!meme":
        msg.channel.send("Here's your meme!"); 
        const img = await getMeme(); 
        msg.channel.send(img); 
        break;
    case "!eye":
      msg.channel.send("You are now subscribed to eye reminders.");
        interval = setInterval (function () {
        msg.channel.send("Please take an eye break now!")
        .catch(console.error); 
      }, 3600000); 
      break;
    case "!stop":
    msg.channel.send("I have stopped eye reminders.");
    clearInterval(interval);
    break;
     }
  })

  
  



//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token

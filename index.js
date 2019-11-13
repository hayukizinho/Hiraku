var http = require('http');
http.createServer().listen(process.env.PORT || 6000)
const discord = require('discord.js');
const ytdl = require('ytdl-core'); 
const YouTube = require('simple-youtube-api');
const ready = require('./handlers/ready');
const message = require('./handlers/message'); 
const config = require('./settiings/config.json');
const {YouTubeAPIKey} = require('./settiings/credentials.json');
const utils = require('./global/utils'); 
const bot = new discord.Client(); 

const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyCaRGTVmOC6jXXHF0dSt9OfuuFK6wLV45c",
    authDomain: "killer-bee-d28d9.firebaseapp.com",
    databaseURL: "https://killer-bee-d28d9.firebaseio.com",
    projectId: "killer-bee-d28d9",
    storageBucket: "killer-bee-d28d9.appspot.com",
    messagingSenderId: "339192896706",
    appId: "1:339192896706:web:6199fc95fc6f53671d2f5b",
    measurementId: "G-3XKJM3K2GM"
  };

firebase.initializeApp(firebaseConfig);
 
const database = firebase.database();


  
require('./global/functions')(bot, utils, ytdl, config);



bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
bot.youtube = new YouTube(YouTubeAPIKey); // YouTube Client
bot.queue = new Map() // Music Queue
bot.votes = new Map(); // Vote Skip
ready.ready(bot);

message.message(bot, utils, config, discord, database);
const { Client, Intents} = require('discord.js');
const {IO} = require("./io.js");
const {setTimeout} = require("timers");
const {admin} = require("./Admin.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT] });

const guildID = "1208453500766519326";
const clientID = "890708070852866058";
const cId = "1208453500766519326";

const debug = true;

const send = (t) => {
    client.channels.fetch(cId).then(e => {
        e.send(t);
    });
}


const printScoreboard = () => {
    const users = IO.get("users").sort((a, b) => b.score - a.score);
    send("## With this, the current standings are:");
    send(users.map(u => u.rname + ": " + u.score).join("\n"));
}




const regularNumbers = [
    0, 1, 100, 500, 1000,
    10000, 20000, 50000, 100000,
    200000, 300000,
    -1000, -5000, -10000, -50000, -100000, -200000
];


const runRegular = () => {
    let users = IO.get("users");
    let winner = users[Math.floor(Math.random() * users.length)];
    send("## Today's big winner is: \n # " + winner.rname + "! <@" + (debug ? 420 : winner.id) + ">");
    const amount = regularNumbers[Math.floor(Math.random() * regularNumbers.length)];
    send("## Buddy, you get: \n " + amount + " kek points!");
    winner.score += amount;
    IO.set("users", users);
    printScoreboard();
}



const checkInitSpin = () => {
    const today = new Date().getDate();
    const lastRunDay = new Date(parseInt(IO.get("lastRun"))).getDate();

    //checks day of month but should be enough
    if(today !== lastRunDay || debug){
        IO.set("lastRun", new Date().getTime())
        send("Oh yeah baby, lets go");
        runRegular();
    }

    setTimeout(() => {
        checkInitSpin();
    }, 60000);
}






client.on("messageCreate", mesg => {
    //Admin management
    admin(mesg);
    //todo check for silly spins
})

client.login(IO.getToken()).then(r => {
    checkInitSpin();
});


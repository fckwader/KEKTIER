const {IO} = require("./io.js");

const resetAll = () => {
    let users = IO.get("users");
    users.forEach(u => {
        u.score = 0;
    });
    IO.set("users", users);
}

const admin = (mesg) => {
    if(mesg.author.username !== "wader"){
        return;
    }
    if(mesg.content === "!reset"){
        mesg.reply("Resetting...");
        resetAll();
    }
}

module.exports.admin = admin;
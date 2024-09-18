const fs = require("fs");

class IO {
    static #data = {};

    static #write(){
        fs.writeFileSync("save.json", JSON.stringify(IO.#data, null, "\t"));
    }

    static #read(){
        IO.#data = JSON.parse(fs.readFileSync("save.json", {encoding: "utf-8"}));
    }

    static get(key){
        IO.#read();
        return IO.#data[key];
    }

    static set(key, value){
        IO.#data[key] = value;
        IO.#write();
    }

    static getToken(){
        return fs.readFileSync("token", {encoding: "utf-8"});
    }
}


module.exports.IO = IO;


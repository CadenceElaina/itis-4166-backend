const fs = require("fs").promises;
const path = require("path");
const readline = require('readline');
import {stdin as input, stdout as output } from 'node:process';

const filePath = path.join(__dirname, "data", "messages.txt");
const newFilePath = path.join(__dirname, "data", "messagesCopy.txt");

async function processFile(){
    try{
       const data = await fs.readFile(filePath, 'utf8')
       await fs.writeFile(newFilePath, data);
       await fs.appendFile(newFilePath, `\n\nThis is a copy of messages.txt`);
       await fs.readFile(newFilePath, 'utf8')

    } catch(err){
        console.log(err);
    }
}

const askQuestion = (q) =>{
    return new Promise((resolve) => {
        if
    })
}

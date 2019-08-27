//import word_obj from 'word.js';

const fs = require('fs');
const inquirer = require('inquirer');
const word = require('./word.js');
const letter = require('./letter.js');
var test = new word("holla");

function writeWords(){
    let arr = ["punch out","skyrim","team fortress","mario","doom"];
    fs.writeFile('list.txt',arr,(err)=>{
        if(err){
            console.log("FAILED TO WRITE/n"+err);
        }
    });
}
function readWords(){
    fs.readFile('list.txt','utf-8',(err,data)=>{
        if(err){
            console.log('what have you done?/n'+err);
        }
        let readArr = data.split(',');
        return readArr;
    });
}


console.log(test.fullWord);
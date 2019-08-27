//import word_obj from 'word.js';

const fs = require('fs');
const inquirer = require('inquirer');
const word = require('./word.js');
const letter = require('./letter.js');

word.prototype.populateList = function(counter){ //works by creating a new letter object and pushes it into an array
    if(counter < this.fullWord.length){
        
        let char = new letter(this.fullWord[counter]);
        this.wordarr.push(char);
        counter++;
        this.populateList(counter);
    }
    else{
        console.log('list finished ');
        this.wordarr.forEach((element)=>{
            console.log('letter: '+ element.character);

        })
    }

}

function writeWords(){ //writes the initial file
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
        let rand = readArr[Math.floor(Math.random()*readArr.length)]
        console.log('RNG SAYS '+rand);
        let letterCount = 0;
        let level = new word(rand);
        level.populateList(letterCount);
        
        
    });
}

function main(){
    readWords();
    

}
main();


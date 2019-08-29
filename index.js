//import word_obj from 'word.js';

const fs = require('fs');
const inquirer = require('inquirer');
const word = require('./word.js');
const letter = require('./letter.js');
var usedArr = [];

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
word.prototype.gameLoop = function(count){
    this.display();
    if(this.tries > 0){
        if(this.completed === false){
            inquirer.prompt([
                {
                    name:'choice',
                    type:'input',
                    message:'Enter a letter'
                }
            ]).then((ch)=>{
                this.checkInput(ch.choice.toString(),count);
            })
        }
        else{
            inquirer.prompt([
                {
                    name:'end',
                    type:'confirm',
                    message:'Word Complete! Play again?'
                }
            ]).then((ch)=>{
                if(ch.end===true){
                    readWords('play');
                    
                }
                else{
                    startMenu();
                }
            });

        }
    }
    else{
        inquirer.prompt([
            {
                name:'end',
                type:'confirm',
                message:'GAME OVER! Play again?'
            }
        ]).then((ch)=>{
            if(ch.end===true){
                readWords('play');
                
            }
            else{
                startMenu();
            }
        });
        
    }
}
function writeWords(arr,word){
    let indexer = arr.indexOf(word);
    if(indexer !== -1){
        arr.splice(indexer,1);
    }
    else{
        console.log('ERR word not found');
    }
    
    
    fs.writeFile('list.txt',arr,(err)=>{
        if(err){
            console.log("FAILED TO WRITE/n"+err);
        }
        console.log(`${word} removed`);
        promptOptions();
    });
}
function promptOptions(){
    inquirer.prompt([
        {
            name:'option',
            type:'list',
            choices: ['Add word','Remove word','back']

        }
    ]).then((op)=>{
        switch(op.option){
            case 'Add word':{
                addPrompt();
                break;

            }
            case 'Remove word':{
                readWords('option');
                break;

            }
            case 'back':{
                startMenu();
                break;
            }
        }
    });
}
function addPrompt(){
    inquirer.prompt([
        {
            name:'addition',
            type:'input',
            message:'Type the word you want to add: '

        }
    ]).then((op)=>{
        addWords(op.addition);
    });
}
function addWords(word){
    fs.appendFileSync('list.txt',word.toString()+',',(err)=>{
        if(err){
            console.log("FAILED TO WRITE/n"+err);
        }

    });
    console.log('succesfully added word '+word);
    promptOptions();

}
function removePrompt(wordList){
    inquirer.prompt([
        {
            name:'subtraction',
            type:'input',
            message:'Type the word you want to remove: '

        }
    ]).then((op)=>{
        writeWords(wordList,op.subtraction);
    });

}

function readWords(flag){
    fs.readFile('list.txt','utf-8',(err,data)=>{
        if(err){
            console.log('what have you done?/n'+err);
        }
        let readArr = data.split(',');
        if(flag === 'play'){
            let genWord = checkUsed(readArr);
            console.log('RNG SAYS '+genWord);
            let letterCount = 0;
            let level = new word(genWord);
            level.populateList(letterCount);
            level.display();
            level.gameLoop(letterCount);
        }
        else{
            removePrompt(readArr);

        }
    });
}
function checkUsed(arr){
    let rand = arr[Math.floor(Math.random()*arr.length)];
    if(usedArr.indexOf(rand) === -1){
        usedArr.push(rand);
        return rand;
    }
    else{
        if(usedArr.length === arr.length){
            usedArr = [];
        }
        checkUsed(arr);
    }

}


function startMenu(){
    inquirer.prompt([
        {
            name:'menu',
            type:'list',
            choices: ['Start','Options','Quit']
        }
    ]).then((re)=>{
        switch(re.menu){
            case 'Start':{
                readWords('play');
                break;
            }
            case 'Options':{
                promptOptions();
                break;
            }
            case 'Quit':{
                console.log('goodbye!');
                break;
            }
        }
    });
}

function main(){
    startMenu();
}
main();


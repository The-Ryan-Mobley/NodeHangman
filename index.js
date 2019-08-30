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
        });
    }
}
word.prototype.gameChoice = function(count){
    inquirer.prompt([
        {
            name:'choice',
            type:'input',
            message:'Enter a letter'
        }
    ]).then((ch)=>{
        this.checkInput(ch.choice.toString(),count);
    });
}
word.prototype.winPrompt = function(){
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
word.prototype.gameOver = function(){
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
word.prototype.gameLoop = function(count){
    this.display();
    if(this.tries > 0){
        if(this.completed === false){
            this.gameChoice(count);  
        }
        else{
            this.winPrompt()
        }
    }
    else{
        this.gameOver();
          
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
    fs.appendFileSync('list.txt',','+word.toString(),(err)=>{
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

function readWords(flag){                            //I wanted as few read/write functions as possible so  
    fs.readFile('list.txt','utf-8',(err,data)=>{     //this function reads list.txt then acts based on where 
        if(err){                                     //the function is called if it is from the start menu then
            console.log('what have you done?/n'+err);//I use the string 'play' to designate that it needs to 
        }                                            //create an obj then execute the main game loop if the
        let readArr = data.split(',');               //function is called from the remove word option then I
        if(flag === 'play'){                         //use 'option' which then reads the file then removes a selected word
            makeWord(readArr);
        }
        else{
            removePrompt(readArr);
        }
    });
}
function makeWord(arrayOfWords){
    let genWord = checkUsed(arrayOfWords);
    let letterCount = 0;
    let level = new word(genWord);
    level.populateList(letterCount);
    level.gameLoop(letterCount);
}
function checkUsed(arr){
    let rand = arr[Math.floor(Math.random()*arr.length)];
    console.log('rand'+ rand);
    if((usedArr.indexOf(rand) === -1)&&(rand !== null)){ //second condition to fix bug that sometimes
        usedArr.push(rand);                              //happens with the remove word
                                                         //this function picks a random word and makes sure
         console.log('rand two '+ rand);
         return rand;                                     //sure that words don't repeat until the full list 
        
    }                                                    //of words is used by keeping track of used words 
    else{                                                //in a global array and empties when all words are 
        if(usedArr.length === arr.length){   
            console.log('here');                         //used
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
function main(){//code starts here
    startMenu();
}
main();


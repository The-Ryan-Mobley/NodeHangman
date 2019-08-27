const fs = require('fs');
const inquirer = require('inquirer');



module.exports = class word_obj{
    constructor(n){
        this.fullWord = n;
        this.wordarr = [];
        this.hiddenWord = [];
        this.usedLetters = [];
        this.tries = 5;
        this.Underscores();
        
    }
    testvalues(){
        console.log('obj generated with word: '+this.fullWord);
    }
    Underscores(){ //needs to display letters from wordarr
        for(let i = 0; i < this.fullWord.length; i++){
            this.hiddenWord.push('_');
        }
    }
    display(){
        console.log(' ');
        this.wordarr.forEach((element)=>{
            element.cLog();
        })
        console.log(' ');
    }
    checkInput(letter,count){
        if(this.usedLetters.indexOf(letter) === -1){
            this.usedLetters.push(letter);
            if(this.fullWord.indexOf(letter) !== -1){
                this.wordarr.forEach((element)=>{
                    if(element.character === letter){
                        element.guess(letter);
                        console.log('found match');
                    }

                });
                console.log('lets go');
                this.count++;
                this.display();
                this.gameLoop(count);

            }
            else{
                this.tries--;
                console.log('INCORRECT INPUT');
                this.gameLoop(count);
            }
        }
    }
    gameLoop(count){
        this.display();
        if(count < this.fullWord.length){
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
    }
}

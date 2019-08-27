const fs = require('fs');
const inquirer = require('inquirer');



module.exports = class word_obj{
    constructor(n){
        this.fullWord = n;
        this.wordarr = [];
        this.hiddenWord = [];
        this.usedLetters = [];
        this.tries = 8;
        this.completed = false;
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
                count++;
                if(count < this.fullWord.length){
                    this.gameLoop(count);
                }
                else{
                    this.completed = true;
                    this.gameLoop(count);

                }

            }
            else{
                this.tries--;
                console.log('INCORRECT INPUT');
                this.gameLoop(count);
            }
        }
        else{
            console.log('REPEAT INPUT');
            this.gameLoop(count);
        }
    }
    
}

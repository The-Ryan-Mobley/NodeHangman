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
    checkInput(letter){
        if(this.usedLetters.indexOf(letter) !== -1){
            this.usedLetters.push(letter);
            if(this.fullWord.indexOf(letter) !== -1){
                this.wordarr.forEach((element)=>{
                    if(element.character === letter){
                        element.guess(letter);
                    }

                });

            }
        }
    }
    display(){
        this.wordarr.forEach((element)=>{
            element.cLog();
        })
    }
}

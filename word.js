const fs = require('fs');
const inquirer = require('inquirer');



module.exports = class word_obj{
    constructor(n){
        this.fullWord = n;
        this.wordarr = [];
        this.hiddenWord = [];
        this.Underscores();
    }
    testvalues(){
        console.log('obj generated with word: '+this.fullWord);
    }
    Underscores(){
        for(let i = 0; i < this.fullWord.length; i++){
            this.hiddenWord.push('_');
        }
    }
    guess(letter){
        if(this.fullWord.indexOf(letter) !== -1){

        }
    }
}

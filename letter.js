const fs = require('fs');
const inquirer = require('inquirer');
class letter{ //make each letter of a string an obj
    constructor(l){
        this.letter = l;
        this.display ="_";
    }
    Underscores(){
        let str = [];
        for(let i = 0; i < this.fullWord.length; i++){
            str.push('_');
        }
        return str;
    }
    guess(letter){
        if(this.fullWord.indexOf(letter) !== -1){
            this.display = this.letter;
            
        }
    }
}
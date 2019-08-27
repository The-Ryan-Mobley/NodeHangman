
const fs = require('fs');
const inquirer = require('inquirer');

module.exports = class letter_obj{ //make each letter of a string an obj
    constructor(l){
        this.character = l;
        this.display ="_";
    }
    
    guess(letter){
        if(this.fullWord.indexOf(letter) !== -1){
            this.display = this.letter;
            
        }
    }
}
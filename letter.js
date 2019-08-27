
const fs = require('fs');
const inquirer = require('inquirer');

module.exports = class letter_obj{ //make each letter of a string an obj
    constructor(l){
        this.character = l;
        this.display ="_";
        this.guessed = false;
    }
    cLog(){
        process.stdout.write(' '+this.display+' ');
    }
    
    guess(letter){
        if(letter === this.character){
            this.display = this.character;
            this.guessed = true;
        }
    }
}
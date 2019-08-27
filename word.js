const fs = require('fs');
const inquirer = require('inquirer');



module.exports = class word_obj{
    constructor(n){
        this.fullWord = n;
        this.wordarr = [];
        this.hiddenWord = this.Underscores();
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

        }
    }
}

const fs = require('fs');
const inquirer = require('inquirer');

class word{
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
function writeWords(){
    let arr = ["punch out","skyrim","team fortress","mario","doom"];
    fs.writeFile('list.txt',arr,(err)=>{
        if(err){
            console.log("FAILED TO WRITE/n"+err);
        }
    });
}
function readWords(){
    fs.readFile('list.txt','utf-8',(err,data)=>{
        if(err){
            console.log('what have you done?/n'+err);
        }
        let readArr = data.split(',');
        return readArr;
    });
}
function main(){
    let triviaList = readWords();

}
main();
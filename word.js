module.exports = class word_obj{
    constructor(w){
        this.fullWord = w;
        this.wordarr = [];
        this.usedLetters = [];
        this.tries = 8;
        this.completed = false;
    }
    testvalues(){
        console.log('obj generated with word: '+this.fullWord);
    }
    display(){
        console.log('tries left: '+this.tries);
        console.log(' \n');
        this.wordarr.forEach((element)=>{
            element.cLog();
        })
        console.log(' \n\n');
    }
    checkInput(letter,count){
        if(this.usedLetters.indexOf(letter) === -1){
            this.usedLetters.push(letter);
            if(this.fullWord.indexOf(letter) !== -1){
                this.wordarr.forEach((element)=>{
                    if(element.character === letter){
                        element.guess(letter);
                        count++;
                    }
                });
                if(count < this.fullWord.length){
                    this.gameLoop(count);
                }
                else{
                    this.completed = true;
                    this.gameLoop(count);
                    this.display();
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

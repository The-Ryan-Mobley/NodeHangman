# NodeHangman
## SUMMARY:
  This is a small program that utilizes multiple node modules to create a hangman style game from the console. The user navigates
the game's menues using inquirer. Once the game starts the user will be promted with a hidden word, as they correctly guess letters 
the display will update until the word is completed; then the user will be promted to either play again with a new word or to quit 
to the main menu. There is also an options menu where users can add or remove words sotred in the games list file.


## CODE BREAKDOWN:
  The porgram uses 3 main node modules:
  1) letter- contains logic for the 'letter' constructor that holds a single letter of the word, and switches between a hidden display
  and a revealed display
  
  2)word- contains the logic for the 'word' constructor which handles most of the games functionality. this object will hold an array
  of letters that change display as players input correct guesses, until the word is completed then a new object will be constructed.
  word also has the gameloop function which cycles between the main logic of the game.
  
  3)index- is the core file of the program which combines all the elements from the various modules in order to run the game the user
  must run the index file in node.
  
## SCREENSHOTS:
  ![start](https://drive.google.com/uc?export=view&id=130tXoWErPxDaiZTNb7gjGkeVxjPziH50)
  ![gameplay](https://drive.google.com/uc?export=view&id=16mwA3DvSwOLLuhHdMtErhXYloUSzxRmX)
  ![complete](https://drive.google.com/file/d/1JyvcjGl3B-BCStMkBno5Pie1spD86oU1/view?usp=sharing)
  ![options](https://drive.google.com/file/d/1rciuXThaUztfpYSoLHImM6mULLZIpycP/view?usp=sharing)
  ![removeword](https://drive.google.com/file/d/17tOmSoQoYeAQG7Ct1Y43SQGUbOHHdjMh/view?usp=sharing)

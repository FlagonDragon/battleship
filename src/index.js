import './styles.css';
const play = require('./logic');

console.log('YAHOO!!!');

play();

let myArray = [1,2,3];

myArray[myArray.indexOf(1)] = myArray[myArray.length-1]

console.log(myArray);

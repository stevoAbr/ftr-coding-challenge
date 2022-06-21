const readlinePromise = require('readline-promise').default
const fibonacci = require('fibonacci-fast')
import CountDown from "./timer"

let timer : CountDown;

const readline = readlinePromise.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

// Initialise user input map
let userInputMap = new Map<number, number>();

// Transform Map object into user readable format
// Reference: https://stackoverflow.com/questions/37982476/how-to-sort-a-map-by-value-in-javascript
function getReadableUserMap() {
    console.log([...userInputMap
        .entries()]
        .sort((a:any, b:any) => b[1] - a[1])
        .map(e => e.join(":"))
        .join(", "))
}

// Check if given number is a Fibonacci number which lies within the first 1000 Fibonacci numbers
function isFibonacci(num: number) {
    if (fibonacci.is(num) && fibonacci.find(num).index < 1000) {
        console.log('FIB')
    }
}

// Add user inputted number to userInputMap
function incrementNumCount(num: number) {
    let currentVal: number = userInputMap.get(num)!
    userInputMap.set(
        num, 
        userInputMap.has(num) ? currentVal + 1 : 1
    )
    isFibonacci(num)
}

// Initial question asked to user to set timer interval
function userInitialQuestion(): any {
    return readline.questionAsync("Please input the number of time in seconds between emitting numbers and their frequency: ")
}

// Asks user a question and passes input to processInput
function getUserInput(inputType = 'regular') {
    if (inputType == "regular") {
        // check if this is the first user input
        if (userInputMap.size == 0) {
            readline.questionAsync('Please enter the first number: ').then((input: any) => {
                processInput(input, getUserInput)
            })
        }
        readline.questionAsync('Please enter the next number: ').then((input: any) => {
            processInput(input, getUserInput)
        })
         
    } else if (inputType == "halted") {
        // if timer is halted, prompt user to resume
        readline.questionAsync('Timer Paused, please type resume to keep playing: ').then((input: any) => {
            processInput(input, getUserInput)
        })
    }
}

// Process user input
// Allow non-NaN and other accepted inputs such as halt, resume, quit
// callback to repeatedly ask for user input
function processInput(input: any, callback: Function) {        
    if (!isNaN(input)) {
        incrementNumCount(input);
        callback()
    } else {
        if (input == "halt") {
            timer.pauseTimer()
            console.log("Timer Halted")
            callback('halted')
        } 
        else if (input == "resume") {
            timer.resumeTimer()
            console.log("Timer Resumed")
            callback()
        }
        else if (input == "quit") {
            timer.stopTimer()
            getReadableUserMap()
            console.log("Thanks for playing")
            process.exit()
        }
        else {
            console.log("This program only accepts quit, halt, resume or an Integer as a valid input")
            callback()
        }
    }

}

// Ask initial question and commence program
userInitialQuestion().then((interval: number) => {
    timer = new CountDown(interval, getReadableUserMap)
    timer.startTimer()
}).then(() => getUserInput())


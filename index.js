#!/usr/bin/env node

const process = require("node:process");
const arguments = process.argv.slice(2);

// Function to generate a random password

function generatePassword(length, includeLowercase) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";

  if (length < 8) {
    return `(password length must be at least 8)`;
  }

  let characters = "";
  if (includeLowercase) {
    characters += lowercaseChars;
  }

  if (characters.length === 0) {
    return `(One set of characters must be included)`;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

let passwordLength = 8;
let includeLowercase = true;

// Function to display the help message

function printHelpMessage() {
  console.log(`
        Usage:
        --length, -1   Set Password length (minimum: 8, default: 8)
        --help, -h     Prints the help message
        `);
}

// Parse user arguement and error handling

for (let i = 0; i < arguments.length; i++) {
  if (arguments[i] === "--length" || arguments[i] === "-l") {
    const value = parseInt(arguments[i + 1], 10);
    if (!isNaN(value) && value >= 8) {
      passwordLength = value;
      i++;
    } else {
      console.error("Error: Length should be 8 or more");
      return;
    }
  } else if (arguments[i] === "--help" || arguments[i] === "-h") {
    printHelpMessage();
    return;
  } else {
    console.error(`Error: Use --help for usage.`);
    return;
  }
}

const password = generatePassword(passwordLength, includeLowercase);

console.log(`Generated password: ${password}`);

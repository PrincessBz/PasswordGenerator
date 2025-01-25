#!/usr/bin/env node

const process = require("node:process");
const arguments = process.argv.slice(2);

let passwordLength = 8;
let includeLowercase = true;
let includeUppercase = false;
let includeNumbers = false;

// Function to generate a random password

function generatePassword(
  length,
  includeLowercase,
  includeUppercase,
  includeNumbers
) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";

  if (length < 8) {
    return `(password length must be at least 8)`;
  }

  let characters = "";
  if (includeLowercase) {
    characters += lowercaseChars;
  }

  if (includeUppercase) {
    characters += uppercaseChars;
  }

  if (includeNumbers) {
    characters += numberChars;
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

// Function to display the help message

function printHelpMessage() {
  console.log(`
        Usage:
        --length, -l      Set Password length (minimum: 8, default: 8)
        --uppercase, -u   Include uppercase letters
        --numbers, -n     Include numbers
        --help, -h        Prints the help message
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
      console.error("Error: Length must be a number and 8 or more");
      return;
    }
  } else if (arguments[i] === "--uppercase" || arguments[i] === "-u") {
    includeUppercase = true;
  } else if (arguments[i] === "--numbers" || arguments[i] === "-n") {
    includeNumbers = true;
  } else if (arguments[i] === "--help" || arguments[i] === "-h") {
    printHelpMessage();
    return;
  } else {
    console.error(`Error: Use --help for usage.`);
    return;
  }
}

const password = generatePassword(
  passwordLength,
  includeLowercase,
  includeUppercase,
  includeNumbers
);

console.log(`Generated password: ${password}`);

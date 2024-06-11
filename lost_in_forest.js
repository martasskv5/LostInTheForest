import { Groq } from "groq-sdk";

const groq = null;

"use strict";
groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

//run on game startup
async function gameIntro() {
    const introMessage = "You are going to play a game with user, where user is lost in forest and you controll enviroment, like weather, tempeture, time, animals. User control what he will do, that mean that you gave him options and conditions, and user must do a choise. To what ever that is off topic, you will respond: 'You can not do this. You are in forest!'. The main objective of game is to get out of the forest, but you can also add some small achievements through game.";  // Replace this with your actual instruction
    const introCompletion = await getGroqChatCompletion(introMessage, "system");
    addTextToResults(introCompletion.choices[0]?.message?.content || "");
}

async function main() {
    const userInput = document.getElementById('terminalTextInput').value.trim();
    const chatCompletion = await getGroqChatCompletion(userInput, "user");
    clearInput();
    addTextToResults("===================================================================================================================================================================================")
    addTextToResults(chatCompletion.choices[0]?.message?.content || "");
}

async function getGroqChatCompletion(userInput, role) {
    return groq.chat.completions.create({
        messages: [
            {
                role: role,
                content: userInput
            }
        ],
        model: "llama3-8b-8192"
    });
}

var addTextToResults = function (textToAdd) {
    document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
}

var scrollToBottomOfResults = function () {
    var terminalResultsDiv = document.getElementById('terminalReslutsCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

var clearInput = function () {
    document.getElementById('terminalTextInput').value = "";
}

window.onload = function () {
    const mainCont = document.querySelector('.mainCont');
    const h2 = mainCont.querySelector('h2');
    const h3 = mainCont.querySelector('h3');

    // Now you can manipulate h2 and h3
    h2.textContent = 'Lost in the Forest';
    //h3.textContent = '(NOT) AI generated story';
    h3.textContent = "";

    /*addTextToResults("Enter your Groq key(you can get it on https://console.groq.com/keys):")
    document.getElementById('form')[0].onsubmit = function (evt) {
        evt.preventDefault(); // Preventing the form from submitting
        const key = document.getElementById('terminalTextInput').value.trim();
        clearInput();
        groq = new Groq({
            apiKey: key,
            dangerouslyAllowBrowser: true
        });

        gameIntro()
        document.addEventListener('DOMContentLoaded', function () {
            document.getElementsByTagName('form')[0].onsubmit = function (evt) {
                evt.preventDefault(); // Preventing the form from submitting
                if (groq === null) {
                    addTextToResults("Groq is not initialized. Please enter your Groq key.")
                    return;
                }
                else main();
                window.scrollTo(0, 150);
            }
        });
    }*/
   gameIntro();
}

document.getElementsByTagName('form')[0].onsubmit = function (evt) {
    evt.preventDefault(); // Preventing the form from submitting
    main();
    window.scrollTo(0, 150);
}
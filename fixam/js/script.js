/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
    // Array of colors for background change
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Function to change background color with a gradient effect
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop back to the start
    };

    // Change color every 2 seconds with a smooth transition
    setInterval(changeBackgroundColor, 2000);
});

let enterButton = document.getElementById("enter");
let input = document.getElementById("userInput");
let ul = document.getElementById("taskList");
let askUserButton = document.getElementById("askUserBtn");

let tasks = [];

function inputLength() {
    return input.value.length;
}

function listLength() {
    return ul.getElementsByTagName("li").length;
}

function createListElement(task) {
    let li = document.createElement("li"); // creates an element "li"
    li.appendChild(document.createTextNode(task)); //makes text from input field the li text
    ul.appendChild(li); //adds li to ul

    // START STRIKETHROUGH
    function crossOut() {
        li.classList.toggle("done");
    }
    li.addEventListener("click", crossOut);
    // END STRIKETHROUGH

    // START ADD DELETE BUTTON
    let dBtn = document.createElement("button");
    dBtn.className = "delete"; // Add a class for styling
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);

    dBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        li.remove();
        tasks = tasks.filter(t => t !== task); // Remove from tasks array
    });
}

function addTask(task) {
    if (tasks.includes(task)) {
        alert(`Task "${task}" already exists! Please enter a new task.`);
    } else {
        tasks.push(task);
        createListElement(task);
    }
}

function addListAfterClick() {
    if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
        let newTask = input.value.trim();
        addTask(newTask);
        input.value = ""; // Reset the input field
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.key === "Enter") { //checks if the user pressed Enter
        let newTask = input.value.trim();
        addTask(newTask);
        input.value = ""; // Reset the input field
    }
}

function askUserForTasks() {
    let keepAsking = true;

    while (keepAsking) {
        let newTask = prompt("Please enter a task (or type 'exit' to stop):");

        if (newTask === null || newTask.toLowerCase() === 'exit') {
            keepAsking = false;
        } else if (newTask.trim() === '') {
            alert("Task cannot be empty. Please try again.");
        } else {
            addTask(newTask.trim());
        }
    }
}

// Add event listeners
enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
askUserButton.addEventListener("click", askUserForTasks);

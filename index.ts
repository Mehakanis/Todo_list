#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;

while (condition) {
  let addTask = await inquirer.prompt([
    {
      name: "todo",
      type: "input",
      message: "What you want to add in your Todos?",
      validate: (input) => {
        if (input.trim() !== "") {
          return true;
        } else {
          return "Please enter a valid todo.";
        }
      },
    },
    {
      name: "addMore",
      type: "confirm",
      message: "Do you want to add more?",
      default: "true",
    },
  ]);
  todos.push(addTask.todo); // original array mai output add hota jayega.
  condition = addTask.addMore;
  console.log(todos);
  //console.log(addTask.todo);
}

// Additional prompt for removing a task
let removeTask = await inquirer.prompt({
  name: "removeIndex",
  type: "input",
  message: "Enter the index of the task you want to remove:",
});

// Convert input to a number
let indexToRemove = parseInt(removeTask.removeIndex);

// Check if the input is a valid index
if (
  !isNaN(indexToRemove) &&
  indexToRemove >= 0 &&
  indexToRemove < todos.length
) {
  // Remove the task at the specified index
  todos.splice(indexToRemove, 1);
  console.log("Task removed successfully.");
} else {
  console.log("Invalid index. No task removed.");
}

//UPDATE YOUR TODO FROM LIST
let updatetodos = await inquirer.prompt({
  name: "update",
  type: "confirm",
  message: "do you want to update todo?",
  default: "true",
});
if (updatetodos.update) {
  let updateChoice = await inquirer.prompt([
    {
      name: "todotoupdate",
      type: "list",
      message: "select todo to update",
      choices: todos,
    },
    {
      name: "newtodo",
      type: "input",
      message: "Enter the new value for the selected todo",
    },
  ]);
  const indextoupdate = todos.indexOf(updateChoice.todotoupdate);
  if (indextoupdate !== -1) {
    todos[indextoupdate] = updateChoice.newtodo;
  }
}

console.log("Your Todo:");
todos.forEach((todo) => {
  console.log("-" + todo);
});

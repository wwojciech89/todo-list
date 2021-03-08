//Adding new elements
const list = document.querySelector('.js-taskList');
const input = document.querySelector('.js-input');

// Adding array of objects of new Items 
const tasks = [];
let id = 0;

// Adding CSS classes for buttons
const CHECK = "item__complete";
const UNCHECK = "item__incomplete"
const LINETHROUGH = "item__textDone"



//Adding new Item (HTML)
function addItem(tekst, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINETHROUGH : "";

    const position = 'beforeend';
    const listItem = `<li class="js-item task__item">
    <div class="js-itemButtonComplete ${DONE}" id="${id}" job="complete"></div>
    <p class="js-tekst item__text ${LINE}">${tekst}</p>
    <div class="js-itemButtonRemove item__delete" id="${id}" job="delete"></div>
    </li>`;

    list.insertAdjacentHTML(position, listItem);

}

// adding Two ways to add task
const addButton = document.querySelector('.js-submitButton');

addButton.addEventListener('click', taksHandler);

document.addEventListener('keyup', function (event) {
    if (event.code === 'Enter') {
        taksHandler()
    };
});


function completeAddItem(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".item__text").classList.toggle(LINETHROUGH);
    tasks[element.id].done = tasks[element.id].done ? false : true;
}

function removeAddItem(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    tasks[element.id].trash = true;
}

list.addEventListener('click', function (event) {
    let element = event.target;
    const elementJOB = event.target.attributes.job.value;

    if (elementJOB === "complete") {
        completeAddItem(element);
    } else if (elementJOB === "delete") {
        removeAddItem(element);
    }


});


function taksHandler() {
    const inputValue = input.value;
    if (!inputValue) {
        return
    };

    addItem(inputValue, id, false, false);
    tasks.push(
        {
            name: inputValue,
            id: id,
            done: false,
            delete: false,
        }
    );
    input.value = "";
    id++;

}
const elForm = document.querySelector(".form")
const elFormInput = elForm.querySelector(".form_input")
const elPaper = document.querySelector(".paper")
const elTemplate = document.querySelector(".template").content;



let todoArr = [];


const redactedTodo = (e) => {
    let dataId = e.target.dataset.id
    let foundRedact = todoArr.find(subject => subject.id == dataId)
    foundRedact.content = prompt("Write the name which you want to change")

    renderTodo(todoArr, elPaper);
};



const deleteTodo = (e) => {
    let dataId = e.target.dataset.id
    let foundIndex = todoArr.findIndex((subject) => subject.id == dataId)
    todoArr.splice(foundIndex, 1)
    renderTodo(todoArr, elPaper)
};

function renderTodo(arr, Paper) {
    Paper.innerHTML = null;

    arr.map((subject) => {
        let cloneTemplate = elTemplate.cloneNode(true);

        let paperSubjectContent = cloneTemplate.querySelector(".content");
        let paperSubjectDelete = cloneTemplate.querySelector(".paper-item-delete")
        let paperSubjectRedact = cloneTemplate.querySelector(".paper-item-redact")

        paperSubjectContent.textContent = subject.content;
        paperSubjectDelete.dataset.id = subject.id;
        paperSubjectRedact.dataset.id = subject.id

        paperSubjectDelete.addEventListener("click", deleteTodo)
        paperSubjectRedact.addEventListener("click", redactedTodo)

        elPaper.appendChild(cloneTemplate);
    });
}

renderTodo(todoArr, elPaper)






elForm.addEventListener("submit", e => {
    e.preventDefault()
    let inputValue = elFormInput.value.trim()

    todoArr.push({
        id: new Date().getMilliseconds(),
        content: inputValue,
        isCompleted: false
    })

    console.log(todoArr);

    renderTodo(todoArr, elPaper);

    elFormInput.value = null
    elFormInput.focus()
})
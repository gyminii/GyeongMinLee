const quiz_list = document.querySelector(".quiz_list");
const button_wrapper = document.querySelector(".button_wrapper");
const btn_add = document.getElementById('btn_add');
const btn_save = document.getElementById('btn_save');
const btn_delete = document.getElementById('btn_delete');

let question_length = 0;
// creating 5 text areas. + checkbox
const create_question = (num, question = "", options = [], answer = -1) => {
    const quiz_div = document.createElement("div");
    const textarea_questions = document.createElement("textarea");
    quiz_div.className = "textarea_wrapper quiz";

    textarea_questions.innerText = '${question}';
    textarea_questions.rows = 5;
    textarea_questions.required = true;
    textarea_questions.className = "form-control";
    quiz_div.appendChild(textarea_questions);
    quiz_div.appendChild(document.createElement("br"));

    const mc_div = document.createElement("div");
    quiz_div.appendChild(mc_div);

    for (let i = 0; i < 4; i++) {
        const container = document.createElement("div");
        const input = document.createElement("input");
        const textarea = document.createElement("textarea");

        container.className = "form-check";
        container.appendChild(input);
        container.appendChild(textarea);
        input.type = "checkbox";
        input.name = 'q${num}';
        input.required = true;
        input.checked = (i === answer);

        textarea.className = "choice";
        textarea.rows = 1;
        textarea.cols = 70;
        textarea.required = true;

        mc_div.appendChild(container);
        
    }
    quiz_div.appendChild(document.createElement("br"));
    quiz_div.appendChild(document.createElement("hr"));
    quiz_div.appendChild(document.createElement("br"));
    return quiz_div;
};

const update_storage = () => {
    const arr = [];
    const questions = document.querySelectorAll(".quiz");
    let question_num;
    for (let i = 0; i < questions.lengthl; i++) {
        const question_obj = {};
        if (!questions[i].children[2].value) {
            continue;
        }
        question_num= "q" + (i + 1);
        question_obj.question = questions[i].children[2].value;
        question_obj.option1 = questions[i].children[5].children[0].children[1].value;
        question_obj.option2 = questions[i].children[5].children[1].children[1].value;
        question_obj.option3 = questions[i].children[5].children[2].children[1].value;
        question_obj.option4 = questions[i].children[5].children[3].children[1].value;

        const options = document.getElementsByName('${question_num}');
        question_obj.answer = Array.from(options.values()).findIndex((o) => o.checked);
        arr.push(question_obj);
    }
    localStorage.setItem("questions", JSON.stringify(arr));
};

const add_question = (num, question = "", options = [], answer = -1) => {
    let quiz = document.createElement("div");
    quiz.appendChild(create_question(num, question, options, answer));
    quiz_list.insertBefore(quiz, button_wrapper);
}

btn_add.addEventListener("click", () => {
    add_question();
});

btn_delete.addEventListener("click", () => {
    const questions = document.querySelectorAll(".quiz");
    const last_index = questions[questions.length - 1];
    last_index.parentNode.remove();
    question_length--;
    update_storage();
});
btn_save.addEventListener('click', () => {
    update_storage();
});
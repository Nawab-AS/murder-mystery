const { createApp, ref, watch } = Vue;

const intendedTitle = 'Murder Mystery';
const title = ref('');
const terminal = ref([]);
const userInput = ref('');
const scene = ref('main');
const questioning = ref(false);
const questioningDisabled = ref(false);

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function type(text, speed, align='center', color='white'){
    terminal.value.push({ text: '', align, color });

    if (speed == 0) {
        terminal.value[terminal.value.length - 1].text = text;
        return;
    }

    for (let i = 0; i < text.length; i++) {
        terminal.value[terminal.value.length - 1].text += text[i];
        await delay(speed);
    }
}

setTimeout(async ()=>{ // start intro
    for (let i = 0; i < intendedTitle.length; i++) {
        title.value += intendedTitle[i];
        await delay(100);
    }

    await delay(200);
    await type('Hello Mr. Anderson', 60);
    await delay(150);
    await type('I am sorry to interupt during your halloween break but there has been another incident...', 40);
    await delay(500);
    await type('in hindsight it wasn\'t very wise of me to give a detective a break on halloween.\n\n', 40);
    await delay(500);
    await type('This is the case of Victor Blackwood.', 60);
    await delay(500);
    scene.value = 'intro-finished';
    await type('\n\n[press enter to continue]', 0, 'right', '#888888');
}, 2600);


document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        console.log('enter pressed')
        if (scene.value === 'intro-finished') {
            scene.value = 'main';
        }
        if (questioning.value && !questioningDisabled.value) {
            handleUserInput();
        }
    }
    if (/^[a-zA-Z0-9]$/.test(e.key)) { // only allow alphanumeric input
        if (!questioning.value || questioningDisabled.value) return;
        terminal.value[terminal.value.length - 1].text += e.key;
        userInput.value += e.key;
    }
    if (e.code === 'Backspace') {
        if (!questioning.value || questioningDisabled.value) return;
        if (terminal.value[terminal.value.length - 1].text.length - 2 == 0) return;
        terminal.value[terminal.value.length - 1].text = terminal.value[terminal.value.length - 1].text.slice(0, -1);
    }
});

let possibleAnswers = [];
let invalidResponse = {};
async function questionPrompt(question, POSSIBLE_ANSWERS, INVALID_RESPONSE) {
    await type(question, 40, 'left', '#ff3700');
    userInput.value = '';
    questioning.value = true;
    questioningDisabled.value = false;
    possibleAnswers = POSSIBLE_ANSWERS;
    invalidResponse = INVALID_RESPONSE;
    await type('> ', 0, 'left', '#ff3700');

    while (questioning.value) { await delay(100) } // wait untill question answered

    return userInput.value;
}


async function handleUserInput() {
    userInput.value = userInput.value.trim().toLowerCase();
    if (userInput.value === '') return;
    if (questioning.value && possibleAnswers.includes(userInput.value)) {
        questioning.value = false;
    } else {
        questioningDisabled.value = true;
        userInput.value = '';
        await type(invalidResponse.text, invalidResponse.speed || 40, 'left', '#ff3700');
        await type('> ', 0, 'left', '#ff3700');
        questioningDisabled.value = false;
    }
}

watch(scene, (newScene) => {
    if (newScene === 'main') {
        game();
    }
});



createApp({
    setup() {
        return {
            terminal,
            title,
            questioning,
            questioningDisabled,
            userInput,
            handleUserInput
        };
    }
}).mount('body');
const { createApp, ref, watch } = Vue;

const intendedTitle = 'Murder Mystery';
const title = ref('');
const terminal = ref([]);
const userInput = ref('');
const scene = ref('');
const questioning = ref(false);
const questioningDisabled = ref(false);
let fast = false;

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
        if (!fast) await delay(speed);
    }
}

async function startIntro() {
    terminal.value = [];

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
}

setTimeout(async () => {
    for (let i = 0; i < intendedTitle.length; i++) {
        title.value += intendedTitle[i];
        await delay(100);
    }
    scene.value = 'intro';
}, 2600);

document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        console.log('enter pressed')
        if (scene.value === 'intro-finished') {
            scene.value = 'main';
        } else if (scene.value === 'game-over-finished') {
            terminal.value = [];
            scene.value = 'main';
        } else if (questioning.value && !questioningDisabled.value) {
            handleUserInput();
        }
    }else if (/^[a-zA-Z0-9]$/.test(e.key)) { // only allow alphanumeric input
        if (!questioning.value || questioningDisabled.value) return;
        userInput.value += e.key;
    }else if (e.code === 'Backspace') {
        if (!questioning.value || questioningDisabled.value) return;
        if (userInput.value.length == 0) return;
        userInput.value = userInput.value.slice(0, -1);
    } else if (e.code == 'Space') {
        fast = false;
    }
});
document.addEventListener('keydown', (e) => {
    if (e.code == 'Space') {
        fast = true;
    }
});

let possibleAnswers = [];
async function questionPrompt(POSSIBLE_ANSWERS) {
    await type('What would you like to do?', 60);

    await delay(300);
    let question = ''
    Object.entries(POSSIBLE_ANSWERS).forEach(([key, value]) => {
        question += `    [${key}] ${value}\n`;
    });
    await type(question, 40, 'left', '#00FF00');
    await delay(100);
    await type('Choose an option: (' + Object.keys(POSSIBLE_ANSWERS).join(', ') + ')', 40, 'left', '#ff3700');
    userInput.value = '';
    questioning.value = true;
    questioningDisabled.value = false;
    possibleAnswers = Object.keys(POSSIBLE_ANSWERS);
    await type('> ', 0, 'left', '#ff3700');

    let i = 0;
    while (questioning.value) { // wait untill question answered
        await delay(25)
        terminal.value[terminal.value.length - 1].text = '> ' + userInput.value + (i < 20 ? '█' : '');
        i = (i + 1) % 40;
    }

    return userInput.value;
}


async function handleUserInput() {
    userInput.value = userInput.value.trim().toLowerCase();
    if (userInput.value === '') return;
    if (questioning.value && possibleAnswers.includes(userInput.value)) {
        questioning.value = false;
    } else {
        questioningDisabled.value = true;
        await type(`"${userInput.value}"` + ' is not a valid option. Please choose a valid option: (' + possibleAnswers.join(', ') + ')', 0, 'left', '#ff3700');
        userInput.value = '';
        await type('> ', 0, 'left', '#ff3700');
        questioningDisabled.value = false;
    }
}

watch(scene, async (newScene) => {
    if (newScene === 'intro') {
        startIntro();
    } else if (newScene === 'main') {
        game();
    } else if (newScene === 'game-over') {
        await type('Game Over. Thank you for playing!', 50, 'center', '#FF0000');
        await type('\n\n[press enter to restart]', 0, 'right', '#888888');
        scene.value = 'game-over-finished';
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
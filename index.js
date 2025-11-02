const { createApp, ref, watch } = Vue;

const intendedTitle = 'Murder Mystery';
const title = ref('');
const terminal = ref([]);
const userInput = ref('');
const scene = ref('');
const questioning = ref(false);
const questioningDisabled = ref(false);
let fast = false;
const RED = '#ff3700';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function type(text, speed, align='center', color='white'){
    const div = document.getElementById('terminal');
    terminal.value.push({ text: '', align, color });

    if (speed == 0) {
        terminal.value[terminal.value.length - 1].text = text;
        return;
    }

    for (let i = 0; i < text.length; i++) {
        terminal.value[terminal.value.length - 1].text += text[i];
        if (!fast) await delay(speed);
        div.scrollTop = div.scrollHeight;
    }
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
    }else if (/^[0-9]$/.test(e.key)) { // only allow numeric input
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
    const POSSIBLE_ANSWERS_list = Object.values(POSSIBLE_ANSWERS);
    await type('What would you like to do?', 60);

    await delay(300);
    let question = '';
    possibleAnswers = [];
    for (let i = 0; i < POSSIBLE_ANSWERS_list.length; i++) {
        question += `    [${i+1}] ${POSSIBLE_ANSWERS_list[i]}\n`;
        possibleAnswers.push(i+1);
    }
    await type(question, 40, 'left', '#00FF00');
    await delay(100);
    await type('Choose an option:', 40, 'left', RED);
    userInput.value = '';
    questioning.value = true;
    questioningDisabled.value = false;
    await type('> ', 0, 'left', RED);

    let i = 0;
    while (questioning.value) { // wait untill question answered
        await delay(25)
        terminal.value[terminal.value.length - 1].text = '> ' + userInput.value + (i < 20 ? '█' : '');
        i = (i + 1) % 40;
    }
    terminal.value[terminal.value.length - 1].text = '> ' + userInput.value;

    return Object.keys(POSSIBLE_ANSWERS)[ possibleAnswers.indexOf(userInput.value) ];
}


async function handleUserInput() {
    userInput.value = Number(userInput.value.trim());
    if (userInput.value.length == 0) return;
    if (questioning.value && possibleAnswers.includes(userInput.value)) {
        questioning.value = false;
    } else {
        questioningDisabled.value = true;
        await type(`"${userInput.value}"` + ' is not a valid option. Please choose a valid option: ', 0, 'left', RED);
        userInput.value = '';
        await type('> ', 0, 'left', RED);
        questioningDisabled.value = false;
    }
}

watch(scene, async (newScene) => {
    if (newScene === 'intro') {
        startIntro();
    } else if (newScene === 'main') {
        game();
    } else if (newScene === 'game-over') {
        await type('Game Over. Thank you for playing!', 50, 'center', RED);
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
            handleUserInput,
            scene,
        };
    }
}).mount('body');
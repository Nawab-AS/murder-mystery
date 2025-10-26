const { createApp, ref, nextTick } = Vue;

const intendedTitle = 'Murder Mystery';
const title = ref('');
const terminal = ref([]);

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeout(async ()=>{ // start intro
    for (let i = 0; i < intendedTitle.length; i++) {
        title.value += intendedTitle[i];
        await delay(50);
    }

    //terminal.value =[{ text: 'Hello World', align: 'center'}, { text: 'Hello World', align: 'right'}, { text: 'Hello World', align: 'left'}];
}, 2500);


createApp({
    setup() {
        return {
            terminal,
            title,
        };
    }
}).mount('body');
async function game() {
    terminal.value = [];
    await type('Very well, let us begin our investigation.', 40);
    await delay(300);

    await type('You are in a remote mountain lodge. The lodge is decorated with jack-o-lanterns, cobwebs, and eerie autumn decor. The festive atmosphere is shattered when a scream echoes through the night. Victor Blackwood, the wealthy host of the party, is found dead in the pumpkin patch, his body surrounded by smashed pumpkins.', 30);

    await delay(300);
    await type('There are two possible suspects: Victor\'s personal assistant and a masked guest.', 50);

    await delay(300);
    await type('You are currently in the pumpkin patch. Examining the area surrounding Victor you find a few clues:', 50);

    await delay(300);
    await type(`
        - A broken pumpkin with a bloody knife inside
        - Victor's torn shirt with a strange symbol written on it
        - Footprints leading away from the crime scene
    `, 50, 'left', '#FFA500');

    await delay(300);
    await type('What would you like to do?', 60);
    await delay(300);
    await type(`
        [1] Follow the footprints
        [2] Check the inside of the lodge for more clues
        [3] Question the suspects
    `, 40, 'left', '#00FF00');
    
    await delay(100);
    let path = await questionPrompt('Choose an option (1, 2, or 3): ', ['1', '2', '3'], { text: 'Please choose a valid option: 1, 2, or 3.', speed: 40 });

    await type('\n\n', 0);
    if (path === '1') {
        await type('You decide to follow the footprints leading away from the crime scene...', 40);
    } else if (path === '2') {
        await type('You head back inside the lodge to search for more clues...', 40);
    } else if (path === '3') {
        await type('You approach the suspects to question them about the murder...', 40);
    }
}
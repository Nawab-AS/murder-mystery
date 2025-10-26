let inventory = [];

async function game(intro=true) {
    terminal.value = [];
    if (intro) {
        await type('Very well, let us begin our investigation.', 40);
        await delay(300);

        await type('You are in a remote mountain lodge. The lodge is decorated with jack-o-lanterns, cobwebs, and eerie autumn decor. The festive atmosphere is shattered when a scream echoes through the night. Victor Blackwood, the wealthy host of the party, is found dead in the pumpkin patch, his body surrounded by smashed pumpkins.', 30);

        await delay(300);
        await type('There are two possible suspects: Victor\'s personal assistant and a masked guest.', 50);
    }

    await delay(300);
    await type('You are currently in the pumpkin patch. Examining the area surrounding Victor you find a few clues:', 50);

    await delay(300);
    await type(`
        - A broken pumpkin with a bloody knife inside
        - Victor's torn shirt with a strange symbol drawn on it
        - Footprints leading away from the crime scene
    `, 50, 'left', '#FFA500');

    await delay(300);
    let path = await questionPrompt({ footprints: 'Follow the footprints', lodge: 'Check the inside of the lodge for more clues', suspects: 'Question the suspects' });

    await delay(300);

    let result;
    if (path === 'footprints') {
        result = await footprints();
    } else if (path === 'lodge') {
        result = await lodge();
    } else if (path === 'suspects') {
        result = await suspects();
    }

    if (result === 'game-over') {
        inventory = [];
        scene.value = 'game-over';
        return;
    }

    await delay(300);
    game(false);
}


async function footprints() {
    terminal.value = [];
    await type('You decide to follow the footprints leading away from the crime scene...', 40);
    await delay(300);

    await type('After a short walk, you find yourself at the edge of a forest. The footprints seem to head into the woods, you decide to continue following them...', 40);

    await delay(300);
    await type('As you venture deeper into the forest, you see a single scarecrow, old and tattered with ripped clothes. You wonder if this could be important...', 40);

    await delay(300);
    let action = await questionPrompt({ scarecrow: 'Investigate the scarecrow', walk: 'Continue walking through the forest', return: 'Return to the pumpkin patch' });

    await delay(300);

    if (action === 'scarecrow') {
        await type('You approach the scarecrow to investigate it further...', 40);
        await delay(300);
        if (inventory.includes('key')) {
            await type('You investigate the scarecrow again and find nothing new.', 40);
        } else  {
            await type('As you examine the scarecrow, you notice something shiny in its pocket, a key!', 40);
            inventory.push('key');
        }

        await delay(300);
        action = await questionPrompt({ walk: 'Continue walking through the forest', return: 'Return to the pumpkin patch' });

        await delay(300);
    }
    if (action === 'walk') {
        terminal.value = [];
        await type('You decide to continue walking through the forest, hoping to find more clues...', 40);
        await delay(300);
        await type('After walking for a while, you come across a clearing with a house, but something doesn\'t feel right...', 40);

        await delay(300);
        action = await questionPrompt({ approach: 'Approach the house', return: 'Return to the pumpkin patch' });
        
        await delay(300);
        if (action === 'approach') {
            await type('You cautiously approach the house, feeling a chill run down your spine...', 40);
            await delay(100);
            await type('You open the door, and start looking around for clues...', 40);
            await delay(100);
            await type('You look all over the house but can\'t find any evidence, you decide to look upstairs', 40);
            await delay(100);
            await type('As you reach the top of the stairs, you find a door slightly ajar. You push it open and step inside...', 40);
            await delay(100);
            await type('Inside the room, you find a diary on a dusty table with the same symbol that was on Victor\'s torn shirt. You pick it up and start reading', 40);
            await delay(100);
            await type('The diary reveals that Victor Blackwood had many enemies due to his ruthless business practices. It also mentions a secret meeting that was supposed to take place that night', 40);
            await delay(50);
            await type('Before you can move a muscle, you get attacked by a mysterious figure!', 20);
            await delay(500);
            await type('\n\nYOU DIED!', 150, 'center', '#FF0000');
            return 'game-over';

        } else if (action === 'return') {
            await type('You decide to return to the pumpkin patch to reconsider your options...', 40);
        }
    }
}

async function lodge() {
    terminal.value = [];
    await type('You head back inside the lodge to search for more clues...', 40);

}


async function suspects() {
    terminal.value = [];
    await type('You approach the suspects to question them about the murder...', 40);
}
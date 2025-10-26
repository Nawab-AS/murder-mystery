let inventory = [];

async function game(intro=true) {
    terminal.value = [];
    if (intro) {
        await type('Very well, let us begin our investigation.', 40);
        await delay(300);

        await type('You are in a remote mountain lodge. The lodge is decorated with jack-o-lanterns, cobwebs, and eerie autumn decor. The festive atmosphere is shattered when a scream echoes through the night. Victor Blackwood, the wealthy host of the party, is found dead in the pumpkin patch, his body surrounded by smashed pumpkins.', 30);

        await delay(300);
        await type('There are five possible suspects: Victor\'s personal assistant, a masked guest, the chef, Victor\'s brother, and Victor\'s cousin.', 50);
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

let memory = [];
async function suspects(intro=true) {
    if (intro) {
        terminal.value = [];
        await type('You approach the suspects to question them about the murder...', 40);

        await delay(150);
        await type('The suspects are: ', 40);
        await type(`
        - Victor\'s personal assistant
        - A masked guest
        - The chef
        - Victor\'s brother
        - Victor\'s cousin.`, 50, 'left', '#d38c08');
    }

    await delay(150);
    let path = await questionPrompt({ assistant: 'Question the assistant', masked: 'Question the masked guest', chef: 'Question the chef', brother: 'Question Victor\'s brother', cousin: 'Question Victor\'s cousin' });

    let path2;
    if (path === 'assistant') {
        await type('You approach Victor\'s personal assistant...', 40);
        await delay(100);
        path2 = await questionPrompt({ conversation: 'Ask about the assistant\'s conversation with Victor?', whereabouts: 'Ask about the assistant\'s whereabouts during the murder?', return: 'Return to suspects' });

        if (path2 == 'conversation') {
            await type('You ask the assistant about their conversation with Victor...', 40);
            await delay(100);
            await type('You: "I heard that Victor wanted to talk with you, what exactly did he want to discuss?"', 40);
            await delay(100);
            await type('Assistant: "He mentioned something about a family secret, but he was vague. I thought it was just party talk"', 40);
            await delay(100);
            await type('You: "Did anyone else overhear your conversation?"', 40);
            await delay(100);
            await type('Assistant: "Not that I recall, but the lodge was crowded"', 40);

        } else if (path2 == 'whereabouts') {
            await type('You ask the assistant about their whereabouts during the murder...', 40);
            await delay(100);
            await type('You: "Where were you exactly when the scream was heard?"', 40);
            await delay(100);
            await type('Assistant: "I was in the hallway, fetching some documents from Victor\'s office"', 40);
            await delay(100);
            await type('You: "Can anyone confirm that?"', 40);
            await delay(100);
            await type('Assistant: "The masked guest saw me, I think"', 40);
        }
        
    } else if (path === 'masked') {
        await type('You approach the masked guest...', 40);
        await delay(100);
        path2 = await questionPrompt({ whereabouts: 'Ask about the masked guest\'s whereabouts during the murder?', identity: 'Ask about the masked guest\'s identity', return: 'Return to suspects' });

        if (path2 === 'whereabouts') {
            await type('You ask the masked guest about their whereabouts during the murder...', 40);
            await delay(100);
            await type('You: "Where were you during the murder?"', 40);
            await delay(100);
            await type('Masked Guest: "I was outside in the garden, I just wanted fresh air"', 40);
            await delay(100);
            await type('You: "Well then you must have seen the killer"', 40);
            await delay(100);
            await type('Masked Guest: "I saw the killer but it was too dark to see clearly. They were tall, wearing dark clothes, and moved quickly towards the woods"', 40);

        } else if (path2 === 'identity') {
            await type('You ask the masked guest about their identity...', 40);
            await delay(100);
            await type('You: "Who are you really under that mask?"', 40);
            await delay(100);
            await type('Masked Guest: "I\'m Victor\'s business partner, I\'m only wearing this mask because this is a costume party after all"', 40);
        }

    } else if (path === 'chef') {
        await type('You approach the chef...', 40);
        await delay(100);
        path2 = await questionPrompt({ knife: 'Ask about the missing knife', whereabouts: 'Ask about the chef\'s whereabouts during the murder', return: 'Return to suspects' });

        if (path2 === 'knife') {
            await type('You ask the chef about the missing knife...', 40);
            await delay(100);
            await type('You: "I noticed that one of your knives is missing, do you know anything about that?"', 40);
            await delay(100);
            await type('Chef: "Yes, I did notice that one of my knives was missing earlier tonight. I thought the assistant took it to cut the cake"', 40);
            await delay(100);
            await type('You: "Did you see anyone near the kitchen before the murder?"', 40);
            await delay(100);
            await type('Chef: "Now that you mention it, I did see Victor\'s cousin lingering around the kitchen earlier."', 40);

        } else if (path2 === 'whereabouts') {
            await type('You ask the chef about his whereabouts during the murder...', 40);
            await delay(100);
            await type('You: "Where were you at the time of the murder?"', 40);
            await delay(100);
            await type('Chef: "I was in the kitchen, but I stepped out some time before I heard the scream to check the decorations"', 40);
            await delay(100);
            await type('You: "Did you see Victor at all?"', 40);
            await delay(100);
            await type('Chef: "He came in for a drink, but left quickly. He seemed agitated"', 40);
        }

    } else if (path === 'brother') {
        await type('You approach Victor\'s brother...', 40);
        await delay(100);

        path2 = await questionPrompt({ relations: 'Ask about his relation with Victor', victor: 'Ask if he saw Victor anytime during the party', return: 'Return to suspects' });

        if (path2 === 'relations') {
            await type('You ask Victor\'s brother about his relationship with Victor...', 40);
            await delay(100);
            await type('You: "What is your relationship with Victor?"', 40);
            await delay(100);
            await type('Victor\'s Brother: "I\'m really sad about his sudden passage. However he did owe me money from our inheritance. He promised to pay me back"', 40);
            await delay(100);
            await type('You: "Did you argue about it?"', 40);
            await delay(100);
            await type('Sibling: "We exchanged words, but nothing violent."', 40);

        } else if (path2 === 'victor') {
            await type('You ask Victor\'s brother if he saw Victor during the party...', 40);
            await delay(100);
            await type('You: "Did you see Victor at all during the party?"', 40);
            await delay(100);
            await type('Victor\'s Brother: "I saw him a few times, but he was always surrounded by people. I only managed to talk to him once briefly"', 40);
            await delay(100);
            await type('You: "What did you talk about?"', 40);
            await delay(100);
            await type('Victor\'s Brother: "Nothing much, just the usual family stuff"', 40);
            await delay(100);
            await type('You: "What did you do after that?"', 40);
            await delay(100);
            await type('Victor\'s Brother: "I went to the bathroom, then heard the scream"', 40);
        }
    } else if (path === 'cousin') {
        await type('You approach Victor\'s cousin...', 40);
        await delay(100);
        path2 = await questionPrompt({ whereabouts: 'Ask about the cousin\'s whereabouts during the murder', knife: 'Ask about the missing knife', return: 'Return to suspects' });

        if (path2 === 'whereabouts') {
            await type('You ask Victor\'s cousin about her whereabouts during the murder...', 40);
            await delay(100);
            await type('You: "Where were you at the time of the murder?"', 40);
            await delay(100);
            await type('Victor\'s Cousin: "I was in the library reading about the history of the family estate. It mentioned something about a family curse."', 40);
            await delay(100);
            await type('You: "Did it have anything interesting that could relate to the murder?"', 40);
            await delay(100);
            await type('Victor\'s Cousin: "The family curse is somehow tied to the pumpkin patch. Supposedly a betrayal long ago. I told Victor but he dismissed it as nonsense"', 40);

        } else if (path2 === 'knife') {
            await type('You ask Victor\'s cousin about the missing knife...', 40);
            await delay(100);
            await type('You: "The chef told me you were lingering around the kitchen. What were you doing there?"', 40);
            await delay(100);
            await type('Victor\'s Cousin: "I borrowed a knife for carving pumpkins earlier, but returned it."', 40);
            await delay(100);
            await type('You: "Was it the missing one?"', 40);
            await delay(100);
            await type('Victor\'s Cousin: "Possibly; the chef was busy, so I put it back myself."', 40);
        }
    }

    await delay(200);
    path = await questionPrompt({ question: 'question another suspect', return: 'return to the pumpkin patch' });

    if (path === 'question') await suspects(false);
    await delay(100);
    await type('You decide to search for more clues', 40);
}
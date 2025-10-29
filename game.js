let inventory = [];

async function game(intro=true) {
    terminal.value = [];
    if (intro) {
        inventory = [];
        await type('Very well, let us begin our investigation.', 40);
        await delay(300);

        await type('You are in a remote mountain lodge. The lodge is decorated with jack-o-lanterns, cobwebs, and eerie autumn decor. The festive atmosphere is shattered when a scream echoes through the night. Victor Blackwood, the wealthy host of the party, is found dead in the pumpkin patch, his body surrounded by smashed pumpkins.', 30);

        await delay(300);
        await type('There are five possible suspects: Victor\'s personal assistant, a masked guest, the chef, Victor\'s brother, and Victor\'s cousin.', 50);
    }

    await delay(300);
    await type('You are currently in the pumpkin patch', 50);

    if (intro) {
        await type('Examining the area surrounding Victor you find a few clues:', 50);

        await delay(300);
        await type(`
    - A broken pumpkin with a bloody knife inside
    - Victor's torn shirt with a strange symbol drawn on it
    - Footprints leading away from the crime scene
    `, 50, 'left', '#FFA500');
    }

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
        await delay(100);
        await type('The air becomes colder and you feel a bad presence around you...', 40);
        if (inventory.includes('amulet')) {
            await delay(100);
            await type('However, the amulet you found earlier glows warmly, protecting you from the evil presence...', 40);
        }

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
            await delay(150);
            if (!inventory.includes('amulet')) {
                await type('As you read the diary you start suffocating by a mysterious force...', 20);
                await delay(500);
                await type('\n\nYOU DIED OF SUFFOCATION!', 110, 'center', '#FF0000');
                return 'game-over';
            } else {
                await type('You turn to the next page and find a clue about the secret meeting location: the cellar in the lodge...', 40);
                await delay(100);
                await type('Written under that is the code to open the cellar door: 4729', 40);
                inventory.push('cellar-code');
                await delay(100);
            }

        } else if (action === 'return') {
            await type('You decide to return to the pumpkin patch to reconsider your options...', 40);
        }
    }
}

async function lodge(intro=true) {
    terminal.value = [];
    if (intro) await type('You head back inside the lodge to search for more clues...', 40);
    await delay(300);

    let prompt  = await questionPrompt({ kitchen: 'Search the kitchen', study: 'Search Victor\'s study', guest: 'Search the guest room', cellar: 'Search the cellar', return: 'Return to the pumpkin patch' });
    await delay(300);
    
    if (prompt === 'kitchen') {
        await type('You decide to search the kitchen for clues...', 40);
        await delay(100);
        await type('After searching the kitchen for a while, there is nothing special other that the missing knife that matches the one used in the murder', 40);
    } else if (prompt === 'study') {
        await type('You decide to search Victor\'s study for clues...', 40);
        await delay(100);
        await type('After searching the study, you find a locked drawer', 40);
        if (inventory.includes('key')) {
            if (!inventory.includes('amulet')) {
                await type('You use the key to unlock the drawer and find:', 40);
                await delay(100);
                await type(`
    - Uncover a torn photograph of Victor with a tall figure, the word "betrayal" written on the back
    - A map of the lodge grounds with a red X marked in the forest
    - An amulet with a strange symbol on it
                `, 40, 'left', '#d38c08');
                await delay(100);
                await type('You wear the amulet, feeling a surge of energy coursing through you.', 40);
                await delay(100);
                inventory.push('amulet');
            } else {
                await type('You look at the rummaged drawer. There is nothing else of interest', 40);
                await delay(100);
            }
        } else {
            await type('The drawer is locked and you don\'t have the key', 40);
            await delay(100);
            await type('You should search for the key elsewhere...', 40);
        }

    } else if (prompt === 'guest') {
        await type('You decide to search the guest room for clues...', 40);
        await delay(100);
        if (!inventory.includes('boots')) {
            await type(`After searching the guest room, you find
    - torn piece of fabric that matches Victor's shirt
    - A suitcase containing a disguise
    - A pair of muddy boots matching the footprints in the pumpkin patch
        `, 40, 'left', '#d38c08');
            await delay(100);
            inventory.push('boots');

        } else {
            await type('After searching the guest room again, you find nothing new.', 40);
            await delay(100);
        }

    } else if (prompt === 'cellar') {
        await type('You decide to search the cellar for clues...', 40);
        await delay(100);
        if (!inventory.includes('cellar-code')) {
            await type('You try to open the cellar door but find that there is a lock attached', 40);
            await delay(100);
            await type('You need to find the code to open the cellar door', 40);
            await delay(100);
        } else {
            await type('You open the cellar door using the code you found in the diary: 4729', 40);
            await delay(100);
            await type('The door opens with a creak, revealing a dark, damp cellar filled with old furniture and boxes. As you search through the cellar you move some boxes aside and find: a conspiracy board on the wall', 40);
            await delay(100);
            await type('The board is filled with notes, photos, and strings connecting various people and events. In the center there is a picture of Victor with a red X over it.', 40);
            await delay(100);
            await type('You study the board and realize that Victor was involved in a shady gambling opperation, earning millions every year.', 40);
            await delay(100);
            await type('As you study the board even further, you notice a pattern. Victor owes someone a large sum of money, an unpaid debt', 40);
            await delay(100);
            inventory.push('debt');
            if (inventory.includes('motive')) {
                await type('You remember that Victor\'s brother told you that Victor owed him his inheritance, it must be him.', 40);
            } else {
                await type('This clue might help you identify the killer.', 40);
                await delay(100);
            }
        }

    } else if (prompt === 'return') {
        await type('You decide to return to the pumpkin patch to reconsider your options...', 40);
        await delay(300);
        return;
    }

    prompt = await questionPrompt({ lodge: 'Search another room in the lodge', return: 'Return to pumpkin patch' });
    await delay(300);
    
    if (prompt === 'lodge') {
        await lodge(false);
    } else if (prompt === 'return') {
        await type('You decide to return to the pumpkin patch to reconsider your options...', 40);
        await delay(300);
    }
}

async function suspects(intro=true) {
    terminal.value = [];
    if (intro) {
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
        path2 = await questionPrompt({ conversation: 'Ask about the assistant\'s conversation with Victor?', whereabouts: 'Ask about the assistant\'s whereabouts during the murder?' });

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
        path2 = await questionPrompt({ whereabouts: 'Ask about the masked guest\'s whereabouts during the murder?', identity: 'Ask about the masked guest\'s identity' });

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
        path2 = await questionPrompt({ knife: 'Ask about the missing knife', whereabouts: 'Ask about the chef\'s whereabouts during the murder' });

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

        if (inventory.includes('debt')) {
            await type('You remember that Victor\'s brother told you that Victor owed him his inheritance, it must be him.', 40);
            path2 = await questionPrompt({ relations: 'Ask about his relation with Victor', victor: 'Ask if he saw Victor anytime during the party', board: 'Confront him about the conspiracy board in the cellar' });
        } else {
            path2 = await questionPrompt({ relations: 'Ask about his relation with Victor', victor: 'Ask if he saw Victor anytime during the party' });
        }

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
            inventory.push('motive');
            if (inventory.includes('debt')) {
                await delay(100);
                await type('you remember the conspiricy board in the cellar, it mentioned Victor owed someone a large sum of money. this must be the killer', 40);
            }

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
        } else if (path2 === 'board') {
            await type('You ask Victor\'s brother about the conspiracy board in the cellar...', 40);
            await delay(100);
            await type('You: "Did you know about the conspiracy board in the cellar?"', 40);
            await delay(100);
            await type('Victor\'s Brother: "conspiracy board? What do you mean? I haven\'t seen anything like that."', 40);
            await delay(400);
            await type('You know he is lying, his hands are shaking slightly, and he started shivering', 40);
            await delay(100);
            await type('You: "Are you hiding something from me?"', 40);
            await delay(100);
            await type('Victor\'s Brother: "NO! I have NO idea what you\'re talking about! I would NEVER kill my brother!"', 40);
            await delay(100);
            await type('you start getting worried about his aggression...', 40);
            await delay(100);

            let path3 = await questionPrompt({ calm: 'Try to calm him down', arrest: 'Arrest him', return: 'Return to pumpkin patch' });

            if (path3 === 'calm') {
                await type('You try to calm him down...', 40);
                await delay(100);
                await type('You: "Please calm down, I just want to get to the bottom of this."', 40);
                await delay(100);
                await type('Victor\'s Brother: "I\'m sorry, I just... I loved my brother. I can\'t believe he\'s gone..."', 40);
                await delay(100);
                await type('You: "I know you\'re the killer, you killed him because because he didn\'t give you you\'r part of the inheritence"', 40);
                await delay(100);
                await type('Victor\'s Brother: "Okay, I admit it. I was the one who killed him..."', 40);
                await delay(100);
                await type('\n\nYOU FOUND THE KILLER!', 150, 'center', '#00FF00');
                await delay(500);
                return 'game-over';
            } else if (path3 === 'arrest') {
                await type('You decide to arrest Victor\'s brother...', 40);
                await delay(100);
                await type('You: "I\'m placing you under arrest for the murder of Victor."', 40);
                await delay(100);
                await type('Victor\'s Brother: "No! You can\'t do this! I didn\'t kill him!"', 40);
                await delay(100);
                await type('You: "Save it for the judge. Let\'s go."', 40);
                await delay(100);
                await type('As you handcuff Victor\'s brother, he looks at you viciously and in a split second he attacks you with a concealed knife', 75, '#a0160c');
                await delay(500);
                await type('\n\nYOU DIED OF STAB WOUNDS!', 110, 'center', '#FF0000');
                return 'game-over';
            } else if (path3 === 'return') {
                await type('You decide to return to the pumpkin patch to reconsider your options...', 40);
                await delay(300);
                await type('As you start to walk back, Victor\'s brother runs up and wrestles you to the ground and into a chokehold!', 75, '#a0160c');
                await delay(500);
                await type('\n\nYOU DIED OF STRANGULATION!', 110, 'center', '#FF0000');
                return 'game-over';
            }
        }
    } else if (path === 'cousin') {
        await type('You approach Victor\'s cousin...', 40);
        await delay(100);
        path2 = await questionPrompt({ whereabouts: 'Ask about the cousin\'s whereabouts during the murder', knife: 'Ask about the missing knife' });

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
    } else if (path2 === 'return') {
        await type('You decide to return to the pumpkin patch to reconsider your options...', 40);
        await delay(300);
        return;
    }

    await delay(200);
    path = await questionPrompt({ question: 'question another suspect', return: 'return to the pumpkin patch' });

    if (path === 'question') await suspects(false);
    await delay(100);
    await type('You decide to search for more clues', 40);
    await delay(250);
}

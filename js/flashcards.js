const fs = require('fs');
const inquirer = require('inquirer');

// ES6 class constructors
// class BasicCard {
//     constructor (front, back) {
//         this.front = front;
//         this.back = back;
//     }
// }

// class ClozeCard {
//     constructor (fullText, cloze) {
//         if (fullText.includes(cloze)) {
//             this.fullText = fullText;
//             this.cloze = cloze;
//             this.partial = this.fullText.replace(this.cloze, '...');
//         } else {
//             console.log(cloze + ' does not exist in text')
//         }
//     }
// }

// Constructors without the need for new
function BasicCard(front, back) {
    if (this instanceof BasicCard) {
        this.front = front;
        this.back = back;
        setCard(this, 'basic_card');
    } else {
        return new BasicCard(front, back);
    }  
}

function ClozeCard(fullText, cloze) {
    if (this instanceof ClozeCard) {
        if (fullText.includes(cloze)) {
            this.fullText = fullText;
            this.cloze = cloze;
            this.partial = this.fullText.replace(this.cloze, '...');
            setCard(this, 'cloze_card');
        } else {
            console.log(cloze + ' does not exist in text')
        }
    } else {
        return new ClozeCard(fullText, cloze);
    }
}

function getCards() {
    fs.readFile('cards.json', 'utf8', function (err, data) {
        let cardLibrary = JSON.parse( data );
        if (cardLibrary.basic_cards.length == 0 && cardLibrary.cloze_cards.length == 0) {
            console.log("There are currently no cards");
        } else {
            cardLibrary.basic_cards.forEach(currentItem => {
                console.log("Front: " + currentItem.front + " / " + " Back: " + currentItem.back);
            });

            cardLibrary.cloze_cards.forEach(currentItem => {
                console.log("Full Text: " + currentItem.fullText + " / " + " Partial: " + currentItem.partial);
            });
        }
    });
}

function setCard(card, type) {
    fs.readFile( 'cards.json', 'utf8', function (err, data) {
        data = JSON.parse( data );
        if (type == 'cloze_card') {
            data.cloze_cards.push(card);
        } else {
             data.basic_cards.push(card);
        }
        fs.writeFile( 'cards.json', JSON.stringify(data));
        getCards();
    });
}

function deleteCards() {
     fs.readFile( 'cards.json', 'utf8', function (err, data) {
        data = JSON.parse( data );
        data.basic_cards = [];
        data.cloze_cards = [];
        fs.writeFile( 'cards.json', JSON.stringify(data));
        console.log("All cards have been deleted.");
    });
}


function inquireCommand() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Get cards", "Create Basic Card", "Create Cloze Card", "Delete Cards"],
            name: "choice"
        },
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ])
    .then((response) => {
        if (response.confirm) {
            switch (response.choice) {
                case "Get cards":
                    getCards();
                    break;
                case "Create Basic Card":
                    inquireCreateBasic();
                    break;
                case "Create Cloze Card":
                    inquireCreateCloze();
                    break;
                case "Delete Cards":
                    deleteCards();
                    break;
            }
        } else {
            inquireCommand();
        }
    })
    .catch((error) => {
        throw error;
    })
}

function inquireCreateBasic() {
    inquirer.prompt([
        {
            type: "input",
            message: "What would you like the front of the card to be?",
            name: "front"
        },
        {
            type: "input",
            message: "What would you like the back of the card to be?",
            name: "back"
        },
         {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ])
    .then((response) => {
        if (response.confirm) {
            let card = BasicCard(response.front, response.back);
        } else {
            inquireCreateBasic();
        }
    })
    .catch((error) => {
        throw error;
    })
}

function inquireCreateCloze() {
    inquirer.prompt([
        {
            type: "input",
            message: "What would you like the full text of the card to be?",
            name: "fullText"
        },
        {
            type: "input",
            message: "What would you like the cloze of the card to be?",
            name: "cloze"
        },
         {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ])
    .then((response) => {
        if (response.confirm) {
            let card = ClozeCard(response.fullText, response.cloze);
        } else {
            inquireCreateBasic();
        }
    })
    .catch((error) => {
        throw error;
    })
}

inquireCommand();
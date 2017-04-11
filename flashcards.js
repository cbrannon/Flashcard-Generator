var express = require('express');
var app = express();
const fs = require("fs");
const inquirer = require("inquirer");

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

        } else {
            console.log(cloze + ' does not exist in text')
        }
    } else {
        return new ClozeCard(fullText, cloze);
    }
}

const georgeWashington = BasicCard("Who had wooden teeth?", "George Washington");
const georgeCloze = ClozeCard("George Washington was old", "George Washington");

// app.get('/listCards', function (request, response) {
//     fs.readFile( __dirname + "/" + "cards.json", 'utf8', function (err, data) {
//         console.log( data );
//         res.end( data );
//     });
// });

function getCards() {
    fs.readFile("cards.json", 'utf8', function (err, data) {
        console.log( data );
        // res.end( data );
    });
}

function setCard(card) {
    fs.readFile( "cards.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        console.log(data);
        data.cloze_cards.push(card);
        // console.log(data.length);
        fs.writeFile( "cards.json", JSON.stringify(data));
        // console.log( data );
        // res.end( JSON.stringify(data));
    });
}



// app.post('/addCard', function (request, response) {
//     // First read existing cards.
//     fs.readFile( __dirname + "/" + "cards.json", 'utf8', function (err, data) {
//         data = JSON.parse( data );
//         data.cloze_cards["card1"] = JSON.stringify(georgeCloze);
//         console.log( data );
//         res.end( JSON.stringify(data));
//     });
// });

// var server = app.listen(8081, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("Example app listening at http://%s:%s", host, port)

// });

console.log(georgeCloze);
setCard(georgeCloze);
var express = require('express');
var app = express();
var fs = require("fs");

// app.get('/listUsers', function (req, res) {
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//        console.log( data );
//        res.end( data );
//    });
// })

// var server = app.listen(8081, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("Example app listening at http://%s:%s", host, port)

// })

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

var georgeWashington = BasicCard("Who had wooden teeth?", "George Washington");
var georgeCloze = ClozeCard("George Washington was old", "George Washington");

console.log(georgeWashington);
console.log(georgeCloze);

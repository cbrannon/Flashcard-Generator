// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);


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
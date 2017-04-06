function BasicCard(front, back) {
    if (this instanceof BasicCard) {
        this.front = front;
        this.back = back;
    } else {
        return new BasicCard(front, back);
    }  
}

function ClozeCard(text, cloze) {
    if (this instanceof ClozeCard) {
        this.text = text;
        this.cloze = cloze;
        this.partial;

        this.clozeDeletion = () => {
            if (text.includes(cloze)) {
                this.partial = text.replace(cloze, '...');
            } else {
                this.partial = cloze + ' does not exist in text';
            }
        }

        this.clozeDeletion();
    } else {
        return new ClozeCard(text, cloze);
    }
}

var georgeWashington = BasicCard("Who had wooden teeth?", "George Washington");
var georgeCloze = ClozeCard("George Washington was old", "George Washington");

console.log(georgeCloze);
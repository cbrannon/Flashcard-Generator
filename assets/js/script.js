$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAXnshfNHtR30Jy5me0P8ngThyhP2IabPE",
        authDomain: "flashcards-417b0.firebaseapp.com",
        databaseURL: "https://flashcards-417b0.firebaseio.com",
        projectId: "flashcards-417b0",
        storageBucket: "flashcards-417b0.appspot.com",
        messagingSenderId: "778844871108"
    };
    firebase.initializeApp(config);

    var provider = new firebase.auth.GoogleAuthProvider();

    function googleSignin() {
        firebase.auth()
        .signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
                
            console.log(token)
            console.log(user)
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
                
            console.log(error.code)
            console.log(error.message)
        });
    }

    function googleSignout() {
        firebase.auth().signOut()
            
        .then(function() {
            console.log('Signout Succesfull')
        }, function(error) {
            console.log('Signout Failed')  
        });
    }

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

    $("#sign-in").on("click", function() {
        googleSignin();
    });

    $("#sign-out").on("click", function() {
        googleSignout();
    });

});

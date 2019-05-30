var config = {
    apiKey: "AIzaSyAkfQNjBaedX7EG08Wov0YEQNY82CRSEbs",
    authDomain: "expertstrategies-4f821.firebaseapp.com",
    databaseURL: "https://expertstrategies-4f821.firebaseio.com",
    projectId: "expertstrategies-4f821",
    storageBucket: "expertstrategies-4f821.appspot.com",
    messagingSenderId: "255891035176"
};
firebase.initializeApp(config);


let participantId = window.location.search.substr(1).split("?")[0];
let strategy1 = window.location.search.substr(1).split("?")[1];
let strategy2 = window.location.search.substr(1).split("?")[2];


async function beginStudy() {
    localStorage.setItem('pId',participantId );
    localStorage.setItem('strategy1',strategy1 );
    localStorage.setItem('strategy2',strategy2 );


    let database = firebase.firestore();

    database.collection("TestersConsent").doc(participantId).set({
        Agreement: "agree",
        Strategy1:strategy1,
        Strategy2:strategy2


    }).catch(function (err) {
        console.log("error saving", err);
    });


    setTimeout(function() {
        window.location.href = "testing.html?"+participantId+"?"+strategy1+"?"+strategy2;
    }, 1000);


}

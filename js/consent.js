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
let taskAssigned = window.location.search.substr(1).split("?")[1];

async function beginStudy() {
    localStorage.setItem('pId',participantId );
    localStorage.setItem('pTask',taskAssigned );

   // let pId =localStorage.getItem("pId");

    let database = firebase.firestore();

    database.collection("AuthorsConsent").doc(participantId).set({
        Agreement: "agree",
        Task:taskAssigned


    }).catch(function (err) {
        console.log("error saving", err);
    });


    setTimeout(function() {
        window.location.href = "index.html/?"+participantId+"?"+taskAssigned;
    }, 1000);


}

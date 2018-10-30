var config = {
    apiKey: "AIzaSyAkfQNjBaedX7EG08Wov0YEQNY82CRSEbs",
    authDomain: "expertstrategies-4f821.firebaseapp.com",
    databaseURL: "https://expertstrategies-4f821.firebaseio.com",
    projectId: "expertstrategies-4f821",
    storageBucket: "expertstrategies-4f821.appspot.com",
    messagingSenderId: "255891035176"
};
firebase.initializeApp(config);


let database = firebase.firestore();
database.settings({timestampsInSnapshots: true})
database.collection("Strategies").doc("aJmqInh8cly1rckT62Wp").set({
    Experience: 2,
    Strategy: "aph@gmu.edu"
}).then((r) => {
    if(!r)
console.log("Success!")
});

async function addNewStrategy(experience, strategy) {
    return database.collection("Strategies").add({
        Experience: experience,
        Strategy: strategy
    });
}
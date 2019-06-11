


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
var strategy = database.collection("Strategies");
var authors="";
var testers="";
var authorsRevisions="";
var authorsConsents="";
var testersConsents="";

var allAutorsData = strategy.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
           // console.log(doc.id, '=>', doc.data());
             var test= JSON.stringify(doc.data());
            // console.log("\""+doc.id+"\"" +  ':'+ test +",");
            authors+= "\""+doc.id+"\"" +  ':'+ test +",";
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });

var testers = database.collection("TestedStrategies");

var allTesters = testers.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            var test = JSON.stringify(doc.data());
            testers+= "\""+doc.id+"\"" +  ':'+ test +",";
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
var authorsRevised = database.collection("StrategyRevisions");

var allRevisions = authorsRevised.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            var test = JSON.stringify(doc.data());
            authorsRevisions+= "\""+doc.id+"\"" +  ':'+ test +",";
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });

var authorsConsents = database.collection("AuthorsConsent");

var aConsents = authorsConsents.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            var test = JSON.stringify(doc.data());
            authorsConsents+= "\""+doc.id+"\"" +  ':'+ test +",";
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });

var testersConsents = database.collection("TestersConsent");

var tConsents = testersConsents.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            var test = JSON.stringify(doc.data());
            testersConsents+= "\""+doc.id+"\"" +  ':'+ test +",";
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
    function XXX(){
        console.log("\"AUTHORS\":{"+ authors+"}");
        console.log("\"TESTERS\":{"+ testers+"}");
        console.log("\"REVISIONS\":{"+ authorsRevisions+"}");
        console.log("\"AUTHORS_CONSENT\":{"+ authorsConsents+"}");
        console.log("\"TESTERS_CONSENT\":{"+ testersConsents+"}");
    }


// const fs = require('fs');
//
// const promisify = require('util').promisify;

var config = {
    apiKey: "AIzaSyAkfQNjBaedX7EG08Wov0YEQNY82CRSEbs",
    authDomain: "expertstrategies-4f821.firebaseapp.com",
    databaseURL: "https://expertstrategies-4f821.firebaseio.com",
    projectId: "expertstrategies-4f821",
    storageBucket: "expertstrategies-4f821.appspot.com",
    messagingSenderId: "255891035176"
};

firebase.initializeApp(config);

// const writeFilePromise = promisify(fs.writeFile);
//
// WriteTextToFileAsync = async (test) => {
//
//     try {
//         // FIXME: give your own path, this is just a dummy path
//         const path = '/Users/maryam/Documents/Projects/StrategyTutorial/data/test.json';
//         await writeFilePromise(test, path);
//     } catch(err) {
//         throw new Error(`Could not write file because of {err}`);
//     }
// }

let database = firebase.firestore();
var strategy = database.collection("Strategies");
var allAutorsData = strategy.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
           // console.log(doc.id, '=>', doc.data());
            var test = JSON.stringify(doc.data());

            //console.log("\""+doc.id+"\"" +  ':'+ test +",");
            // try {
            //     //FIXME: Simply write the entire request body for now
            //
            //     WriteTextToFileAsync(test);
            //     return res.status(200).send( { message: 'File written successfully!' });
            // } catch (err) {
            //     throw new Error(`Could not write file because of {err}`);
            // }
            // fs.writeFile('myjsonfile.json', test, 'utf8', function(err) {
            //     if (err) throw err;
            //     console.log('complete');
            // });
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });

var testers = database.collection("TestedStrategies");

var allTesters = testers.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            var test = JSON.stringify(doc.data());

            console.log("\""+doc.id+"\"" +  ':'+ test +",");
            // try {
            //     //FIXME: Simply write the entire request body for now
            //
            //     WriteTextToFileAsync(test);
            //     return res.status(200).send( { message: 'File written successfully!' });
            // } catch (err) {
            //     throw new Error(`Could not write file because of {err}`);
            // }
            // fs.writeFile('myjsonfile.json', test, 'utf8', function(err) {
            //     if (err) throw err;
            //     console.log('complete');
            // });
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
console.log(allTesters);
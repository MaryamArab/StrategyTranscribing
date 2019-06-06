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
let firstTestedStrategyId = window.location.search.substr(1).split("?")[1];
let secondTestedStrategyId = window.location.search.substr(2).split("?")[2];

let database = firebase.firestore();

//****************Monaco Editor**************************
require.config({ paths: { 'vs': '../monaco/node_modules/monaco-editor/min/vs' }});

require(['vs/editor/editor.main'], function() {

    monaco.languages.register({
        id: 'robotoLanguage'
    });
    monaco.languages.setMonarchTokensProvider('robotoLanguage', {
        tokenizer: {
            root: [
                [/\[error.*/, "custom-error"],
                [/\[notice.*/, "custom-notice"],
                [/\[info.*/, "custom-info"],
                [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
            ],
        }
    });

    // Define a new theme that constains only rules that match this language
    monaco.editor.defineTheme('myCoolTheme', {
        base: 'vs',
        inherit: false,
        rules: [
            { token: 'custom-info', foreground: '808080' },
            { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
            { token: 'custom-notice', foreground: 'FFA500' },
            { token: 'custom-date', foreground: '008800' },
        ]
    });

});

//***************************End Monaco Editor**********************************

var yourStrategy = "";
$(document).ready(function () {


    var strategy = database.collection("Strategies").doc(participantId);
    var testedStrategy1 = database.collection("TestedStrategies").doc(firstTestedStrategyId);
    var testedStrategy2 = database.collection("TestedStrategies").doc(secondTestedStrategyId);

    var getDoc = strategy.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                var test = doc.data();
                console.log("test   "+JSON.stringify(test));
                yourStrategy = doc.data().StrategyDefinition;
                firstTask = doc.data().Task;
                console.log('Task   :', doc.data().Task);
                var programmingTaskLink=document.getElementById("programmingTaskAnchor");
                var jsFiddleLink = document.getElementById("jsFiddleLink");
                if(doc.data().Task =="CssDebuggingTask"){
                    programmingTaskLink.setAttribute('href', "https://maryamarab.github.io/StrategyTranscribing/jank2/");
                    jsFiddleLink.setAttribute('href', "https://jsfiddle.net/marab/qtjdpb2a/3/");
                }
                else if(doc.data().Task =="ProfilerTask")
                {
                    programmingTaskLink.setAttribute('href', "https://maryamarab.github.io/StrategyTranscribing/jank/");
                    jsFiddleLink.setAttribute('href', "https://jsfiddle.net/marab/5nmgf1yp/");
                }
                else if(doc.data().Task =="ErrorHandlingTask")
                {
                    programmingTaskLink.setAttribute('href', "https://maryamarab.github.io/StrategyTranscribing/ErrorHandling/");
                    jsFiddleLink.setAttribute('href', "https://jsfiddle.net/marab/g6x9o5r0/");
                }


                window.editor = monaco.editor.create(document.getElementById('strategy_container'), {
                    theme: 'myCoolTheme',
                    value: "",
                    language: 'robotoLanguage'
                });
                editor.setValue( yourStrategy.replace(/(?:\\[n]|[\n]+)+/g, "\n"));
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
    var strat1= "";
    var strat2 = "";

    var getTestedStrategy1 = testedStrategy1.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                var test2 = doc.data();
                console.log("test2   "+JSON.stringify(test2));
                 if(doc.data().Strategy1.StrategyId==participantId)
                     strat1=doc.data().Strategy1;
                 else
                     strat1=doc.data().Strategy2;
                console.log(strat1);
                $("#challengingToWork").append("<br><h4>Tester1:</h4>" +"<p class=\"quote\">\""+strat1.ChallengingToWork+"\"</p>"+
                    "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>"+
                    "<textarea class=\"answerArea field\" id=\"challengingToWork1-makeSense\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>"+
                    "<textarea class=\"answerArea field\" id=\"challengingToWork1-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>"+
                    "<textarea class=\"answerArea field\" id=\"challengingToWork1-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");

                $("#missing").append("<br><h4>Tester1:</h4>" +"<p class=\"quote\">\""+strat1.Missing+"\"</p>"+
                    "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>"+
                    "<textarea class=\"answerArea field\" id=\"missing1-makeSense\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>"+
                    "<textarea class=\"answerArea field\" id=\"missing1-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>"+
                    "<textarea class=\"answerArea field\" id=\"missing1-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");

                $("#requiredInfo").append("<br><h4>Tester1:</h4>" +"<p class=\"quote\">\""+strat1.RequiredInfo+"\"</p>"+
                "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>"+
                "<textarea class=\"answerArea field\" id=\"requiredInfo1-makeSense\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>"+
                    "<textarea class=\"answerArea field\" id=\"requiredInfo1-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>"+
                    "<textarea class=\"answerArea field\" id=\"requiredInfo1-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");

                $("#clarity").append("<br><h4>Tester1:</h4>" +"<p class=\"quote\">\""+strat1.Clarity+"\"</p>"+
                "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>"+
                "<textarea class=\"answerArea field\" id=\"clarity1-makeSense\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>"+
                    "<textarea class=\"answerArea field\" id=\"clarity1-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>"+
                    "<textarea class=\"answerArea field\" id=\"clarity1-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");

                $("#otherChallenges").append("<br><h4>Tester1:</h4>" +"<p class=\"quote\">\""+strat1.OtherChallenges+"\"</p>"+
                "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>"+
                "<textarea class=\"answerArea field\" id=\"otherChallenges1-makeSense\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>"+
                    "<textarea class=\"answerArea field\" id=\"otherChallenges1-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>"+
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>"+
                    "<textarea class=\"answerArea field\" id=\"otherChallenges1-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");

            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

    var getTestedStrategy2 = testedStrategy2.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                if (doc.data().Strategy1.StrategyId == participantId)
                    strat2 = doc.data().Strategy1;
                else if (doc.data().Strategy2.StrategyId == participantId)
                    strat2 = doc.data().Strategy2;
                console.log(strat2);
                $("#challengingToWork").append("<br><br><h4>Tester2:</h4>" + "<p class=\"quote\">\"" + strat2.ChallengingToWork + "\"</p>" +
                    "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>" +
                    "<textarea class=\"answerArea field\" id=\"challengingToWork2-makeSense\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>" +
                    "<textarea class=\"answerArea field\" id=\"challengingToWork2-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>" +
                    "<textarea class=\"answerArea field\" id=\"challengingToWork2-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");

                $("#missing").append("<br><br><h4>Tester2:</h4>" + "<p class=\"quote\">\"" + strat2.Missing + "\"</p>" +
                    "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>" +
                    "<textarea class=\"answerArea field\" id=\"missing2-makeSense\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>" +
                    "<textarea class=\"answerArea field\" id=\"missing2-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>" +
                    "<textarea class=\"answerArea field\" id=\"missing2-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");

                $("#requiredInfo").append("<br><br><h4>Tester2:</h4>" + "<p class=\"quote\">\"" + strat2.RequiredInfo + "\"</p>" +
                    "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>" +
                    "<textarea class=\"answerArea field\" id=\"requiredInfo2-makeSense\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>" +
                    "<textarea class=\"answerArea field\" id=\"requiredInfo2-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>" +
                    "<textarea class=\"answerArea field\" id=\"requiredInfo2-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");

                $("#clarity").append("<br><br><h4>Tester2:</h4>" + "<p class=\"quote\">\"" + strat2.Clarity + "\"</p>" +
                    "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>" +
                    "<textarea class=\"answerArea field\" id=\"clarity2-makeSense\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>" +
                    "<textarea class=\"answerArea field\" id=\"clarity2-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>" +
                    "<textarea class=\"answerArea field\" id=\"clarity2-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");

                $("#otherChallenges").append("<br><br><h4>Tester2:</h4>" + "<p class=\"quote\">\"" + strat2.OtherChallenges + "\"</p>" +
                    "<br><p class=\"question\">Does this comment make sense to you? Why or why not?</p>" +
                    "<textarea class=\"answerArea field\" id=\"otherChallenges2-makeSense\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">What, if anything, makes this comment hard to address?</p>" +
                    "<textarea class=\"answerArea field\" id=\"otherChallenges2-hardAddressing\" placeholder=\"Please describe your answer here\"></textarea>" +
                    "<br><p class=\"question\">As you were writing the strategy, was there an aspect related to this comment of your strategy which you forgot to consider? What made this aspect hard to consider?</p>" +
                    "<textarea class=\"answerArea field\" id=\"otherChallenges2-aspectForgotten\" placeholder=\"Please describe your answer here\"></textarea>");
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

    var timeoutId,
        saveData = {};
// Function to save all fields that were changed.
    function saveRatings() {

        // Iterate over all properties on our saveData object and populate them with data from element.
        for (var key in saveData) {
            // Get reference to element we stored on saveData object.
            var $field = saveData[key];
            // Replace value on saveData object with the current element value.
            saveData[key] = $field.val();
            // Change color on text box to show it was saved.
            $field.css({
                backgroundColor: '#cfc'
            });
        }
        // Log saveData object to console, this is the object that would go to server as part of ajax call.
        console.log(saveData);
        saveData = {};
    }


});

async function submit(participantId) {
    let time = new Date();
    var hh = time.getHours();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    var timestamp = hh + ":" + mm + ":" + ss;
    let pId = window.location.search.substr(1).split("?")[0];;
    let firstTester = window.location.search.substr(1).split("?")[1];
    let secondTester = window.location.search.substr(2).split("?")[2];


    let firstTestedStrategy = {
        "ChallengingToWork":
            {
                "MakeSense": document.getElementById("challengingToWork1-makeSense").value,
                "HardAddressing": document.getElementById("challengingToWork1-hardAddressing").value,
                "AspectForgotten": document.getElementById("challengingToWork1-aspectForgotten").value
            },
        "Missing":
            {
                "MakeSense": document.getElementById("missing1-makeSense").value,
                "HardAddressing": document.getElementById("missing1-hardAddressing").value,
                "AspectForgotten": document.getElementById("missing1-aspectForgotten").value
            },
        "RequiredInfo":
            {
                "MakeSense": document.getElementById("requiredInfo1-makeSense").value,
                "HardAddressing": document.getElementById("requiredInfo1-hardAddressing").value,
                "AspectForgotten": document.getElementById("requiredInfo1-aspectForgotten").value
            },
        "Clarity":
            {
                "MakeSense": document.getElementById("clarity1-makeSense").value,
                "HardAddressing": document.getElementById("clarity1-hardAddressing").value,
                "AspectForgotten": document.getElementById("clarity1-aspectForgotten").value
            },

        "OtherChallenges":
            {
                "MakeSense": document.getElementById("otherChallenges1-makeSense").value,
                "HardAddressing": document.getElementById("otherChallenges1-hardAddressing").value,
                "AspectForgotten": document.getElementById("otherChallenges1-aspectForgotten").value
            },


    };
    let secondTestedStrategy = {
        "ChallengingToWork":
            {
                "MakeSense": document.getElementById("challengingToWork2-makeSense").value,
                "HardAddressing": document.getElementById("challengingToWork2-hardAddressing").value,
                "AspectForgotten": document.getElementById("challengingToWork2-aspectForgotten").value
            },
        "Missing":
            {
                "MakeSense": document.getElementById("missing2-makeSense").value,
                "HardAddressing": document.getElementById("missing2-hardAddressing").value,
                "AspectForgotten": document.getElementById("missing2-aspectForgotten").value
            },
        "RequiredInfo":
            {
                "MakeSense": document.getElementById("requiredInfo2-makeSense").value,
                "HardAddressing": document.getElementById("requiredInfo2-hardAddressing").value,
                "AspectForgotten": document.getElementById("requiredInfo2-aspectForgotten").value
            },
        "Clarity":
            {
                "MakeSense": document.getElementById("clarity2-makeSense").value,
                "HardAddressing": document.getElementById("clarity2-hardAddressing").value,
                "AspectForgotten": document.getElementById("clarity2-aspectForgotten").value
            },

        "OtherChallenges":
            {
                "MakeSense": document.getElementById("otherChallenges2-makeSense").value,
                "HardAddressing": document.getElementById("otherChallenges2-hardAddressing").value,
                "AspectForgotten": document.getElementById("otherChallenges2-aspectForgotten").value
            },


    };
    database.collection("StrategyRevisions").doc(pId).set({
        Time:timestamp,
        ParticipantId: pId,
        Strategy1:firstTestedStrategy,
        Strategy2: secondTestedStrategy,
        Tester1: firstTester,
        Tester2: secondTester


    }).catch(function (err) {
        alert("Something wrong while you are trying to submit your strategy. It means that your work is not saved i our database. In order to be compensated with your work, we need a record of your work. " +
            "Please send a pdf copy of this page to marab@gmu.edu. Thank you so much for participating in our study.");
        console.log("error saving", err);
    });
    alert("Congratulation.You successfully submit your work. Thank you so much for participating in our study.");
}

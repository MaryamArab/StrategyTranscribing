var strategyAttributes = ["strategyDescriptionDiv","preconditionsDescriptionDiv", "statementsDescriptionDiv",
    "actionsDescriptionDiv", "definitionDescriptionDiv", "conditionalsDescriptionDiv", "loopsDescriptionDiv", "returnDiv", "callDiv"];

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
let firstStrategyId = window.location.search.substr(1).split("?")[1];
let secondStrategyId = window.location.search.substr(1).split("?")[2];

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


    // window.editor = monaco.editor.create(document.getElementById('strategy_CssDebuggingTask'), {
    //     theme: 'myCoolTheme',
    //     value: "",
    //     language: 'robotoLanguage'
    // });
    // editor.setValue( firstStrategy.replace(/(?:\\[n]|[\n]+)+/g, "\n"));
});

//***************************End Monaco Editor**********************************


//*******************Retrieve Strategy *************************
var firstStrategy = "";
var firstTask="";
var secondStrategy = "";
var secondTask="";
let database = firebase.firestore();

var strat1 = database.collection("Strategies").doc(firstStrategyId);
var getDoc1 = strat1.get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            firstStrategy= doc.data().StrategyDefinition;
            firstTask = doc.data().Task;
            console.log('Document data:', doc.data().StrategyDefinition);
            console.log('Task   :', doc.data().Task);
            //Tasks checking for visibility of containers

            window.editor = monaco.editor.create(document.getElementById('strategy_ProfilerTask'), {
                theme: 'myCoolTheme',
                value: "",
                language: 'robotoLanguage'
            });
            editor.setValue( firstStrategy.replace(/(?:\\[n]|[\n]+)+/g, "\n"));


        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
//
// var strat2 = database.collection("Strategies").doc(secondStrategyId);
// var getDoc2 = strat2.get()
//     .then(doc => {
//         if (!doc.exists) {
//             console.log('No such document!');
//         } else {
//             secondStrategy= doc.data().StrategyDefinition;
//             secondTask = doc.data().Task;
//             console.log('Document data:', doc.data().StrategyDefinition);
//             console.log('Task :', doc.data().Task);
//
//

//
//
//
//
//
//             // if(firstTask == "CssDebuggingTask" ||secondTask == "CssDebuggingTask" )
//             //     document.getElementById("cssDebuggingTaskContainer").visible=true;
//             // else
//             //     $( "#cssDebuggingTaskContainer" ).hide();
//             //
//             //
//             // if(firstTask == "ProfilerTask" ||secondTask == "ProfilerTask" )
//             //     $("#profilerTaskContainer").show();
//             // else
//             //     $( "#profilerTaskContainer" ).hide();
//             // if(firstTask == "ErrorHandlingTask" || secondTask == "ErrorHandlingTask" )
//             //     $("#errorHandlingTaskContainer").show();
//             // else
//             //     $( "#errorHandlingTaskContainer" ).hide();
//         }
//     })
//     .catch(err => {
//         console.log('Error getting document', err);
//     });










$(document).ready(function () {
    var pc=0;

    function highlight(pc) {
        reset();
        if(pc==0)
            document.getElementById("panel").style.backgroundColor='white';
        else if(pc==1)
            document.getElementById("precondition").style.backgroundColor='rgba(43,214,131, 0.2)';

        else if(pc==2){
            document.getElementById("statement1").style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementById("statement2").style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementById("statement3").style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementById("statement4").style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementById("statement5").style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementById("statement6").style.backgroundColor='rgba(43,214,131, 0.2)';
            // document.getElementById("statement7").style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("definition")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("identifier1")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("assignment")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementById("statement8").style.backgroundColor='rgba(43,214,131, 0.2)';
            // document.getElementById("statement9").style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("call")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("subStrategy1")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementById("statement10").style.backgroundColor='rgba(43,214,131, 0.2)';

        }
        else if(pc==3){///action
            document.getElementsByClassName("action")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("action")[1].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("action")[2].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("action")[3].style.backgroundColor='rgba(43,214,131, 0.2)';
        }
        else if(pc==4){/// definition
            document.getElementsByClassName("definition")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("identifier1")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("assignment")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
        }
        else if(pc==5){//conditional
            document.getElementsByClassName("conditional")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("conditional")[1].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("conditional")[2].style.backgroundColor='rgba(43,214,131, 0.2)';
        }

        else if(pc==6){//loop
            document.getElementsByClassName("loop")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
        }

        else if(pc==7){
            document.getElementsByClassName("return")[0].style.backgroundColor='rgba(43,214,131, 0.2)';

        }
        else if(pc==8){
            document.getElementsByClassName("call")[0].style.backgroundColor='rgba(43,214,131, 0.2)';
            document.getElementsByClassName("subStrategy1")[0].style.backgroundColor='rgba(43,214,131, 0.2)';

        }



    }
    function reset(){
        document.getElementById("precondition").style.backgroundColor='white';
        document.getElementById("statement1").style.backgroundColor='white';
        document.getElementById("statement2").style.backgroundColor='white';
        document.getElementById("statement3").style.backgroundColor='white';
        document.getElementById("statement4").style.backgroundColor='white';
        document.getElementById("statement5").style.backgroundColor='white';
        document.getElementById("statement6").style.backgroundColor='white';
        document.getElementById("statement7").style.backgroundColor='white';
        document.getElementById("statement8").style.backgroundColor='white';
        document.getElementById("statement9").style.backgroundColor='white';
        document.getElementById("statement10").style.backgroundColor='white';
        document.getElementsByClassName("conditional")[0].style.backgroundColor='white';
        document.getElementsByClassName("conditional")[1].style.backgroundColor='white';
        document.getElementsByClassName("conditional")[2].style.backgroundColor='white';
        document.getElementsByClassName("action")[0].style.backgroundColor='whitewhite';
        document.getElementsByClassName("action")[1].style.backgroundColor='white';
        document.getElementsByClassName("action")[2].style.backgroundColor='white';
        document.getElementsByClassName("action")[3].style.backgroundColor='white';
        document.getElementsByClassName("loop")[0].style.backgroundColor='white';
        document.getElementsByClassName("definition")[0].style.backgroundColor='white';
        document.getElementsByClassName("identifier1")[0].style.backgroundColor='white';
        document.getElementsByClassName("assignment")[0].style.backgroundColor='white';
        document.getElementsByClassName("return")[0].style.backgroundColor='white';
        document.getElementsByClassName("call")[0].style.backgroundColor='white';
        document.getElementsByClassName("subStrategy1")[0].style.backgroundColor='white';

    }
    nextFeature= function(){
        if(pc<strategyAttributes.length-1){
            document.getElementById("prevBtn").disabled = false;
            document.getElementById("nextBtn").disabled = false;
            var current = document.getElementById(strategyAttributes[pc]);
            pc++;
            if(pc==strategyAttributes.length-1){
                document.getElementById("nextBtn").disabled = true;
            }
            var next = document.getElementById(strategyAttributes[pc]);
            console.log(pc);
            if (current.style.display === "block") {
                current.style.display = "none";
                next.style.display = "block";
            }
            highlight(pc);
        }
    }
    previousFeature= function(){
    if(pc>0){
        document.getElementById("prevBtn").disabled = false;
        document.getElementById("nextBtn").disabled = false;

        var current = document.getElementById(strategyAttributes[pc]);
        pc--;
        if(pc==0){
            document.getElementById("prevBtn").disabled = true;
            document.getElementById("nextBtn").disabled = false;
        }

        var prev = document.getElementById(strategyAttributes[pc]);
        console.log(pc);
        if (current.style.display === "block") {
            current.style.display = "none";
            prev.style.display = "block";
        }
        highlight(pc);
    }
}



});

async function retrieve(pId) {
    let database = firebase.firestore();

    var x = database.collection("Strategies").doc(participantId);
    var getDoc = x.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data().StrategyDefinition);
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });





}
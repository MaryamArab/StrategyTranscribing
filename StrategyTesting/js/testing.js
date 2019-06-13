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

var firstStrategy = "";
var firstTask="";
var secondStrategy = "";
var secondTask="";
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

    $('.field').keypress(function (e) {

        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#cde4ec',
            border: 'none'
        });


        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    var strat1 = database.collection("Strategies").doc(firstStrategyId);
    var getDoc1 = strat1.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                firstStrategy= doc.data().StrategyDefinition;
                firstTask = doc.data().Task;
                console.log('Task   :', doc.data().Task);

                var strat2 = database.collection("Strategies").doc(secondStrategyId);
                var getDoc2 = strat2.get()
                    .then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            secondStrategy= doc.data().StrategyDefinition;
                            secondTask = doc.data().Task;
                            console.log('SecondTask :', doc.data().Task);
                            if(firstTask == "CssDebuggingTask" ||secondTask == "CssDebuggingTask" ){
                                $( "#cssDebuggingTaskContainer" ).show();
                                window.editor = monaco.editor.create(document.getElementById('strategy_CssDebuggingTask'), {
                                    theme: 'myCoolTheme',
                                    value: "",
                                    language: 'robotoLanguage'
                                });
                                if(firstTask == "CssDebuggingTask")
                                    editor.setValue( firstStrategy.replace(/(?:\\[n]|[\n]+)+/g, "\n"));
                                else
                                    editor.setValue( secondStrategy.replace(/(?:\\[n]|[\n]+)+/g, "\n"));

                            }
                            else
                                $( "#cssDebuggingTaskContainer" ).hide();

                            if(firstTask == "ProfilerTask" ||secondTask == "ProfilerTask" ){
                                $("#profilerTaskContainer").show();
                                window.editor = monaco.editor.create(document.getElementById('strategy_ProfilerTask'), {
                                    theme: 'myCoolTheme',
                                    value: "",
                                    language: 'robotoLanguage'
                                });
                                if(firstTask == "ProfilerTask")
                                    editor.setValue( firstStrategy.replace(/(?:\\[n]|[\n]+)+/g, "\n"));
                                else
                                    editor.setValue( secondStrategy.replace(/(?:\\[n]|[\n]+)+/g, "\n"));
                            }
                            else
                                $( "#profilerTaskContainer" ).hide();

                            if(firstTask == "ErrorHandlingTask" || secondTask == "ErrorHandlingTask" ){
                                $("#errorHandlingTaskContainer").show();
                                window.editor = monaco.editor.create(document.getElementById('strategy_ErrorHandlingTask'), {
                                    theme: 'myCoolTheme',
                                    value: "",
                                    language: 'robotoLanguage'
                                });
                                if(firstTask == "ErrorHandlingTask")
                                    editor.setValue( firstStrategy.replace(/(?:\\[n]|[\n]+)+/g, "\n"));
                                else
                                    editor.setValue( secondStrategy.replace(/(?:\\[n]|[\n]+)+/g, "\n"));
                            }
                            else
                                $( "#errorHandlingTaskContainer" ).hide();
                        }
                    })
                    .catch(err => {
                        console.log('Error getting document', err);
                    });
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
});


async function submit(participantId){
    let time = new Date();
    var hh = time.getHours();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    var timestamp = hh + ":" + mm + ":" + ss;
    let pId =window.location.search.substr(1).split("?")[0];


    var profilerChallengesToWork = document.getElementById("challengingToWork_Profiler").value;
    var profilerMissing = document.getElementById("missing_Profiler").value;
    var profilerRequiredInfo = document.getElementById("requiredInfo_Profiler").value;
    var profilerClarity = document.getElementById("clarity_Profiler").value;
    var profilerOtherChallenges = document.getElementById("otherChallenges_Profiler").value;

    var cssDebuggingChallengesToWork = document.getElementById("challengingToWork_CssDebugging").value;
    var cssDebuggingMissing = document.getElementById("missing_CssDebugging").value;
    var cssDebuggingRequiredInfo = document.getElementById("requiredInfo_CssDebugging").value;
    var cssDebuggingClarity = document.getElementById("clarity_CssDebugging").value;
    var cssDebuggingOtherChallenges = document.getElementById("otherChallenges_CssDebugging").value;

    var errorHandlingChallengesToWork = document.getElementById("challengingToWork_ErrorHandling").value;
    var errorHandlingMissing = document.getElementById("missing_ErrorHandling").value;
    var errorHandlingRequiredInfo = document.getElementById("requiredInfo_ErrorHandling").value;
    var errorHandlingClarity = document.getElementById("clarity_ErrorHandling").value;
    var errorHandlingOtherChallenges = document.getElementById("otherChallenges_ErrorHandling").value;

    //**********************Check for Empty inputs***********************

    if(firstTask =="ProfilerTask" || secondTask == "ProfilerTask")
    {
        if(profilerChallengesToWork ==""){
            document.getElementById("challengingToWork_Profiler").style.border="2px solid red";
            alert("Please describe in a couple of sentences if the strategy is/is not challenging to work with.\"");
            return;
        }

        if(profilerMissing ==""){
            document.getElementById("missing_Profiler").style.border="2px solid red";
            alert("Please describe in a couple of sentences if the strategy is or is'nt missing any step.\"");
            return;
        }
        if(profilerRequiredInfo ==""){
            document.getElementById("requiredInfo_Profiler").style.border="2px solid red";
            alert("Please fill out the required fields. \"");
            return;
        }
        if(profilerClarity ==""){
            document.getElementById("clarity_Profiler").style.border="2px solid red";
            alert("Please fill out the required fields. \"");
            return;
        }
        if(profilerOtherChallenges ==""){
            document.getElementById("otherChallenges_Profiler").style.border="2px solid red";
            alert("Please fill out the required fields. \"");
            return;
        }
    }
    if(firstTask =="CssDebuggingTask" || secondTask == "CssDebuggingTask")
    {
        if(cssDebuggingChallengesToWork ==""){
            document.getElementById("challengingToWork_CssDebugging").style.border="2px solid red";
            alert("Please describe in a couple of sentences if the strategy is/is not challenging to work with.\"");
            return;
        }

        if(cssDebuggingMissing ==""){
            document.getElementById("missing_CssDebugging").style.border="2px solid red";
            alert("Please describe in a couple of sentences if the strategy is or is'nt missing any step.\"");
            return;
        }
        if(cssDebuggingRequiredInfo ==""){
            document.getElementById("requiredInfo_CssDebugging").style.border="2px solid red";
            alert("Please fill out the required fields. \"");
            return;
        }
        if(cssDebuggingClarity ==""){
            document.getElementById("clarity_CssDebugging").style.border="2px solid red";
            alert("Please fill out the required fields. \"");
            return;
        }
        if(cssDebuggingOtherChallenges ==""){
            document.getElementById("otherChallenges_CssDebugging").style.border="2px solid red";
            alert("Please fill out the required fields. \"");
            return;
        }

    }
    if(firstTask =="ErrorHandlingTask" || secondTask == "ErrorHandlingTask")
    {
        if(errorHandlingChallengesToWork ==""){
            document.getElementById("challengingToWork_ErrorHandling").style.border="2px solid red";
            alert("Please describe in a couple of sentences if the strategy is/is not challenging to work with.\"");
            return;
        }

        if(errorHandlingMissing ==""){
            document.getElementById("missing_ErrorHandling").style.border="2px solid red";
            alert("Please describe in a couple of sentences if the strategy is or is'nt missing any step.\"");
            return;
        }
        if(errorHandlingRequiredInfo ==""){
            document.getElementById("requiredInfo_ErrorHandling").style.border="2px solid red";
            alert("Please fill out the required fields. \"");
            return;
        }
        if(errorHandlingClarity ==""){
            document.getElementById("clarity_ErrorHandling").style.border="2px solid red";
            alert("Please fill out the required fields. \"");
            return;
        }
        if(errorHandlingOtherChallenges ==""){
            document.getElementById("otherChallenges_ErrorHandling").style.border="2px solid red";
            alert("Please fill out the required fields. \"");
            return;
        }
    }
    if(firstTask == "ProfilerTask"){


        var firstStrategyChallenges={
            "StrategyId": firstStrategyId,
            "ChallengingToWork":   document.getElementById("challengingToWork_Profiler").value,
            "Missing":           document.getElementById("missing_Profiler").value,
            "RequiredInfo":      document.getElementById("requiredInfo_Profiler").value,
            "Clarity":           document.getElementById("clarity_Profiler").value,
            "OtherChallenges":   document.getElementById("otherChallenges_Profiler").value,
        };
    }
    else  if(secondTask == "ProfilerTask"){
        var secondStrategyChallenges={
            "StrategyId": secondStrategyId,
            "ChallengingToWork": document.getElementById("challengingToWork_Profiler").value,
            "Missing":           document.getElementById("missing_Profiler").value,
            "RequiredInfo":      document.getElementById("requiredInfo_Profiler").value,
            "Clarity":           document.getElementById("clarity_Profiler").value,
            "OtherChallenges":   document.getElementById("otherChallenges_Profiler").value,

        };
    }
    if(firstTask == "CssDebuggingTask"){
        var firstStrategyChallenges= {
            "StrategyId" : firstStrategyId,
            "ChallengingToWork" : document.getElementById("challengingToWork_CssDebugging").value,
            "Missing" : document.getElementById("missing_CssDebugging").value,
            "RequiredInfo" : document.getElementById("requiredInfo_CssDebugging").value,
            "Clarity" : document.getElementById("clarity_CssDebugging").value,
            "OtherChallenges" : document.getElementById("otherChallenges_CssDebugging").value
        };
    }
    else  if(secondTask == "CssDebuggingTask"){
        var secondStrategyChallenges={
            "StrategyId": secondStrategyId,
            "ChallengingToWork": document.getElementById("challengingToWork_CssDebugging").value,
            "Missing":           document.getElementById("missing_CssDebugging").value,
            "RequiredInfo":      document.getElementById("requiredInfo_CssDebugging").value,
            "Clarity":           document.getElementById("clarity_CssDebugging").value,
            "OtherChallenges":   document.getElementById("otherChallenges_CssDebugging").value,
        }

    }
    if(firstTask == "ErrorHandlingTask"){
        var firstStrategyChallenges={
            "StrategyId": firstStrategyId,
            "ChallengingToWork": document.getElementById("challengingToWork_ErrorHandling").value,
            "Missing":           document.getElementById("missing_ErrorHandling").value,
            "RequiredInfo":      document.getElementById("requiredInfo_ErrorHandling").value,
            "Clarity":           document.getElementById("clarity_ErrorHandling").value,
            "OtherChallenges":   document.getElementById("otherChallenges_ErrorHandling").value,
        };

    }
    else  if(secondTask == "ErrorHandlingTask"){
        var secondStrategyChallenges={
            "StrategyId": secondStrategyId,
            "ChallengingToWork": document.getElementById("challengingToWork_ErrorHandling").value,
            "Missing":           document.getElementById("missing_ErrorHandling").value,
            "RequiredInfo":      document.getElementById("requiredInfo_ErrorHandling").value,
            "Clarity":           document.getElementById("clarity_ErrorHandling").value,
            "OtherChallenges":   document.getElementById("otherChallenges_ErrorHandling").value,
        }
    }

    //**************************BACKGROUND SURVEY*************************
    let workExperiencePeriod = document.getElementById("workExpYear").value+" years and " + document.getElementById("workExpMonth").value + " months";
    let softwareDevelopmentExperience = document.getElementById("softDevExp").value;
    let biggestSoftware = document.getElementById("biggestSoftware").value;

    let webExperiencePeriod = document.getElementById("webExpYear").value+" years and " + document.getElementById("webExpMonth").value + " months";
    let webDevelopmentExperience = document.getElementById("webDevExp").value;
    let biggestWebApplication= document.getElementById("biggestWebApplication").value;

    if(document.getElementById("workExpYear").value ===""  ) {
        document.getElementById("workExpYear").style.border="2px solid red";
        alert("Please fill out industrial software development experience.");
        return;
    }
    if(softwareDevelopmentExperience ===""){
        document.getElementById("softDevExp").style.border="2px solid red";
        alert("Please fill out Number of Software applications you have developed.");
        return;
    }
    if(biggestSoftware ===""){
        document.getElementById("biggestSoftware").style.border="2px solid red";
        alert("Please describe what is the biggest software applications you have developed.");
        return;
    }
    if(document.getElementById("webExpYear").value==="" ){
        document.getElementById("webExpYear").style.border="2px solid red";
        alert("Please fill out years of experience you have in building web applications");
        return;
    }
    if(webDevelopmentExperience===""){
        document.getElementById("webDevExp").style.border="2px solid red";
        alert("Please fill the number of web-based applications have you implemented.");
        return;
    }
    if(biggestWebApplication ===""){
        document.getElementById("biggestWebApplication").style.border="2px solid red";
        alert("Please describe what is the biggest web applications you have developed.");
        return;
    }

    let workExperiences={
        "workExperiencePeriod":workExperiencePeriod,
        "softwareDevelopmentExperience":softwareDevelopmentExperience,
        "biggestSoftware":biggestSoftware,
        "webExperiencePeriod":webExperiencePeriod,
        "webDevelopmentExperience":webDevelopmentExperience,
        "biggestWebApplication":biggestWebApplication
    };
    //********************END COLLECTING BACKGROUND SURVEY*************************

    database.collection("TestedStrategies").doc(pId).set({
        Time:timestamp,
        ParticipantId: pId,
        Strategy1:firstStrategyChallenges,
        Strategy2: secondStrategyChallenges,
        Task1: firstTask,
        Task2: secondTask,
        WorkExperiences: workExperiences,

    }).catch(function (err) {
        alert("Something wrong while you are trying to submit your strategy. It means that your work is not saved i our database. In order to be compensated with your work, we need a record of your work. " +
            "Please send a pdf copy of this page to marab@gmu.edu. Thank you so much for participating in our study.");
        console.log("error saving", err);
    });
    alert("Congratulation.You successfully submit your work. Thank you so much for participating in our study.");
}
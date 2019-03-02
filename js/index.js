var config = {
    apiKey: "AIzaSyAkfQNjBaedX7EG08Wov0YEQNY82CRSEbs",
    authDomain: "expertstrategies-4f821.firebaseapp.com",
    databaseURL: "https://expertstrategies-4f821.firebaseio.com",
    projectId: "expertstrategies-4f821",
    storageBucket: "expertstrategies-4f821.appspot.com",
    messagingSenderId: "255891035176"
};
firebase.initializeApp(config);

require.config({ paths: { 'vs': 'monaco/node_modules/monaco-editor/min/vs' }});

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

        window.editor = monaco.editor.create(document.getElementById('strategyDefinition'), {
        theme: 'myCoolTheme',
        value: "",
        language: 'robotoLanguage'
    });
});

$(document).ready(function () {
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

// Handle keypress event.
    $('.field').keypress(function (e) {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: 'lightgoldenrodyellow'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });


    $('#toolsRequirements').keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: 'lightgoldenrodyellow'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });
    $('#codebaseRequirements').keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: 'lightgoldenrodyellow'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    $('#knowledgeRequirements').keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: 'lightgoldenrodyellow'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });



    $('#difficulties').keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: 'lightgoldenrodyellow'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });
    $('#languages').keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: 'lightgoldenrodyellow'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });
    $('#domains').keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: 'lightgoldenrodyellow'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });
    $('#studyField').keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: 'lightgoldenrodyellow'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });
    $('#workExp').keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: 'lightgoldenrodyellow'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });
});

async function addNewStrategy() {
    let time = new Date();
    var hh = time.getHours();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    var timestamp = hh + ":" + mm + ":" + ss;
    // let pname = "Test";
    // let pId ="Test";
    // let workExperience ="Test";
    // let reactExperience = "Test";
    // let domains= "Test";
    // let studyField= "Test";
    // let degree = "Test";
    // var task = document.getElementById("mySelect").value;
    //
    // let strategyDefinition = "Test\\n    Test\\n        Test\\n    Test\\n        Test\\n    Test\\nTest";
    // let toolsRequirements = "Test";
    // let codebaseRequirements = "Test";
    // let knowledgeRequirements = "Test";
    // let difficulties = "Test";
    // let neededSupport = "Test";

    let pname = document.getElementById("pname").value;
    let pId =document.getElementById("pId").value;
    let workExperience = document.getElementById("workExp").value;
    let reactExperience = document.getElementById("reactExp").value;
    let domains= document.getElementById("domains").value;
    let studyField= document.getElementById("studyField").value;
    let degree = document.getElementById("degree").value;
    var task = document.getElementById("mySelect").value;

    let strategyDefinition = window.editor.getValue().replace(/[\n\r\t]/g,"\\n");
    let toolsRequirements = document.getElementById("toolsRequirements").value;
    let codebaseRequirements = document.getElementById("codebaseRequirements").value;
    let knowledgeRequirements = document.getElementById("knowledgeRequirements").value;
    let difficulties = document.getElementById("difficulties").value;
    let neededSupport = document.getElementById("neededSupport").value;

    console.log("Strategy definition:   " + strategyDefinition);

    if( pname===""|| pId ==="" || workExperience ==="" ||reactExperience ==="" ||domains===""  || studyField ===""  || degree ==="" || task==="" ||strategyDefinition===""
        || toolsRequirements==="" || codebaseRequirements==="" || knowledgeRequirements==="" || difficulties === "" || neededSupport == "")
    {
        alert("Please fill out all the required fields");
        return;
    }

    let database = firebase.firestore();

    database.collection("Test").doc(pId).set({
        Time:timestamp,

        ParticipantName: pname,
        ParticipationId: pId,
        Experience: workExperience,
        ReactExperience: reactExperience,
        Domains:domains,
        StudyField:studyField,
        Degree: degree,
        Task: task,
        StrategyDefinition:strategyDefinition,
        ToolsRequirements:toolsRequirements,
        CodebaseRequirements:codebaseRequirements,
        KnowledgeRequirements: knowledgeRequirements,
        Difficulties: difficulties,
        NeededSupport : neededSupport

    }).catch(function (err) {
        console.log("error saving", err);
    });
    alert("Congratulation.You successfully submit your draft of strategy. Thank you so much for participating in our study.");

    var taskName = document.getElementById("mySelect").value;
    localStorage.setItem("pId",pId);
    localStorage.setItem("taskName", taskName);
    // var writtenStrategy = window.editor.getValue().replace(/[\n\r\t]/g,"\\n");
    var writtenStrategy =strategyDefinition;
    localStorage.setItem("strategyStorage",writtenStrategy);



    setTimeout(function() {
        window.location.href = "./strategyRevision.html";
    }, 1000);

}

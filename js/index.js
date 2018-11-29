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
    var $defect = $('#defect');
    var $toolsRequirements = $('#toolsRequirements');
    var $codebaseRequirements = $('#codebaseRequirements');
    var $knowledgeRequirements = $('#knowledgeRequirements');
    var $clarity = $('#clarity');
    var $correction = $('#correction');
    var $completeness = $('#completeness');
    var $understandability = $('#understandability');
    var $partnerStratChallenges = $('#partnerStratChallenges');
    var $stratWritingChallenges = $('#stratWritingChallenges');




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
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    $defect.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });
    $toolsRequirements.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });
    $codebaseRequirements.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    $knowledgeRequirements.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    $clarity.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    $correction.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    $completeness.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    $understandability.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    $partnerStratChallenges.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });

    $stratWritingChallenges.keypress(function () {
        var $currentField = $(this);

        $currentField.css({
            backgroundColor: '#fcc'
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
    let pname = document.getElementById("pname").value;
    let pId =document.getElementById("pId").value;
    let languages= document.getElementById("languages").value;
    let domains= document.getElementById("domains").value;
    let studyField= document.getElementById("studyField").value;
    let degree = document.getElementById("degree").value;
    let workExperience = document.getElementById("workExp").value;
    let version = document.querySelector('input[name = "version"]:checked').value;
    let javaFramework = document.querySelector('input[name = "javaFramework"]:checked').value;
    let defect= document.getElementById("defect").value;
    let strategyDefenition = window.editor.getValue();
    let toolsRequirements = document.getElementById("toolsRequirements").value;
    let codebaseRequirements = document.getElementById("codebaseRequirements").value;
    let knowledgeRequirements = document.getElementById("knowledgeRequirements").value;
    let clarity = document.getElementById("clarity").value;
    let correction = document.getElementById("correction").value;
    let completeness = document.getElementById("completeness").value;
    let understandability = document.getElementById("understandability").value;
    let partnerStratChallenges = document.getElementById("partnerStratChallenges").value;
    let stratWritingChallenges = document.getElementById("stratWritingChallenges").value;

    if(workExperience ==="" || defect==="" ||strategyDefenition==="" || toolsRequirements==="" || codebaseRequirements==="" || knowledgeRequirements===""
    || degree ==="" || studyField ==="" || languages ==="" ||domains==="" ){
        alert("Please fill out all the required fields");
        return;
    }

    if(clarity === "" || correction === "" || completeness ==="" || understandability === "" || partnerStratChallenges ==="" || stratWritingChallenges ==="")
    {
        alert("Please fill out all the post study questions.");
        return;
    }
    if(javaFramework ==="other" )
        javaFramework = document.getElementById("otherFrameworks").value;

    let database = firebase.firestore();

    database.collection("Strategies").doc(pId).set({
        Time:timestamp,
        ParticipantName: pname,
        ParticipationId: pId,
        Languages:languages,
        Domains:domains,
        CollegeField:studyField,
        HighestDegree: degree,
        Experience: workExperience,
        Version:version,
        JavaFramework:javaFramework,
        Defect:defect,
        StrategyDefenition:strategyDefenition,
        ToolsRequirements:toolsRequirements,
        CodebaseRequirements:codebaseRequirements,
        KnowledgeRequirements: knowledgeRequirements,
        Clarity:clarity,
        Correction:correction,
        Completeness:completeness,
        Understandability : understandability,
        PartnerStrategyChallenges:partnerStratChallenges,
        StrategyWritingChallenges: stratWritingChallenges

    }).catch(function (err) {
        console.log("error saving", err);
    });
    alert("Congratulation.You successfully submit your draft of strategy. Thank you so much for participating in our study.")

}

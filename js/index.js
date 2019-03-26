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
    window.editor.model.onDidChangeContent((event) => {
        document.getElementById("submitBtn").disabled = false;
    });
});

var add;
var remove;
$(document).ready(function () {
    document.getElementById("submitBtn").disabled = true;




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
            backgroundColor: '#cde4ec'
        });

        // Set property on saveData object and set it equal to the current jQuery element.
        saveData[$currentField.attr('id')] = $currentField;

        // If a timer was started, clear it because they are still pressing keys like a monkey.
        if (timeoutId) clearTimeout(timeoutId);

        // Start a timer that will fire save when finished.
        timeoutId = setTimeout(saveRatings, 750);
    });
    add = function () {
        var node = document.createElement("DIV");
        node.id = "difficulty";
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "chkboxName";
        checkbox.value = "value";
        checkbox.id = "chkbx";

        var label = document.createElement('label')
        label.htmlFor = "chkbx";
        label.className = "difficultyId";
        label.appendChild(document.createTextNode(document.getElementById("difficultyTxt").value));

        node.appendChild(checkbox);
        node.appendChild(label);
        difficultiesContainer.appendChild(node);

        alert("Great Job. Do you have any other difficulties? If you have, please add another one.");
        clearContents(document.getElementById("difficultyTxt"));
    }
    remove= function() {
        var checkboxes = $("div input:checkbox").parent();
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].childNodes[0] != null && checkboxes[i].childNodes[0].checked) {
                var node =checkboxes[i].childNodes[0].parentNode;
                console.log(checkboxes[i].childNodes[0].parentNode);
                difficultiesContainer.removeChild(node);
            }
        }
    }
});
function clearContents(element) {
    element.value = '';
}
async function addNewStrategy() {
    let time = new Date();
    var hh = time.getHours();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    var timestamp = hh + ":" + mm + ":" + ss;
    let pId =participantId;
    let workExperiencePeriod = document.getElementById("workExpYear").value+" years and " + document.getElementById("workExpMonth").value + " months";
    let softwareDevelopmentExperience = document.getElementById("softDevExp").value;

    let webExperiencePeriod = document.getElementById("webExpYear").value+" years and " + document.getElementById("webExpMonth").value + " months";;
    let webDevelopmentExperience = document.getElementById("webDevExp").value;

    let reactExperiencePeriod = document.getElementById("reactExpYear").value+" years and " + document.getElementById("reactExpMonth").value + " months";;
    let reactDevelopmentExperience = document.getElementById("reactDevExp").value;
    var task = taskAssigned;

    let strategyDefinition = window.editor.getValue().replace(/[\n\r\t]/g,"\\n");
    let difficultiesElements=  document.getElementsByClassName("difficultyId");
    var difficulties = [];
    for (var i = 0; i < difficultiesElements.length; i++) {
        difficulties.push(difficultiesElements[i].innerHTML);
    }

    console.log("Strategy definition:   " + strategyDefinition);

    if(  workExperiencePeriod ==="" || softwareDevelopmentExperience ===""|| webExperiencePeriod ==="" || webDevelopmentExperience===""  ||reactExperiencePeriod ==="" || reactDevelopmentExperience===""||strategyDefinition==="" || difficulties === "")
    {
        alert("Please fill out all the required fields");
        return;
    }
    if (strategyDefinition.length<20) {
        alert("Please write down a detailed strategy");
        return;
    }

    let database = firebase.firestore();

    database.collection("Strategies").doc(pId).set({
        Time:timestamp,

        DevelopmentExperiencePeriod: workExperiencePeriod,
        WebExperiencePeriod: webExperiencePeriod,
        // JavaScriptExperiencePeriod: javascriptExperiencePeriod,
        ReactExperiencePeriod: reactExperiencePeriod,
        SoftwareDevelopmentExperience : softwareDevelopmentExperience,
        WebDevelopmentExperience : webDevelopmentExperience,
        // JavaScriptDevelopmentExperience: javascriptDevelopmentExperience,
        ReactDevelopmentExperience : reactDevelopmentExperience,
        StrategyDefinition:strategyDefinition,
        Difficulties: difficulties,
        Task:task

    }).catch(function (err) {
        console.log("error saving", err);
    });
    alert("Congratulation.You successfully submit your draft of strategy. Thank you so much for participating in our study.");

    //var taskName = document.getElementById("mySelect").value;
    localStorage.setItem("pId",pId);
    //localStorage.setItem("taskName", taskName);
    // var writtenStrategy = window.editor.getValue().replace(/[\n\r\t]/g,"\\n");
    var writtenStrategy =strategyDefinition;
    localStorage.setItem("strategyStorage",writtenStrategy);



    setTimeout(function() {
        window.location.href = "./strategyRevision.html";
    }, 1000);

}

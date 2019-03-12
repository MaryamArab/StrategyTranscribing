

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


    window.editor = monaco.editor.create(document.getElementById('strategy'), {
        theme: 'myCoolTheme',
        value: "",
        language: 'robotoLanguage'
    });
    editor.setValue( localStorage.getItem("strategyStorage").replace(/(?:\\[n]|[\n]+)+/g, "\n"));
});


var add;
var remove;
$(document).ready(function () {
    //todo add a text box for strategy name and use int here
    document.getElementById("strategyTitle").innerHTML=localStorage.getItem("taskName");


    add = function ()
    {
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
        container.appendChild(node);

        alert("Great Job. Do you have any other difficulties? If you have, please add another one.");
        clearContents(document.getElementById("difficultyTxt"));
    }
    remove= function() {
        var checkboxes = $("div input:checkbox").parent();
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].childNodes[0] != null && checkboxes[i].childNodes[0].checked) {
                var node =checkboxes[i].childNodes[0].parentNode;
               console.log(checkboxes[i].childNodes[0].parentNode);
                container.removeChild(node);
            }
        }
    }





});
function clearContents(element) {
    element.value = '';
}

async function submitSecondDraft() {
    let time = new Date();
    var hh = time.getHours();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    var timestamp = hh + ":" + mm + ":" + ss;
    let pId =localStorage.getItem("pId");
    let strategyDefinition = window.editor.getValue().replace(/[\n\r\t]/g,"\\n");
    let difficultiesElements=  document.getElementsByClassName("difficultyId");
    var difficulties = [];
    for (var i = 0; i < difficultiesElements.length; i++) {
        difficulties.push(difficultiesElements[i].innerHTML);
    }

    console.log("Strategy definition:   " + strategyDefinition);

    if( difficulties === null || difficulties == ""|| difficulties== undefined)
    {
        alert("Please fill out all the required fields");
        return;
    }

    let database = firebase.firestore();

    database.collection("TestRevision").doc(pId).set({
        Time:timestamp,
        ParticipationId: pId,
        StrategyDefinition:strategyDefinition,
        Difficulties:difficulties,


    }).catch(function (err) {
        console.log("error saving", err);
    });
    alert("Congratulation.You successfully submit your second draft of strategy. Thank you so much for participating in our study.");

}


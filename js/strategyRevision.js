

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
$(document).ready(function () {

    document.getElementById("strategyTitle").innerHTML=localStorage.getItem("taskName");


    add = function ()
    {
        var node = document.createElement("DIV");
         node.id = "difficulty";
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = "value";
        checkbox.id = "chkbx";

        var label = document.createElement('label')
        label.htmlFor = "chkbx";
        label.appendChild(document.createTextNode(document.getElementById("difficultyTxt").value));

        node.appendChild(checkbox);
        node.appendChild(label);
        container.appendChild(node);
        
        alert("Great Job. Do you have any other difficulties? If you have, please add another one.");

    }



});


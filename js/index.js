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
var nextFeature;
var previousFeature;

$(document).ready(function () {
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("prevBtn").disabled = true;

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

    add = function () {
        var node = document.createElement("DIV");
        //node.id = "difficulty";
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "chkboxName";
        checkbox.value = "value";
        checkbox.id = "chkbx";

        var label = document.createElement('label')
        label.htmlFor = "chkbx";
        label.className = "difficultyId";
        label.style.width = "95%";
        label.style.margin= "1%";
        label.appendChild(document.createTextNode(document.getElementById("difficultyTxt").value));

        node.appendChild(checkbox);
        node.appendChild(label);
        if(document.getElementById("difficultyTxt").value==""){
            alert("Please describe your challenges in the text box below and then press the add button.");
            return;
        }
        difficultiesContainer.appendChild(node);
        clearContents(document.getElementById("difficultyTxt"));
    }
    // "strategyDescriptionDiv","preconditionsDescriptionDiv", "statementsDescriptionDiv",
    //     "actionsDescriptionDiv", "conditionalsDescriptionDiv", "loopsDescriptionDiv", "definitionDescriptionDiv", "returnDiv", "callDiv"];
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

    let webExperiencePeriod = document.getElementById("webExpYear").value+" years and " + document.getElementById("webExpMonth").value + " months";
    let webDevelopmentExperience = document.getElementById("webDevExp").value;

    let reactExperiencePeriod = document.getElementById("reactExpYear").value+" years and " + document.getElementById("reactExpMonth").value + " months";
    let reactDevelopmentExperience = document.getElementById("reactDevExp").value;
    var task = taskAssigned;

    let strategyDefinition = window.editor.getValue().replace(/[\n\r\t]/g,"\\n");
    let difficultiesElements=  document.getElementsByClassName("difficultyId");
    var difficulties = [];
    for (var i = 0; i < difficultiesElements.length; i++) {
        difficulties.push(difficultiesElements[i].innerHTML);
    }

    console.log("Strategy definition:   " + strategyDefinition);

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
    if(document.getElementById("reactExpYear").value ===""){
        document.getElementById("reactExpYear").style.border="2px solid red";
        alert("Please fill out years of professional experience you have in React");
        return;
    }
    if(reactDevelopmentExperience===""){
        document.getElementById("reactDevExp").style.border="2px solid red";
        alert("Please fill out the number of React-based applications you have implemented.");
        return;
    }

    if(difficulties === ""){
        alert("Please describe challenges you faced during articulation.");
        return;
    }
    if (strategyDefinition.length<20||strategyDefinition==="") {
        alert("Please write down a detailed strategy");
        return;
    }
    if(document.getElementById("difficultiesContainer").childNodes.length<3){
        alert("Please write at least 3 difficulties you face during articulation.")
        return;
    }

    let database = firebase.firestore();

    database.collection("Strategies").doc(pId).set({
        Time:timestamp,

        SoftwareDevelopmentExperiencePeriod: workExperiencePeriod,
        WebExperiencePeriod: webExperiencePeriod,
        ReactExperiencePeriod: reactExperiencePeriod,
        ImplementedSoftware : softwareDevelopmentExperience,
        ImplementedWebApplications : webDevelopmentExperience,
        ImplementedReactApplications : reactDevelopmentExperience,
        StrategyDefinition:strategyDefinition,
        Difficulties: difficulties,
        Task:task

    }).catch(function (err) {
        console.log("error saving", err);
    });
    alert("Congratulation.You successfully submit your draft of strategy. Thank you so much for participating in our study.");

    //var taskName = document.getElementById("mySelect").value;
    // localStorage.setItem("pId",pId);

    // var writtenStrategy =strategyDefinition;
    // localStorage.setItem("strategyStorage",writtenStrategy);



    // setTimeout(function() {
    //     window.location.href = "./strategyRevision.html";
    // }, 1000);

}

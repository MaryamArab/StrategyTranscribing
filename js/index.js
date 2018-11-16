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

async function addNewStrategy() {
    let time = new Date();
    var hh = time.getHours();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    var timestamp = hh + ":" + mm + ":" + ss;
    let pId =document.getElementById("pId").value;
    let languages= document.getElementById("languages").value;
    let platforms= document.getElementById("platforms").value;
    let domains= document.getElementById("domains").value;
    let studyField= document.getElementById("studyField").value;
    let degree = document.getElementById("degree").value;
    let workStartDate = document.getElementById("workStartDate").value;
    let workExperience = document.getElementById("workExp").value;
    let haveDebugStrategy = document.querySelector('input[name="consent"]:checked').value;
    let javaVersion = document.querySelector('input[name = "javaVersion"]:checked').value;
    let javaFramework = document.querySelector('input[name = "javaFramework"]:checked').value;
    let defect= document.getElementById("defect").value;
    let strategyDefenition = window.editor.getValue();
    let toolsRequirements = document.getElementById("toolsRequirements").value;
    let codebaseRequirements = document.getElementById("codebaseRequirements").value;
    let knowledgeRequirements = document.getElementById("knowledgeRequirements").value;
    if(workExperience ==="" || defect==="" ||strategyDefenition==="" || toolsRequirements==="" || codebaseRequirements==="" || knowledgeRequirements===""
    || degree ==="" || studyField ==="" || languages ==="" ||platforms===""||domains==="" || haveDebugStrategy === null){
        alert("Please fill out all the required fields");
        return;
    }
    if(javaFramework ==="other" )
        javaFramework = document.getElementById("otherFrameworks").value;

    let database = firebase.firestore();

    database.collection("Strategies").doc(pId).set({
        Time:timestamp,
        ParticipationId: pId,
        Languages:languages,
        Platforms:platforms,
        Domains:domains,
        CollegeField:studyField,
        HighestDegree: degree,
        HaveStrategyWhenDebugging: haveDebugStrategy,
        WorkStartDate: workStartDate,
        Experience: workExperience,
        JavaVersion:javaVersion,
        JavaFramework:javaFramework,
        Defect:defect,
        StrategyDefenition:strategyDefenition,
        ToolsRequirements:toolsRequirements,
        CodebaseRequirements:codebaseRequirements,
        KnowledgeRequirements: knowledgeRequirements,
    }).catch(function (err) {
        console.log("error saving", err);
    });
    alert("You successfully submit your draft of strategy. Thank you so much for participating in our study.")

}
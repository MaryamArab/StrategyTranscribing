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

function languageSelectionChanged() {
    var x = document.getElementById("mySelect").value;
    if (x === "JavaScript"){
        let dom = "<fieldset>\n" +
            "        <legend>Which versions of JavaScript do you regularly use?</legend>\n" +
            "\n" +
            "        <div>\n" +
            "        <input type=\"radio\" id=\"js1.0\"\n" +
            "        name=\"version\" value=\"js1.0\" checked />\n" +
            "        <label for=\"js1.0\">JavaScript 1.0</label>\n" +
            "        </div>\n" +
            "        <div>\n" +
            "        <input type=\"radio\" id=\"js1.3\"\n" +
            "        name=\"version\" value=\"js1.3\"/>\n" +
            "            <label for=\"js1.3\">JavaScript 1.3</label>\n" +
            "        </div>\n" +
            "        <div>\n" +
            "        <input type=\"radio\" id=\"js1.5\"\n" +
            "        name=\"version\" value=\"js1.5\"/>\n" +
            "            <label for=\"js1.5\">JavaScript 1.5</label>\n" +
            "        </div>\n" +
            "        <div>\n" +
            "        <input type=\"radio\" id=\"js1.8.5\"\n" +
            "        name=\"version\" value=\"js1.8.5\" />\n" +
            "            <label for=\"js1.8.5\">JavaScript1.8.5</label>\n" +
            "        </div>\n" +
            "\n" +
            "        </fieldset>";
        document.getElementById("languageVersionForm").innerHTML = dom;

        let languageFrameworksForm = "<fieldset>\n" +
            "                        <legend>Which JavaScript framework are you most familiar with? (choose one of the following or other)</legend>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"react\"\n" +
            "                                   name=\"javaFramework\" value=\"react\" checked />\n" +
            "                            <label for=\"react\">React.js</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"angular\"\n" +
            "                                   name=\"javaFramework\" value=\"angular\" />\n" +
            "                            <label for=\"angular\">Angular.js</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"vue\"\n" +
            "                                   name=\"javaFramework\" value=\"vue\" />\n" +
            "                            <label for=\"vue\">Vue.js</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"meteor\"\n" +
            "                                   name=\"javaFramework\" value=\"meteor\" />\n" +
            "                            <label for=\"meteor\">Meteor.js</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"ember\"\n" +
            "                                   name=\"javaFramework\" value=\"ember\" />\n" +
            "                            <label for=\"ember\">Ember.js</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"backbone\"\n" +
            "                                   name=\"javaFramework\" value=\"backbone\" />\n" +
            "                            <label for=\"backbone\">Backbone.js</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"aurelia\"\n" +
            "                                   name=\"javaFramework\" value=\"aurelia\" />\n" +
            "                            <label for=\"aurelia\">Aurelia.js</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"polymer\"\n" +
            "                                   name=\"javaFramework\" value=\"polymer\" />\n" +
            "                            <label for=\"polymer\">Polymer</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"mithril\"\n" +
            "                                   name=\"javaFramework\" value=\"mithril\" />\n" +
            "                            <label for=\"mithril\">Mithril.js</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"none\"\n" +
            "                                   name=\"javaFramework\" value=\"none\" />\n" +
            "                            <label for=\"none\">None</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"other\"\n" +
            "                                   name=\"javaFramework\" value=\"other\" />\n" +
            "                            <label for=\"other\">Other</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <label for=\"otherFrameworks\">If Other selected:</label>\n" +
            "                            <input type=\"text\" id=\"otherFrameworks\"\n" +
            "                                   name=\"javaFramework\" />\n" +
            "                        </div>\n" +
            "                    </fieldset>"
        document.getElementById("languageFrameworksForm").innerHTML = languageFrameworksForm;

    }
    else if(x=== "Java"){
        let languageVersionForm = "<fieldset>\n" +
            "                        <legend>Which versions of Java do you regularly use?</legend>\n" +
            "\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"java9\"\n" +
            "                                   name=\"version\" value=\"java9\" checked />\n" +
            "                            <label for=\"java9\">Java9</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"java8\"\n" +
            "                                   name=\"version\" value=\"java8\"/>\n" +
            "                            <label for=\"java8\">Java8</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"java7\"\n" +
            "                                   name=\"version\" value=\"java7\"/>\n" +
            "                            <label for=\"java7\">Java7</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"java6\"\n" +
            "                                   name=\"version\" value=\"java6\" />\n" +
            "                            <label for=\"java6\">Java6</label>\n" +
            "                        </div>\n" +
            "\n" +
            "                    </fieldset>";
        document.getElementById("languageVersionForm").innerHTML = languageVersionForm;
        let languageFrameworksForm =" <fieldset>\n" +
            "                        <legend>Which Java framework are you most familiar with? (choose one of the following or other)</legend>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"blade\"\n" +
            "                                   name=\"javaFramework\" value=\"blade\" checked />\n" +
            "                            <label for=\"blade\">Blade</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"dropwizard\"\n" +
            "                                   name=\"javaFramework\" value=\"dropwizard\" />\n" +
            "                            <label for=\"dropwizard\">Dropwizard</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"grails\"\n" +
            "                                   name=\"javaFramework\" value=\"grails\" />\n" +
            "                            <label for=\"grails\">Grails</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"gwt\"\n" +
            "                                   name=\"javaFramework\" value=\"gwt\" />\n" +
            "                            <label for=\"gwt\">GWT</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"hibernate\"\n" +
            "                                   name=\"javaFramework\" value=\"hibernate\" />\n" +
            "                            <label for=\"hibernate\">Hibernate</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"JSF\"\n" +
            "                                   name=\"javaFramework\" value=\"JSF\" />\n" +
            "                            <label for=\"JSF\">JavaServer Faces(JSF)</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"spark\"\n" +
            "                                   name=\"javaFramework\" value=\"spark\" />\n" +
            "                            <label for=\"spark\">Spark</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"spring\"\n" +
            "                                   name=\"javaFramework\" value=\"spring\" />\n" +
            "                            <label for=\"spring\">Spring</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"struts\"\n" +
            "                                   name=\"javaFramework\" value=\"struts\" />\n" +
            "                            <label for=\"struts\">Struts</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"none\"\n" +
            "                                   name=\"javaFramework\" value=\"none\" />\n" +
            "                            <label for=\"none\">None</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <input type=\"radio\" id=\"other\"\n" +
            "                                   name=\"javaFramework\" value=\"other\" />\n" +
            "                            <label for=\"other\">Other</label>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <label for=\"otherFrameworks\">If Other selected:</label>\n" +
            "                            <input type=\"text\" id=\"otherFrameworks\"\n" +
            "                                   name=\"javaFramework\" />\n" +
            "                        </div>\n" +
            "                    </fieldset>"
        document.getElementById("languageFrameworksForm").innerHTML = languageFrameworksForm;

    }
}

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
            backgroundColor: 'lightgoldenrodyellow'
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
            backgroundColor: 'lightgoldenrodyellow'
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
            backgroundColor: 'lightgoldenrodyellow'
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
            backgroundColor: 'lightgoldenrodyellow'
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
            backgroundColor: 'lightgoldenrodyellow'
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
            backgroundColor: 'lightgoldenrodyellow'
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
            backgroundColor: 'lightgoldenrodyellow'
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
            backgroundColor: 'lightgoldenrodyellow'
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
            backgroundColor: 'lightgoldenrodyellow'
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
            backgroundColor: 'lightgoldenrodyellow'
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
    let strategyDefinition = window.editor.getValue().replace(/[\n\r\t]/g,"\\n");
    let toolsRequirements = document.getElementById("toolsRequirements").value;
    let codebaseRequirements = document.getElementById("codebaseRequirements").value;
    let knowledgeRequirements = document.getElementById("knowledgeRequirements").value;
    let clarity = document.getElementById("clarity").value;
    let correction = document.getElementById("correction").value;
    let completeness = document.getElementById("completeness").value;
    let understandability = document.getElementById("understandability").value;
    let partnerStratChallenges = document.getElementById("partnerStratChallenges").value;
    let stratWritingChallenges = document.getElementById("stratWritingChallenges").value;
    console.log("Strategy definition:   " + strategyDefinition);

    if(workExperience ==="" || defect==="" ||strategyDefinition==="" || toolsRequirements==="" || codebaseRequirements==="" || knowledgeRequirements===""
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
        StrategyDefinition:strategyDefinition,
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

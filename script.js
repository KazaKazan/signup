const formValidator = (() => {

    return{
        
    };
})();

const infoHandler = (() => {
    let selected = null;
    //Info panel elements
    const infoPanel = document.getElementById("infoPanel");
    const usageText = document.getElementById("infoUsage");
    const formatTitle = document.getElementById("infoFormatTitle");
    const formatText = document.getElementById("infoFormat");
    //Info buttons
    const nameBtn = document.getElementById("infoName");
    const lnameBtn = document.getElementById("infoLastName");
    const mailBtn = document.getElementById("infoMail");
    const phoneBtn = document.getElementById("infoPhone");
    const pwdBtn = document.getElementById("infoPassword");
    const infoButtons = [nameBtn, lnameBtn, mailBtn, phoneBtn, pwdBtn];
    //Field Information
    const nameInfo = {
        usage : "Your name will be used to pre-fill the necessary fields in travel forms.",
        formatBool : false
    };
    const lnameInfo = {
        usage : "Your last name will be used to pre-fill the necessary fields in travel forms.",
        formatBool : false
    };
    const mailInfo = {
        usage : "Your e-mail address will be used for signing in and to contact you about account and travel updates. No spam!",
        formatBool : false
    };
    const phoneInfo = {
        usage : "Your phone number will be used to pre-fill the necessary fields in travel forms as well as sending you confirmation messages and ticket information.",
        formatBool : true,
        format : "<ul><li>Your number must start with a country code. (eg. +1)</li><li>Your number must not contain any characters other than + and numbers.</li></ul>"
    };
    const pwdInfo = {
        usage : "Your password will be used for signing in.",
        formatBool : true,
        format : "<ul><li>Your password must be at least 8 characters long.</li><li>Your password must contain at least one lower-case letter, one upper-case letter and one number.</li></ul>"
    };
    const infoList = [nameInfo, lnameInfo, mailInfo, phoneInfo, pwdInfo];
    //Functions
    function initialize(){
        for(let i = 0; i < infoButtons.length; i++){
            infoButtons[i].onmouseenter = () =>  showInfo(i);
            infoButtons[i].onmouseleave = () =>  hideInfo();
            infoButtons[i].onclick = () => buttonSelection(infoButtons[i]);
        };
    };
    function buttonSelection(button){
        if(selected !== button){
            if(selected !== null){
                selected.classList.remove("active");
                selected = null;
                showInfo(infoButtons.indexOf(button));
            };
            selected = button;
            selected.classList.add("active");
        }
        else{
            selected.classList.remove("active");
            selected = null;
        };
    };
    function showInfo(infoIndex){
        if(selected == null){
            const info = infoList[infoIndex];
            usageText.textContent = info.usage;
            if(info.formatBool === false){
                formatTitle.classList.add("hidden");
                formatText.classList.add("hidden");
            }
            else{
                formatTitle.classList.remove("hidden");
                formatText.classList.remove("hidden");
                formatText.innerHTML = info.format;
            };
            infoPanel.classList.remove("hidden");
        };
    };
    function hideInfo(){
        if(selected == null){
            infoPanel.classList.add("hidden");
        };
    };
    return{
        initialize
    };
})();

const initializer = (() => {

    function start(){
        infoHandler.initialize();
    };

    return{
        start
    };
})()

initializer.start();
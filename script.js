const formValidator = (() => {
    let timer = 0;
    let initialValue = "";
    let focusIndex = -1;
    //Input fields
    const nameField = document.getElementById("fname");
    const lnameField = document.getElementById("lname");
    const mailField = document.getElementById("mail");
    const phoneField = document.getElementById("phone");
    const pwdField = document.getElementById("password");
    const pconfirmField = document.getElementById("pconfirm");
    const fields = [nameField, lnameField, mailField, phoneField, pwdField, pconfirmField];
    //Confirm Button
    const confirmButton = document.getElementById("submit");
    //Functions
    function initialize(){
        for(let i = 0; i < fields.length; i++){
            fields[i].onfocus = () => setFocus(i);
            fields[i].oninput = () => refreshTimer();
        };
        timerIncrement()
    };
    function checkAll(){
        let checkResult = true;
        for(let i = 0; i < fields.length; i++){
            if(checkField(i,false) === false){
                checkResult = false;
            }
        };
        if(fields[2].value === "" || fields[4].value === "" || fields[5].value === ""){
            checkResult = false;
        };
        if(checkResult === true){
            confirmButton.disabled = false;
        }
        else{
            confirmButton.disabled = true;
        };
    };
    function checkField(i,verbose=true){
        let checkResult = true;
        let errorMessage = "";
        switch(i){
            case 3:
                if(fields[3].value === ""){
                    break;
                }
                else if(fields[3].value === "+"){
                    checkResult = false;
                    errorMessage = "Your phone number must contain numbers."
                }
                else if(!/^\+/.test(fields[3].value)){
                    checkResult = false;
                    errorMessage = "Your phone number must start with an area code."
                }
                else if(!/^[\+][0-9]+$/.test(fields[3].value)){
                    checkResult = false;
                    errorMessage = "Your phone number must only contain numbers."
                };
                break;
            case 4:
                if(fields[4].value === ""){
                    break;
                }
                else if(!/[a-z]/.test(fields[4].value)){
                    checkResult = false;
                    errorMessage = "Your password must contain at least one lower-case letter.";
                }
                else if(!/[A-Z]/.test(fields[4].value)){
                    checkResult = false;
                    errorMessage = "Your password must contain at least one upper-case letter.";
                }
                else if(!/[0-9]/.test(fields[4].value)){
                    checkResult = false;
                    errorMessage = "Your password must contain at least one number.";
                }
                else if(fields[4].value.length < 8){
                    checkResult = false;
                    errorMessage = "Your password must be at least 8 characters long.";
                };
                break;
            case 5:
                if(fields[5].value === ""){
                    break;
                }
                else if(fields[5].value !== fields[4].value){
                    checkResult = false;
                    errorMessage = "Your passwords do not match.";
                };
                break;
        };
        if(checkResult === true){
            fields[i].classList.remove("fieldError");
            fields[i].parentElement.parentElement.querySelector(".error").textContent = errorMessage;
        }
        else{
            fields[i].classList.add("fieldError");
            if(verbose === true){
                fields[i].parentElement.parentElement.querySelector(".error").textContent = errorMessage;
            };
        };
        return checkResult;
    };
    function setFocus(index){
        timer = 1;
        initialValue = fields[index].value;
        focusIndex = index;
    };
    function refreshTimer(){
        timer = 1
    };
    async function timerIncrement(){
        if(timer !== 0){
            timer--
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        if(focusIndex !== -1 && timer === 0){
            if(fields[focusIndex].value !== initialValue){
                const checkResult = checkField(focusIndex);
                checkAll()
            };
        };
        timerIncrement()
    };
    return{
        initialize
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
        usage : "Your name will be used to pre-fill the necessary fields in travel forms. You can set this later in your account settings or fill forms manually.",
        formatBool : false
    };
    const lnameInfo = {
        usage : "Your last name will be used to pre-fill the necessary fields in travel forms. You can set this later in your account settings or fill forms manually.",
        formatBool : false
    };
    const mailInfo = {
        usage : "Your e-mail address will be used for signing in and to contact you about account and travel updates. No spam, we promise!",
        formatBool : false
    };
    const phoneInfo = {
        usage : "Your phone number will be used to pre-fill the necessary fields in travel forms as well as sending you confirmation messages and ticket information. You can set this later in your account settings or fill forms manually.",
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
            infoButtons[i].onmouseenter = () => showInfo(i);
            infoButtons[i].onmouseleave = () => hideInfo();
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
        formValidator.initialize();
    };
    return{
        start
    };
})()

initializer.start();
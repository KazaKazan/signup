const formValidator = (() => {

    return{
        
    };
})();

const infoHandler = (() => {
    const infoPanel = document.getElementById("infoPanel");
    const nameInfo = document.getElementById("infoName");
    const lnameInfo = document.getElementById("infoLastName");
    const mailInfo = document.getElementById("infoMail");
    const phoneInfo = document.getElementById("infoPhone");
    const pwdInfo = document.getElementById("infoPassword");

    const infoButtons = [nameInfo, lnameInfo, mailInfo, phoneInfo, pwdInfo]

    const infoList = [

    ];

    function initialize(){
        for(let i = 0; i < infoButtons.length; i++){
            infoButtons[i].onmouseenter = () =>  showInfo(i)
            infoButtons[i].onmouseleave = () =>  hideInfo()
        };
    };

    function showInfo(infoIndex){
        infoPanel.classList.remove("hidden");
    };

    function hideInfo(){
        infoPanel.classList.add("hidden");
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
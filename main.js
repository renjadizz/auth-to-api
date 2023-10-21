window.onload = (event) => {

    let signupButton = document.querySelector(".switch__button--signup");
    signupButton.addEventListener("click", signup);
    let loginButton = document.querySelector(".switch__button--login");
    loginButton.addEventListener("click", login);
    let formSignup = document.querySelector(".signup-container__form");
    let formLogin = document.querySelector(".login-container__form");

    formSignup.onsubmit = async function (event) {
        let fetchUrl = "https://api.realworld.io/api/users";
        let messageString = "was created. Now you can Log in";
        await postRequest(event, formSignup, fetchUrl, messageString);
    }
    formLogin.onsubmit = async function (event) {
        let fetchUrl = "https://api.realworld.io/api/users/login";
        let messageString = "logged in";
        let data = await postRequest(event, formLogin, fetchUrl, messageString);
        if (data) {
            let serverInfo = document.querySelector(".server-info");
            clearServerInfo(serverInfo);
            document.querySelector(".container").style.cssText = "display: none";
            createListUserInfo(data.user);
        }
    }

    async function postRequest(event, formType, fetchUrl, messageString) {
        event.preventDefault();
        let serverInfo = document.querySelector(".server-info");
        clearServerInfo(serverInfo);
        let formData = new FormData(formType);
        let formDataObject = {};
        formData.forEach((value, key) => formDataObject[key] = value);
        let sendData = {user: formDataObject};
        let jsonSend = JSON.stringify(sendData);
        try {
            const fetchResult = await fetch(fetchUrl,
                {
                    method: "POST",
                    body: jsonSend,
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            const jsonData = await fetchResult.json();
            let pServerInfo = document.createElement("p");
            pServerInfo.setAttribute("class", "server-info__p-success");
            pServerInfo.textContent = `${jsonData.user.username} ${messageString}`;
            serverInfo.appendChild(pServerInfo);
            return jsonData;
        } catch (err) {
            let pServerInfo = document.createElement("p");
            pServerInfo.setAttribute("class", "server-info__p-fail");
            pServerInfo.textContent = `Something went wrong. Try again later\n${err.message}`;
            serverInfo.appendChild(pServerInfo);
        }
    }


    function clearServerInfo(serverInfo) {
        while (serverInfo.firstChild) {
            serverInfo.removeChild(serverInfo.firstChild);
        }
    }

    function createListUserInfo(data) {
        let serverInfo = document.querySelector(".server-info");
        let dlNode = document.createElement("dl");
        dlNode.setAttribute("class", "server-info__dl");
        for (const property in data) {
            if (property !== "token") {
                let dtNode = document.createElement("dt");
                dtNode.textContent = property;
                dtNode.setAttribute("class", "server-info__dt");
                let ddNode = document.createElement("dd");
                ddNode.setAttribute("class", "server-info__dd");
                if (property === "image") {
                    let imgNode = document.createElement("img");
                    imgNode.setAttribute("class", "server-info__img");
                    imgNode.src = data[property];
                    ddNode.appendChild(imgNode);
                } else {
                    ddNode.textContent = data[property];
                }
                dlNode.appendChild(dtNode);
                dlNode.appendChild(ddNode);
            }
        }
        serverInfo.appendChild(dlNode);
        let btnNode = document.createElement("button");
        btnNode.setAttribute("class", "login-container__button");
        btnNode.textContent = "Return";
        btnNode.addEventListener("click", returnToMain);
        serverInfo.appendChild(btnNode);
    }

    function returnToMain(e) {
        let serverInfo = document.querySelector(".server-info");
        clearServerInfo(serverInfo);
        document.querySelector(".container").style.cssText = "display: grid";
    }

    function signup() {
        document.querySelector(".login-container").style.cssText = "display: none;";
        document.querySelector(".signup-container").style.cssText = "display: block;";
        document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
        document.querySelector(".switch__button--signup").style.cssText = "display: none";
        document.querySelector(".switch__button--login").style.cssText = "display: block";
        let serverInfo = document.querySelector(".server-info");
        clearServerInfo(serverInfo);
    }

    function login() {
        document.querySelector(".signup-container").style.cssText = "display: none;";
        document.querySelector(".login-container").style.cssText = "display: block;";
        document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
        document.querySelector(".switch__button--login").style.cssText = "display: none";
        document.querySelector(".switch__button--signup").style.cssText = "display: block";
        let serverInfo = document.querySelector(".server-info");
        clearServerInfo(serverInfo);
    }
}




window.onload = (event) => {

}
function signup() {
    document.querySelector(".login-container").style.cssText = "display: none;";
    document.querySelector(".signup-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector(".switch__button--signup").style.cssText = "display: none";
    document.querySelector(".switch__button--login").style.cssText = "display: block";
}

function login() {
    document.querySelector(".signup-container").style.cssText = "display: none;";
    document.querySelector(".login-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector(".switch__button--login").style.cssText = "display: none";
    document.querySelector(".switch__button--signup").style.cssText = "display: block";
}
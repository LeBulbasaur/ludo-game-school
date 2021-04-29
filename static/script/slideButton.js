import { fetchStatus } from "./fetchStatus.js";

const status = {
    title: "status",
    status: 1
}
const setReady = document.getElementById("circle");
const buttonBg = document.getElementById("switch");
function slideButton() {
    if (status.status == 1) {
        setReady.style.marginLeft = "50px";
        buttonBg.style.backgroundColor = "green";
        status.status = 2;
        fetchStatus(status);
    } else {
        setReady.style.marginLeft = "0px";
        buttonBg.style.backgroundColor = "gray";
        status.status = 1;
        fetchStatus(status);
    }
}
setReady.addEventListener("click", slideButton);
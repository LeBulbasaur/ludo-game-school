import { fetchSessions } from "./fetchSession.js";
import { fetchStatus, fetchMove, fetchCancel, fetchEnd } from "./fetchStatus.js";
import { drawBoard } from "./drawBoard.js";
import { Functions, Variables } from "./functionClass.js";

const vars = Variables.allVariables()
const func = new Functions(vars.rollDiceValue, vars.session);
const cookieColor = func.getCookie("color")
let x = decodeURIComponent(window.location.href).split("=")[1];

function nextPlayer() {
    vars.timeCounter.style.display = "none"
    clearInterval(vars.alfons)
    vars.startTimer = true
    const colorPlus = vars.colorID + 1
    vars.dice = 0
    if (vars.colorID < vars.colors.length - 1) {
        const babo = { nextColor: vars.colors[colorPlus] }
        fetchMove(babo);
    } else {
        const babo = { nextColor: vars.colors[0] }
        fetchMove(babo);
    }
    vars.rollBt.style.display = "none";
    vars.rollDiceValue.style.display = "none"
    vars.rollDiceBt.style.display = "none"
    vars.players.forEach(div => {
        if (div.style.backgroundColor == cookieColor) {
            div.style.boxShadow = "none"
        }
    })
}
function countdown(minutes) {
    let seconds = 60;
    let mins = minutes
    function tick() {
        let counter = document.getElementById("timer");
        let current_minutes = mins - 1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds > 0) {
            vars.alfons = setTimeout(tick, 1000);
        } else {
            if (mins > 1) {
                countdown(mins - 1);
            }
            nextPlayer();
        }
    }
    tick();
}


vars.rollBt.addEventListener("click", function () {
    nextPlayer();
})
vars.rollDiceBt.addEventListener("click", function () {
    vars.dice = func.rollDice()
    func.showDice(vars.dice)
    vars.rollDiceBt.style.display = "none"
    vars.rollDiceValue.style.display = "flex"
})

const getSession = () => {
    fetchSessions(x)
        .then(data => {
            vars.session = {};
            data[0].forEach(element => {
                if (element._id == x.split('"')[1]) {
                    vars.session = element
                }
            })
            vars.colors = data[1]
            if (Object.keys(vars.session).length == 0) {
                clearInterval(vars.bigInterval)
                document.cookie = `ingame=false; expires=${new Date(Date.now() + 1000 * 60 * 60)}; Path=/;`;
                window.location.href = "/";
            }
            if (vars.session.started) {
                drawBoard(vars.colors);
                if (vars.session.player_one != undefined) {
                    func.drawPawnsOne(vars.session)
                }
                if (vars.session.player_two != undefined) {
                    func.drawPawnsTwo(vars.session)
                }
                if (vars.session.player_three != undefined) {
                    func.drawPawnsThree(vars.session)
                }
                if (vars.session.player_four != undefined) {
                    func.drawPawnsFour(vars.session)
                }
                if (vars.session.move == "rolling") {
                    const color = {
                        title: "color",
                        color: vars.colors[0]
                    }
                    fetchCancel(color);
                    vars.gameColor = vars.session.move
                    vars.colorID = vars.colors.indexOf(vars.gameColor)
                } else {
                    vars.gameColor = vars.session.move
                    vars.colorID = vars.colors.indexOf(vars.gameColor)
                }
                if (vars.session.move == cookieColor) {
                    fetchStatus(vars.status);
                    vars.rollBt.style.display = "flex";
                    vars.timeCounter.style.display = "block"
                    if (vars.startTimer == true) {
                        clearInterval(vars.alfons)
                        countdown(1, vars.alfons);
                        vars.startTimer = false
                    }
                    vars.players.forEach(div => {
                        if (div.style.backgroundColor == cookieColor) {
                            div.style.boxShadow = "10px 10px 20px green"
                        }
                    })
                    if (vars.rollDiceValue.style.display != "flex") {
                        vars.rollDiceBt.style.display = "flex"
                    }
                }
            }
        })
        .catch(err => console.log(err));

    let g = 0
    let v = 0
    let b = 0
    let r = 0
    const allPawns = document.querySelectorAll(".pawn")
    allPawns.forEach(checkPawn => {
        if (checkPawn.classList.contains("gf6")) {
            g++
        }
        if (checkPawn.classList.contains("vf6")) {
            v++
        }
        if (checkPawn.classList.contains("bf6")) {
            b++
        }
        if (checkPawn.classList.contains("rf6")) {
            r++
        }
        const winnerDiv = document.getElementById("winner")
        const winnerSpan = document.getElementById("winner-text")
        if (g == 4) {
            clearInterval(vars.bigInterval)
            winnerDiv.style.display = "flex"
            winnerSpan.innerText = "Green"
            document.cookie = `ingame=false; expires=${new Date(Date.now() + 1000 * 60 * 60)}; Path=/;`;
            window.setTimeout(function () {
                window.location.href = "/";
            }, 2000)
        }
        if (v == 4) {
            clearInterval(vars.bigInterval)
            winnerDiv.style.display = "flex"
            winnerSpan.innerText = "Violet"
            document.cookie = `ingame=false; expires=${new Date(Date.now() + 1000 * 60 * 60)}; Path=/;`;
            window.setTimeout(function () {
                window.location.href = "/";
            }, 2000)
        }
        if (b == 1) {
            clearInterval(vars.bigInterval)
            winnerDiv.style.display = "flex"
            winnerSpan.innerText = "Blue"
            document.cookie = `ingame=false; expires=${new Date(Date.now() + 1000 * 60 * 60)}; Path=/;`;
            window.setTimeout(function () {
                window.location.href = "/";
            }, 2000)
        }
        if (r == 4) {
            clearInterval(vars.bigInterval)
            winnerDiv.style.display = "flex"
            winnerSpan.innerText = "Red"
            document.cookie = `ingame=false; expires=${new Date(Date.now() + 1000 * 60 * 60)}; Path=/;`;
            window.setTimeout(function () {
                window.location.href = "/";
            }, 2000)
        }
    })
}
getSession();
vars.bigInterval = setInterval(getSession, 3000);

let pawns = [];
let pawnsInterval;
let findPawns = function () {
    pawns = document.querySelectorAll(".pawn")
    if (pawns.length > 0) {
        clearInterval(pawnsInterval);
        pawns.forEach(pawn => {
            const pawnColor = pawn.id[0]
            if (pawnColor == cookieColor[0]) {
                pawn.style.cursor = "pointer"
                pawn.addEventListener("click", function (e) {
                    if (vars.session.move == cookieColor && vars.dice != 0) {
                        if (pawn.classList.contains("home")) {
                            if (vars.dice == 1 || vars.dice == 6) {
                                func.movePawnStart(cookieColor, pawn, pawns);
                            }
                        } else if (!pawn.classList.contains("home")) {
                            func.movePawn(cookieColor, pawn, vars.dice, pawns)
                        }
                    }
                })
                pawn.addEventListener("mouseover", function (e) {
                    if (vars.session.move == cookieColor && vars.dice != 0) {
                        if (pawn.classList.contains("home")) {
                            if (vars.dice == 1 || vars.dice == 6) {
                                func.showPawnStart(cookieColor);
                            }
                        } else if (!pawn.classList.contains("home")) {
                            func.showPawn(pawn, vars.dice, cookieColor)
                        }
                    }
                })
                pawn.addEventListener("mouseout", function (e) {
                    const holo = document.getElementById("showcase")
                    if (holo != undefined) {
                        holo.remove()
                    }
                })
            }
        })
    }
}
pawnsInterval = setInterval(findPawns, 1000)

document.cookie = `ingame=true; expires=${new Date(Date.now() + 1000 * 60 * 60)};  Path=/;`;

const startButton = document.getElementById("start");
startButton.disabled = true;
startButton.addEventListener("click", () => {
    fetch("/start", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).catch(err => console.log(err));
})

export { nextPlayer }
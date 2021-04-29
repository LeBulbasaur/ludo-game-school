import { fields } from "./fields.js";

const board = document.getElementById("board");
class Pawn {
    constructor(color) {
        this.color = color
    }
    greenPawn() {
        for (let i = 0; i < 4; i++) {
            const div = document.createElement("div");
            div.setAttribute("id", `g${i}`);
            div.setAttribute("class", "pawn");
            div.style.backgroundColor = this.color
            board.append(div);
        }
    }
    violetPawn() {
        for (let i = 0; i < 4; i++) {
            const div = document.createElement("div");
            div.setAttribute("id", `v${i}`);
            div.setAttribute("class", "pawn");
            div.style.backgroundColor = this.color
            board.append(div);
        }
    }
    bluePawn() {
        for (let i = 0; i < 4; i++) {
            const div = document.createElement("div");
            div.setAttribute("id", `b${i}`);
            div.setAttribute("class", "pawn");
            div.style.backgroundColor = this.color
            board.append(div);
        }
    }
    redPawn() {
        for (let i = 0; i < 4; i++) {
            const div = document.createElement("div");
            div.setAttribute("id", `r${i}`);
            div.setAttribute("class", "pawn");
            div.style.backgroundColor = this.color
            board.append(div);
        }
    }
}

function drawBoard(array) {
    const startButton = document.getElementById("start");
    startButton.style.display = "none";
    const startSwitch = document.getElementById("start-switch");
    startSwitch.style.display = "none";
    const welcome = document.getElementById("welcome-header");
    welcome.style.display = "none";
    const sort = document.getElementById("sort");
    sort.style.display = "none";
    const boardSector = document.getElementById("board-sector");
    boardSector.style.display = "flex";
    const addDivs = document.querySelectorAll(".field")
    if (addDivs.length == 0) {
        fields.forEach(field => {
            const div = document.createElement("div");
            div.setAttribute("id", field.name);
            div.setAttribute("class", "field");
            div.style.marginLeft = `${field.x}px`;
            div.style.marginTop = `${field.y}px`;
            board.append(div);
        });
        array.forEach(color => {
            if (color == "green") {
                const green = new Pawn(color);
                green.greenPawn();
            }
            else if (color == "violet") {
                const violet = new Pawn(color);
                violet.violetPawn();
            }
            else if (color == "blue") {
                const blue = new Pawn(color);
                blue.bluePawn();
            }
            else if (color == "red") {
                const red = new Pawn(color);
                red.redPawn();
            }
        })
    }
}
export { drawBoard }
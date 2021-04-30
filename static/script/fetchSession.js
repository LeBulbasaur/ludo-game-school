let colors;
let playersReady;
class Player {
    constructor(div, obj) {
        this.div = div
        this.obj = obj
    }
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    addFirstPlayer() {
        this.div.innerText = this.obj.nick;
        this.div.style.backgroundColor = this.obj.color;
        colors.push(this.obj.color);
        if (this.obj.status == 2) {
            playersReady += 1;
        }
        if (this.obj.nick == this.getCookie("nick")) {
            const button = document.getElementById("start");
            button.style.display = "block";
        }
    }
    addPlayer() {
        this.div.innerText = this.obj.nick;
        this.div.style.backgroundColor = this.obj.color;
        colors.push(this.obj.color);
        if (this.obj.status == 2) {
            playersReady += 1;
        }
    }
}

const fetchSessions = async (sessionData) => {
    const response = await fetch("/sessions", {
        method: "GET",
        mode: 'no-cors'
    });
    const data = await response.json();
    const sessionArray = Object.values(data);
    const playersAmount = document.getElementById("players-amount");
    playersReady = 0;
    colors = [];
    for (let i = 0; i < sessionArray.length; i++) {
        const sessionID = JSON.stringify(sessionArray[i]._id);
        const session = sessionArray[i];
        if (sessionID == sessionData) {
            if (session.player_one != undefined) {
                const playerOne = document.getElementById("player-one");
                const player = new Player(playerOne, session.player_one);
                player.addFirstPlayer();
                playersAmount.innerText = 1;
            }
            if (session.player_two != undefined) {
                const playerTwo = document.getElementById("player-two");
                const player = new Player(playerTwo, session.player_two);
                player.addPlayer();
                playersAmount.innerText = 2;
            }
            if (session.player_three != undefined) {
                const playerThree = document.getElementById("player-three");
                const player = new Player(playerThree, session.player_three);
                player.addPlayer();
                playersAmount.innerText = 3;
            }
            if (session.player_four != undefined) {
                const playerFour = document.getElementById("player-four");
                const player = new Player(playerFour, session.player_four);
                player.addPlayer();
                playersAmount.innerText = 4;
            }
            const playerCounter = document.getElementById("is-ready");
            playerCounter.innerText = playersReady;
            if (playersReady >= 2) {
                const startButton = document.getElementById("start");
                startButton.style.fill = "green";
                startButton.disabled = false;
            } else {
                const startButton = document.getElementById("start");
                startButton.style.fill = "red";
                startButton.disabled = true;
            }
            break;
        }
    }
    return [sessionArray, colors];
}
export { fetchSessions };
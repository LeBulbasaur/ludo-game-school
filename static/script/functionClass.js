import { fields, fieldsGreen, fieldsViolet, fieldsBlue, fieldsRed } from "./fields.js";
import { nextPlayer } from "./lobby.js";
import { fetchMovePawn } from "./fetchStatus.js";

class Functions {
    constructor(rollDiceValue) {
        this.rollDiceValue = rollDiceValue
    }
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    removeCookies() {
        document.cookie = 'session=' + "" + '; Path=/;';
    }
    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }
    showDice(dice) {
        if (dice == 1) {
            this.rollDiceValue.style.backgroundImage = "url('../pics/dice1.png')"
        }
        else if (dice == 2) {
            this.rollDiceValue.style.backgroundImage = "url('../pics/dice2.png')"
        }
        else if (dice == 3) {
            this.rollDiceValue.style.backgroundImage = "url('../pics/dice3.png')"
        }
        else if (dice == 4) {
            this.rollDiceValue.style.backgroundImage = "url('../pics/dice4.png')"
        }
        else if (dice == 5) {
            this.rollDiceValue.style.backgroundImage = "url('../pics/dice5.png')"
        }
        else if (dice == 6) {
            this.rollDiceValue.style.backgroundImage = "url('../pics/dice6.png')"
        }
        let utterance = new SpeechSynthesisUtterance(`Liczba na kostce to ${dice}`);
        utterance.lang = "pl-PL"
        speechSynthesis.speak(utterance);
    }
    drawPawnsOne(session) {
        const pawns = document.querySelectorAll(".pawn")
        let pawnsPosition = session.player_one.pawns;
        pawnsPosition = Object.entries(pawnsPosition);
        pawns.forEach(pawn => {
            if (pawn.id[0] == session.player_one.color[0]) {
                pawnsPosition.forEach(position => {
                    if (pawn.id[1] == position[0][1]) {
                        fields.forEach(field => {
                            if (field.name == position[1]) {
                                pawn.style.marginLeft = `${field.x}px`
                                pawn.style.marginTop = `${field.y}px`
                                pawn.setAttribute("class", "pawn")
                                if (field.name[1] == "h") {
                                    pawn.classList.add("home")
                                }
                                else {
                                    pawn.classList.add(field.name)
                                }
                            }
                        })
                    }
                })

            }
        })
    }
    drawPawnsTwo(session) {
        const pawns = document.querySelectorAll(".pawn")
        let pawnsPosition = session.player_two.pawns;
        pawnsPosition = Object.entries(pawnsPosition);
        pawns.forEach(pawn => {
            if (pawn.id[0] == session.player_two.color[0]) {
                pawnsPosition.forEach(position => {
                    if (pawn.id[1] == position[0][1]) {
                        fields.forEach(field => {
                            if (field.name == position[1]) {
                                pawn.style.marginLeft = `${field.x}px`
                                pawn.style.marginTop = `${field.y}px`
                                pawn.setAttribute("class", "pawn")
                                if (field.name[1] == "h") {
                                    pawn.classList.add("home")
                                }
                                else {
                                    pawn.classList.add(field.name)
                                }
                            }
                        })
                    }
                })

            }
        })
    }
    drawPawnsThree(session) {
        const pawns = document.querySelectorAll(".pawn")
        let pawnsPosition = session.player_three.pawns;
        pawnsPosition = Object.entries(pawnsPosition);
        pawns.forEach(pawn => {
            if (pawn.id[0] == session.player_three.color[0]) {
                pawnsPosition.forEach(position => {
                    if (pawn.id[1] == position[0][1]) {
                        fields.forEach(field => {
                            if (field.name == position[1]) {
                                pawn.style.marginLeft = `${field.x}px`
                                pawn.style.marginTop = `${field.y}px`
                                pawn.setAttribute("class", "pawn")
                                if (field.name[1] == "h") {
                                    pawn.classList.add("home")
                                }
                                else {
                                    pawn.classList.add(field.name)
                                }
                            }
                        })
                    }
                })

            }
        })
    }
    drawPawnsFour(session) {
        const pawns = document.querySelectorAll(".pawn")
        let pawnsPosition = session.player_four.pawns;
        pawnsPosition = Object.entries(pawnsPosition);
        pawns.forEach(pawn => {
            if (pawn.id[0] == session.player_four.color[0]) {
                pawnsPosition.forEach(position => {
                    if (pawn.id[1] == position[0][1]) {
                        fields.forEach(field => {
                            if (field.name == position[1]) {
                                pawn.style.marginLeft = `${field.x}px`
                                pawn.style.marginTop = `${field.y}px`
                                pawn.setAttribute("class", "pawn")
                                if (field.name[1] == "h") {
                                    pawn.classList.add("home")
                                }
                                else {
                                    pawn.classList.add(field.name)
                                }
                            }
                        })
                    }
                })

            }
        })
    }
    movePawn(color, pawn, dice, pawns) {
        const fullFields = [];
        if (color == "green") {
            const classes = pawn.classList
            classes.forEach(pawnClass => {
                fieldsGreen.forEach(field => {
                    if (field.name == pawnClass) {
                        let fieldIndex = fieldsGreen.indexOf(field) + dice
                        if (fieldIndex < fieldsGreen.length) {
                            const nextField = fieldsGreen[fieldIndex]
                            pawns.forEach(el => {
                                if (el.classList.contains(nextField.name)) {
                                    fullFields.push(el)
                                }
                            })
                            if (fullFields.length == 0) {
                                pawn.style.marginLeft = `${nextField.x}px`
                                pawn.style.marginTop = `${nextField.y}px`
                                pawn.classList.remove(field.name)
                                pawn.classList.add(nextField.name)
                                const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "green" }
                                fetchMovePawn(pawnObj);
                                dice = 0
                                nextPlayer();
                            }
                            else if (fullFields.length == 1) {
                                const victim = fullFields[0]
                                if (victim.id[0] != pawn.id[0]) {
                                    const homeField = `${victim.id[0]}h${victim.id[1]}`
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    victim.setAttribute("class", "pawn home")
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "green" }
                                    fetchMovePawn(pawnObj);
                                    const pawnObjDestroyed = { pawn: `p${victim.id[1]}`, field: homeField, color: victim.style.backgroundColor }
                                    fetchMovePawn(pawnObjDestroyed);
                                    dice = 0
                                    nextPlayer();
                                } else {
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "green" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                }
                            } else if (fullFields.length > 1) {
                                const victim = fullFields[0]
                                if (victim.id[0] != pawn.id[0]) {
                                    const homeField = `${pawn.id[0]}h${pawn.id[1]}`
                                    pawn.setAttribute("class", "pawn home")
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: homeField, color: "green" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                } else {
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "green" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                }
                            }
                        }
                    }
                })
            })
        }
        else if (color == "violet") {
            const classes = pawn.classList
            classes.forEach(pawnClass => {
                fieldsViolet.forEach(field => {
                    if (field.name == pawnClass) {
                        let fieldIndex = fieldsViolet.indexOf(field) + dice
                        if (fieldIndex < fieldsViolet.length) {
                            const nextField = fieldsViolet[fieldIndex]
                            pawns.forEach(el => {
                                if (el.classList.contains(nextField.name)) {
                                    fullFields.push(el)
                                }
                            })
                            if (fullFields.length == 0) {
                                pawn.style.marginLeft = `${nextField.x}px`
                                pawn.style.marginTop = `${nextField.y}px`
                                pawn.classList.remove(field.name)
                                pawn.classList.add(nextField.name)
                                const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "violet" }
                                fetchMovePawn(pawnObj);
                                dice = 0
                                nextPlayer();
                            }
                            else if (fullFields.length == 1) {
                                const victim = fullFields[0]
                                if (victim.id[0] != pawn.id[0]) {
                                    const homeField = `${victim.id[0]}h${victim.id[1]}`
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    victim.setAttribute("class", "pawn home")
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "violet" }
                                    fetchMovePawn(pawnObj);
                                    const pawnObjDestroyed = { pawn: `p${victim.id[1]}`, field: homeField, color: victim.style.backgroundColor }
                                    fetchMovePawn(pawnObjDestroyed);
                                    dice = 0
                                    nextPlayer();
                                } else {
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "violet" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                }
                            } else if (fullFields.length > 1) {
                                const victim = fullFields[0]
                                if (victim.id[0] != pawn.id[0]) {
                                    const homeField = `${pawn.id[0]}h${pawn.id[1]}`
                                    pawn.setAttribute("class", "pawn home")
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: homeField, color: "violet" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                } else {
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "violet" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                }
                            }
                        }
                    }
                })
            })
        }
        else if (color == "blue") {
            const classes = pawn.classList
            classes.forEach(pawnClass => {
                fieldsBlue.forEach(field => {
                    if (field.name == pawnClass) {
                        let fieldIndex = fieldsBlue.indexOf(field) + dice
                        if (fieldIndex < fieldsBlue.length) {
                            const nextField = fieldsBlue[fieldIndex]
                            pawns.forEach(el => {
                                if (el.classList.contains(nextField.name)) {
                                    fullFields.push(el)
                                }
                            })
                            if (fullFields.length == 0) {
                                pawn.style.marginLeft = `${nextField.x}px`
                                pawn.style.marginTop = `${nextField.y}px`
                                pawn.classList.remove(field.name)
                                pawn.classList.add(nextField.name)
                                const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "blue" }
                                fetchMovePawn(pawnObj);
                                dice = 0
                                nextPlayer();
                            }
                            else if (fullFields.length == 1) {
                                const victim = fullFields[0]
                                if (victim.id[0] != pawn.id[0]) {
                                    const homeField = `${victim.id[0]}h${victim.id[1]}`
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    victim.setAttribute("class", "pawn home")
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "blue" }
                                    fetchMovePawn(pawnObj);
                                    const pawnObjDestroyed = { pawn: `p${victim.id[1]}`, field: homeField, color: victim.style.backgroundColor }
                                    fetchMovePawn(pawnObjDestroyed);
                                    dice = 0
                                    nextPlayer();
                                } else {
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "blue" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                }
                            } else if (fullFields.length > 1) {
                                const victim = fullFields[0]
                                if (victim.id[0] != pawn.id[0]) {
                                    const homeField = `${pawn.id[0]}h${pawn.id[1]}`
                                    pawn.setAttribute("class", "pawn home")
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: homeField, color: "blue" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                } else {
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "blue" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                }
                            }
                        }
                    }
                })
            })
        }
        else if (color == "red") {
            const classes = pawn.classList
            classes.forEach(pawnClass => {
                fieldsRed.forEach(field => {
                    if (field.name == pawnClass) {
                        let fieldIndex = fieldsRed.indexOf(field) + dice
                        if (fieldIndex < fieldsRed.length) {
                            const nextField = fieldsRed[fieldIndex]
                            pawns.forEach(el => {
                                if (el.classList.contains(nextField.name)) {
                                    fullFields.push(el)
                                }
                            })
                            if (fullFields.length == 0) {
                                pawn.style.marginLeft = `${nextField.x}px`
                                pawn.style.marginTop = `${nextField.y}px`
                                pawn.classList.remove(field.name)
                                pawn.classList.add(nextField.name)
                                const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "red" }
                                fetchMovePawn(pawnObj);
                                dice = 0
                                nextPlayer();
                            }
                            else if (fullFields.length == 1) {
                                const victim = fullFields[0]
                                if (victim.id[0] != pawn.id[0]) {
                                    const homeField = `${victim.id[0]}h${victim.id[1]}`
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    victim.setAttribute("class", "pawn home")
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "red" }
                                    fetchMovePawn(pawnObj);
                                    const pawnObjDestroyed = { pawn: `p${victim.id[1]}`, field: homeField, color: victim.style.backgroundColor }
                                    fetchMovePawn(pawnObjDestroyed);
                                    dice = 0
                                    nextPlayer();
                                } else {
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "red" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                }
                            } else if (fullFields.length > 1) {
                                const victim = fullFields[0]
                                if (victim.id[0] != pawn.id[0]) {
                                    const homeField = `${pawn.id[0]}h${pawn.id[1]}`
                                    pawn.setAttribute("class", "pawn home")
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: homeField, color: "red" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                } else {
                                    pawn.style.marginLeft = `${nextField.x}px`
                                    pawn.style.marginTop = `${nextField.y}px`
                                    pawn.classList.remove(field.name)
                                    pawn.classList.add(nextField.name)
                                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: nextField.name, color: "red" }
                                    fetchMovePawn(pawnObj);
                                    dice = 0
                                    nextPlayer();
                                }
                            }
                        }
                    }
                })
            })
        }
    }
    movePawnStart(color, pawn, pawns) {
        const fullFields = []
        if (color == "green") {
            const field = fieldsGreen[0]
            pawns.forEach(el => {
                if (el.classList.contains(field.name)) {
                    fullFields.push(el)
                }
            })
            if (fullFields.length == 0) {
                pawn.style.marginLeft = `${field.x}px`
                pawn.style.marginTop = `${field.y}px`
                pawn.removeAttribute("class");
                pawn.setAttribute("class", `pawn ${field.name}`)
                const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "green" }
                fetchMovePawn(pawnObj);
                nextPlayer();
            } else if (fullFields.length == 1) {
                const victim = fullFields[0]
                if (victim.id[0] != pawn.id[0]) {
                    const homeField = `${victim.id[0]}h${victim.id[1]}`
                    pawn.style.marginLeft = `${field.x}px`
                    pawn.style.marginTop = `${field.y}px`
                    pawn.removeAttribute("class");
                    pawn.setAttribute("class", `pawn ${field.name}`)
                    victim.setAttribute("class", "pawn home")
                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "green" }
                    fetchMovePawn(pawnObj);
                    const pawnObjDestroyed = { pawn: `p${victim.id[1]}`, field: homeField, color: victim.style.backgroundColor }
                    fetchMovePawn(pawnObjDestroyed);
                    nextPlayer();
                } else {
                    pawn.style.marginLeft = `${field.x}px`
                    pawn.style.marginTop = `${field.y}px`
                    pawn.removeAttribute("class");
                    pawn.setAttribute("class", `pawn ${field.name}`)
                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "green" }
                    fetchMovePawn(pawnObj);
                    nextPlayer();
                }
            } else {
                window.alert("That field is blocked!")
            }
        }
        else if (color == "violet") {
            const field = fieldsViolet[0]
            pawns.forEach(el => {
                if (el.classList.contains(field.name)) {
                    fullFields.push(el)
                }
            })
            if (fullFields.length == 0) {
                pawn.style.marginLeft = `${field.x}px`
                pawn.style.marginTop = `${field.y}px`
                pawn.removeAttribute("class");
                pawn.setAttribute("class", `pawn ${field.name}`)
                const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "violet" }
                fetchMovePawn(pawnObj);
                nextPlayer();
            } else if (fullFields.length == 1) {
                const victim = fullFields[0]
                if (victim.id[0] != pawn.id[0]) {
                    const homeField = `${victim.id[0]}h${victim.id[1]}`
                    pawn.style.marginLeft = `${field.x}px`
                    pawn.style.marginTop = `${field.y}px`
                    pawn.removeAttribute("class");
                    pawn.setAttribute("class", `pawn ${field.name}`)
                    victim.setAttribute("class", "pawn home")
                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "violet" }
                    fetchMovePawn(pawnObj);
                    const pawnObjDestroyed = { pawn: `p${victim.id[1]}`, field: homeField, color: victim.style.backgroundColor }
                    fetchMovePawn(pawnObjDestroyed);
                    nextPlayer();
                } else {
                    pawn.style.marginLeft = `${field.x}px`
                    pawn.style.marginTop = `${field.y}px`
                    pawn.removeAttribute("class");
                    pawn.setAttribute("class", `pawn ${field.name}`)
                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "violet" }
                    fetchMovePawn(pawnObj);
                    nextPlayer();
                }
            } else {
                window.alert("That field is blocked!")
            }
        }
        else if (color == "blue") {
            const field = fieldsBlue[0]
            pawns.forEach(el => {
                if (el.classList.contains(field.name)) {
                    fullFields.push(el)
                }
            })
            if (fullFields.length == 0) {
                pawn.style.marginLeft = `${field.x}px`
                pawn.style.marginTop = `${field.y}px`
                pawn.removeAttribute("class");
                pawn.setAttribute("class", `pawn ${field.name}`)
                const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "blue" }
                fetchMovePawn(pawnObj);
                nextPlayer();
            } else if (fullFields.length == 1) {
                const victim = fullFields[0]
                if (victim.id[0] != pawn.id[0]) {
                    const homeField = `${victim.id[0]}h${victim.id[1]}`
                    pawn.style.marginLeft = `${field.x}px`
                    pawn.style.marginTop = `${field.y}px`
                    pawn.removeAttribute("class");
                    pawn.setAttribute("class", `pawn ${field.name}`)
                    victim.setAttribute("class", "pawn home")
                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "blue" }
                    fetchMovePawn(pawnObj);
                    const pawnObjDestroyed = { pawn: `p${victim.id[1]}`, field: homeField, color: victim.style.backgroundColor }
                    fetchMovePawn(pawnObjDestroyed);
                    nextPlayer();
                } else {
                    pawn.style.marginLeft = `${field.x}px`
                    pawn.style.marginTop = `${field.y}px`
                    pawn.removeAttribute("class");
                    pawn.setAttribute("class", `pawn ${field.name}`)
                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "blue" }
                    fetchMovePawn(pawnObj);
                    nextPlayer();
                }
            } else {
                window.alert("That field is blocked!")
            }
        }
        else if (color == "red") {
            const field = fieldsRed[0]
            pawns.forEach(el => {
                if (el.classList.contains(field.name)) {
                    fullFields.push(el)
                }
            })
            if (fullFields.length == 0) {
                pawn.style.marginLeft = `${field.x}px`
                pawn.style.marginTop = `${field.y}px`
                pawn.removeAttribute("class");
                pawn.setAttribute("class", `pawn ${field.name}`)
                const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "red" }
                fetchMovePawn(pawnObj);
                nextPlayer();
            } else if (fullFields.length == 1) {
                const victim = fullFields[0]
                if (victim.id[0] != pawn.id[0]) {
                    const homeField = `${victim.id[0]}h${victim.id[1]}`
                    pawn.style.marginLeft = `${field.x}px`
                    pawn.style.marginTop = `${field.y}px`
                    pawn.removeAttribute("class");
                    pawn.setAttribute("class", `pawn ${field.name}`)
                    victim.setAttribute("class", "pawn home")
                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "red" }
                    fetchMovePawn(pawnObj);
                    const pawnObjDestroyed = { pawn: `p${victim.id[1]}`, field: homeField, color: victim.style.backgroundColor }
                    fetchMovePawn(pawnObjDestroyed);
                    nextPlayer();
                } else {
                    pawn.style.marginLeft = `${field.x}px`
                    pawn.style.marginTop = `${field.y}px`
                    pawn.removeAttribute("class");
                    pawn.setAttribute("class", `pawn ${field.name}`)
                    const pawnObj = { pawn: `p${pawn.id[1]}`, field: field.name, color: "red" }
                    fetchMovePawn(pawnObj);
                    nextPlayer();
                }
            } else {
                window.alert("That field is blocked!")
            }
        }
    }
    showPawn(pawn, dice, color) {
        const board = document.getElementById("board");
        const showcase = document.createElement("div")
        showcase.setAttribute("id", "showcase")
        const classes = pawn.classList
        if (color == "green") {
            classes.forEach(pawnClass => {
                fieldsGreen.forEach(field => {
                    if (field.name == pawnClass) {
                        let fieldIndex = fieldsGreen.indexOf(field) + dice
                        if (fieldIndex < fieldsGreen.length) {
                            const nextField = fieldsGreen[fieldIndex]
                            showcase.style.marginLeft = `${nextField.x}px`
                            showcase.style.marginTop = `${nextField.y}px`
                            board.append(showcase)
                        }
                    }
                })
            })
        }
        else if (color == "violet") {
            classes.forEach(pawnClass => {
                fieldsViolet.forEach(field => {
                    if (field.name == pawnClass) {
                        let fieldIndex = fieldsViolet.indexOf(field) + dice
                        if (fieldIndex < fieldsViolet.length) {
                            const nextField = fieldsViolet[fieldIndex]
                            showcase.style.marginLeft = `${nextField.x}px`
                            showcase.style.marginTop = `${nextField.y}px`
                            board.append(showcase)
                        }
                    }
                })
            })
        }
        else if (color == "blue") {
            classes.forEach(pawnClass => {
                fieldsBlue.forEach(field => {
                    if (field.name == pawnClass) {
                        let fieldIndex = fieldsBlue.indexOf(field) + dice
                        if (fieldIndex < fieldsBlue.length) {
                            const nextField = fieldsBlue[fieldIndex]
                            showcase.style.marginLeft = `${nextField.x}px`
                            showcase.style.marginTop = `${nextField.y}px`
                            board.append(showcase)
                        }
                    }
                })
            })
        }
        else if (color == "red") {
            classes.forEach(pawnClass => {
                fieldsRed.forEach(field => {
                    if (field.name == pawnClass) {
                        let fieldIndex = fieldsRed.indexOf(field) + dice
                        if (fieldIndex < fieldsRed.length) {
                            const nextField = fieldsRed[fieldIndex]
                            showcase.style.marginLeft = `${nextField.x}px`
                            showcase.style.marginTop = `${nextField.y}px`
                            board.append(showcase)
                        }
                    }
                })
            })
        }
    }
    showPawnStart(color) {
        const board = document.getElementById("board");
        const showcase = document.createElement("div")
        showcase.setAttribute("id", "showcase")
        if (color == "green") {
            const field = fieldsGreen[0]
            showcase.style.marginLeft = `${field.x}px`
            showcase.style.marginTop = `${field.y}px`
            board.append(showcase)
        }
        else if (color == "violet") {
            const field = fieldsViolet[0]
            showcase.style.marginLeft = `${field.x}px`
            showcase.style.marginTop = `${field.y}px`
            board.append(showcase)
        }
        else if (color == "blue") {
            const field = fieldsBlue[0]
            showcase.style.marginLeft = `${field.x}px`
            showcase.style.marginTop = `${field.y}px`
            board.append(showcase)
        }
        else if (color == "red") {
            const field = fieldsRed[0]
            showcase.style.marginLeft = `${field.x}px`
            showcase.style.marginTop = `${field.y}px`
            board.append(showcase)
        }
    }

}

class Variables {
    static allVariables() {
        return {
            rollBt: document.getElementById("roll-die-bt"),
            rollDiceBt: document.getElementById("roll-die"),
            rollDiceValue: document.getElementById("value-die"),
            players: document.querySelectorAll(".player"),
            timeCounter: document.getElementById("timer-div"),
            status: {
                title: "status",
                status: 3
            },
            session: {},
            alfons: "",
            dice: 0,
            gameColor: "",
            colors: [],
            colorID: "",
            startTimer: true,
            bigInterval: null
        }
    }
}

export { Functions, Variables }
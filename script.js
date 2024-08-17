let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],[0, 3, 6],[0, 4, 8],[1, 4, 7],[2, 5, 8],[2, 4, 6],[3, 4, 5],[6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    enableBox();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "x";
            turn0 = true;
        }
        box.disabled = true;

        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
}

const gameDraw = (winner) => {
    msg.innerText = `game is draw.`;
    msgContainer.classList.remove("hide");
    disableBox();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos2Val != "" && pos3Val !=""){
            if (pos1Val === pos2Val && pos3Val) {
                
                showWinner(pos1Val);
            }
        }  
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener(resetGame);

export class HUD {
    constructor(currentPlayer, obj) {
        this._currentPlayer = currentPlayer;
        this.createMainDisplay();
        this.createCurrentPlayerDisplay();
        this.createVictoryDisplay();
        this.createRevokeBtn();
        this.createResetBtn();
        this.createBoardDisplay(obj);
    }

    get currentPlayer() {
        return this._currentPlayer;
    }

    createMainDisplay() {
        const mainDisplay = document.createElement('div');
        mainDisplay.id = 'main-display';
        mainDisplay.style.display = 'flex';
        mainDisplay.style.flexDirection = 'column';
        mainDisplay.style.textAlign = 'center';
        mainDisplay.style.backgroundColor = 'rgba(25, 175, 25, 0.3)';
        document.querySelector('body').appendChild(mainDisplay);
    }

    createBoardDisplay(obj) {
        let w = (obj.size + obj.offset) * obj.cols;
        let h = (obj.size + obj.offset) * obj.rows;

        const boardDisplay = document.createElement('div');
        boardDisplay.id = 'board';
        boardDisplay.style.backgroundColor = 'rgba(25, 175, 25, 0.3)';
        boardDisplay.style.display = "flex";
        boardDisplay.style.flexWrap = "wrap";
        boardDisplay.style.backgroundColor = "blue";
        boardDisplay.style.border = "5px solid navy";
        boardDisplay.style.borderTop = "none";
        boardDisplay.style.margin = "4px auto";
        boardDisplay.style.width = w + 'px';
        boardDisplay.style.height = h + 'px';
        document.getElementById('main-display').appendChild(boardDisplay);
    }

    createCurrentPlayerDisplay() {
        const currentPlayerDisplay = document.createElement('div');
        currentPlayerDisplay.id = 'current-player-display';
        currentPlayerDisplay.style.backgroundColor = 'rgba(25, 175, 25, 0.3)';
        currentPlayerDisplay.innerText = `C'est le tour du joueur : ${this.currentPlayer}`;
        document.getElementById('main-display').appendChild(currentPlayerDisplay);
    }

    createVictoryDisplay() {
        const victoryDisplay = document.createElement('p');
        victoryDisplay.id = 'victory-display';
        victoryDisplay.style.backgroundColor = 'rgba(25, 175, 25, 0.3)';
        victoryDisplay.style.margin = '0';
        document.getElementById('main-display').appendChild(victoryDisplay)
    }

    createRevokeBtn() {
        const btn = document.createElement('button');
        btn.id = 'btn-revoke';
        btn.innerText = 'Annuler le dernier pion';
        btn.style.backgroundColor = 'rgba(25, 175, 25, 0.3)';
        btn.style.height = '35px';
        btn.style.width = 'fit-content';
        btn.style.alignSelf = 'center';
        btn.style.padding = '0.25rem 1rem';
        document.getElementById('main-display').appendChild(btn);
    }

    createResetBtn() {
        const btn = document.createElement('button');
        btn.id = 'btn-reset';
        btn.innerText = 'Recommencer';
        btn.style.backgroundColor = 'rgba(25, 175, 25, 0.3)';
        btn.style.display = 'none';
        btn.style.height = '35px';
        btn.style.width = 'fit-content';
        btn.style.alignSelf = 'center';;
        btn.style.padding = '0.25rem 1rem'
        document.getElementById('main-display').appendChild(btn);
    }

    doColorInputShow(state, plrs) {
        if (state == 'on') {
            document.getElementById(`picker-${plrs[0].getId}`).disabled = false;
            document.getElementById(`picker-${plrs[1].getId}`).disabled = false;
        } else {
            document.getElementById(`picker-${plrs[0].getId}`).disabled = true;
            document.getElementById(`picker-${plrs[1].getId}`).disabled = true;
        }
    }

    doResetBtnShow(state) {
        if (state == 'on') {
            document.getElementById('btn-reset').style.display = 'block';
        } else {
            document.getElementById('btn-reset').style.display = 'none';
        }
    }

    update(target) {
        document.getElementById('current-player-display').innerText = `C'est le tour du joueur : ${target}`;
    }

    showWinner(target, looser) {
        document.getElementById('current-player-display').innerText = `Le joueur ${target.getId} gagne la partie !`;
        this.updateVictoryDisplay(target, looser);
    }

    updateVictoryDisplay(target, looser) {
        document.getElementById('victory-display').innerText = `Conteur de victoires\nJoueur ${target.getId} : ${target.getVicotryCounter}\nJoueur ${looser.getId} : ${looser.getVicotryCounter}`
    }

    OnDraw() {
        document.getElementById('current-player-display').innerText = `C'est une égalité !\nAppuyez sur le boutton pour rejouer`;
    }
}
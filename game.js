import { Player } from "./player.js";
import { Token } from "./token.js";
import { HUD } from "./HUD.js";

export class Game {
    constructor(rows = 6, cols = 7, tokenSize = 70, plrs = [{ id: 1, color: '#ff0000' }, { id: 2, color: '#edd400' }]) {
        this.resetCSS();
        this.board = []
        this.rows = rows
        this.columns = cols
        this.tokenSize = tokenSize
        this.player1 = new Player(plrs[0].id, plrs[0].color);
        this.player2 = new Player(plrs[1].id, plrs[1].color);
        this.currentPlayer = this.player1.getId;
        this.tokenMargin = 5
        this.tokenBorder = 5
        this.tokenConfig = { size: tokenSize, offset: (this.tokenMargin * 2 + this.tokenBorder * 2), cols: cols, rows: rows }
        this.player1.createPlayerColor(this.player2)
        this.player2.createPlayerColor(this.player1)
        this.HUD = new HUD(this.currentPlayer, this.tokenConfig);
        this.currentCol = []
        this.numberOfTokens = 0
        document.getElementById('btn-revoke').addEventListener('click', () => {
            if (this.gameOver) { return }
            this.revokeLastTokenPlaced();
            this.isRevoke = false;
        })
        document.getElementById('btn-reset').addEventListener('click', () => {
            this.clearBoard()
        })
        this.gameOver = false;
    }

    resetCSS() {
        document.querySelector('body').style.margin = '0'
        document.querySelector('body').style.padding = '0'
    }

    winnerWinnerChikenDinner(row, col) {
        if (this.board[row][col] == this.player1.getId) {
            this.player1.setVicotryCounter = 1;
            this.HUD.showWinner(this.player1, this.player2)
            this.HUD.doResetBtnShow('on');
        } else {
            this.player2.setVicotryCounter = 1;
            this.HUD.showWinner(this.player2, this.player1)
            this.HUD.doResetBtnShow('on');
        }
        this.gameOver = true
    }

    verifyWinCases() {
        if (this.numberOfTokens == this.rows * this.columns) {
            this.HUD.doResetBtnShow('on');
            this.HUD.OnDraw();
        }

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 3; col++) {
                if (this.board[row][col] != ' ') {
                    if (
                        this.board[row][col] == this.board[row][col + 1] &&
                        this.board[row][col + 1] == this.board[row][col + 2] &&
                        this.board[row][col + 2] == this.board[row][col + 3]
                    ) {
                        this.winnerWinnerChikenDinner(row, col)
                        return
                    }
                }
            }
        }

        for (let col = 0; col < this.columns; col++) {
            for (let row = 0; row < this.rows - 3; row++) {
                if (this.board[row][col] != ' ') {
                    if (
                        this.board[row][col] == this.board[row + 1][col] &&
                        this.board[row + 1][col] == this.board[row + 2][col] &&
                        this.board[row + 2][col] == this.board[row + 3][col]
                    ) {
                        this.winnerWinnerChikenDinner(row, col)
                        return
                    }
                }
            }
        }

        for (let row = 0; row < this.rows - 3; row++) {
            for (let col = 0; col < this.columns - 3; col++) {
                if (this.board[row][col] != ' ') {
                    if (
                        this.board[row][col] == this.board[row + 1][col + 1] &&
                        this.board[row + 1][col + 1] == this.board[row + 2][col + 2] &&
                        this.board[row + 2][col + 2] == this.board[row + 3][col + 3]
                    ) {
                        this.winnerWinnerChikenDinner(row, col)
                        return
                    }
                }
            }
        }

        for (let row = 3; row < this.rows; row++) {
            for (let col = 0; col < this.columns - 3; col++) {
                if (this.board[row][col] != ' ') {
                    if (
                        this.board[row][col] == this.board[row - 1][col + 1] &&
                        this.board[row - 1][col + 1] == this.board[row - 2][col + 2] &&
                        this.board[row - 2][col + 2] == this.board[row - 3][col + 3]
                    ) {
                        this.winnerWinnerChikenDinner(row, col)
                        return
                    }
                }
            }
        }
    }

    gameLoop() {
        this.setCurrentCol()
        for (let r = 0; r < this.rows; r++) {
            let row = []
            for (let cols = 0; cols < this.columns; cols++) {
                row.push(' ')
                let token = new Token(r.toString(), cols.toString(), this.tokenMargin, this.tokenBorder, this.tokenSize);
                token.token_spot.addEventListener('click', (e) => {
                    this.placeToken(e);
                })
                document.getElementById('board').append(token.token_spot)
            }
            this.board.push(row)
        }
    }

    placeToken(e) {
        if (this.gameOver) { return }

        let coords = e.target.id.split('-')
        let row = parseInt(coords[0])
        let col = parseInt(coords[1])

        if (row < 0) { return }

        row = this.currentCol[col]
        this.HUD.doColorInputShow('off', [this.player1, this.player2])
        this.isRevoke = true
        this.board[row][col] = this.currentPlayer;
        this.lastTokenPlaced = []
        this.lastTokenPlaced.push(row)
        this.lastTokenPlaced.push(col)

        let token = document.getElementById(row.toString() + '-' + col.toString())

        if (this.currentPlayer == this.player1.getId) {
            token.style.backgroundColor = this.player1.getColor
            this.currentPlayer = this.player2.getId
        } else {
            token.style.backgroundColor = this.player2.getColor
            this.currentPlayer = this.player1.getId
        }

        row -= 1
        this.currentCol[col] = row
        this.numberOfTokens++;
        this.HUD.update(this.currentPlayer);
        this.verifyWinCases();
    }

    revokeLastTokenPlaced() {
        if (this.isRevoke) {
            this.currentPlayer == 2 ? this.currentPlayer = this.player1.getId : this.currentPlayer = this.player2.getId;
            this.HUD.update(this.currentPlayer);
            document.getElementById(this.lastTokenPlaced[0] + '-' + this.lastTokenPlaced[1]).style.backgroundColor = 'white';
            this.board[this.lastTokenPlaced[0]][this.lastTokenPlaced[1]] = ' ';
            this.currentCol[this.lastTokenPlaced[1]] = this.lastTokenPlaced[0];
        }
    }

    setCurrentCol() {
        for (let i = 0; i < this.columns; i++) {
            this.currentCol[i] = this.rows - 1
        }
    }

    clearBoard() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                this.board[row][col] = ' ';
            }
        }

        const children = document.getElementById('board').childNodes;
        for (let i = 0; i < children.length; i++) {
            children[i].style.backgroundColor = "white";
        }

        this.HUD.update(this.currentPlayer);
        this.setCurrentCol();
        this.HUD.doColorInputShow('on', [this.player1, this.player2])
        this.numberOfTokens = 0;
        this.HUD.doResetBtnShow('off');
        this.isRevoke = false;
        this.gameOver = false;
    }
}

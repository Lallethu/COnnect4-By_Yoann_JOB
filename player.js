export class Player {
    constructor(id = String | Number, color = String) {
        this._id = id;
        this._color = color;
        this._victoryCounter = 0;
    }

    get getId() {
        return this._id;
    }

    get getColor() {
        return this._color;
    }

    get getVicotryCounter() {
        return this._victoryCounter;
    }

    set setVicotryCounter(val) {
        this._victoryCounter += val;
    }

    set setColor(val) {
        this._color = val;
    }

    isColorTaken(otherPlayer) {
        if (this.getColor == otherPlayer.getColor) {
            return true;
        }
        return false;
    }

    createPlayerColor(otherPlayer) {
        const playerInfo = document.createElement('div');
        playerInfo.id = `info-${this.getId}`;
        playerInfo.innerText = `Joueur ${this.getId}`;
        playerInfo.style.display = 'flex';
        playerInfo.style.alignItems = 'center';
        playerInfo.style.justifyContent = 'center';
        playerInfo.style.backgroundColor = 'rgba(25, 175, 25, 0.3)';

        const colorPicker = document.createElement('input');
        colorPicker.id = `picker-${this.getId}`;
        colorPicker.type = 'color';
        colorPicker.value = this.getColor;
        colorPicker.style.margin = '4px';
        colorPicker.addEventListener('change', (e) => {
            this.setColor = e.target.value;
            if (this.isColorTaken(otherPlayer)) {
                otherPlayer.setColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            }
            document.getElementById(`picker-${otherPlayer.getId}`).value = otherPlayer.getColor;
        })
        playerInfo.appendChild(colorPicker);
        document.querySelector('body').appendChild(playerInfo);
    }
}
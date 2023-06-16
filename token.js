export class Token {
    constructor(x, y, margin, border, size) {
        this.token_spot = document.createElement('div');
        this.token_spot.id = `${x}-${y}`;
        this.token_spot.style.width = `${size}px`;
        this.token_spot.style.height = `${size}px`;
        this.token_spot.style.margin = `${margin}px`;
        this.token_spot.style.border = `${border}px solid navy`;
        this.token_spot.style.backgroundColor = "white";
        this.token_spot.style.borderRadius = '50%';
    }
}
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Spiner {
    src: HTMLElement;
    constructor() { }
    close(): void {
        this.src = document.getElementById('nb-global-spinner');
        this.src.style.display = 'none';
    }
    open() {
        this.src = document.getElementById('nb-global-spinner');
        this.src.style.display = 'block';
    }
}

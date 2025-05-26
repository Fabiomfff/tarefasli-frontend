import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-side-menu',
    imports: [],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
    userName!: string;
    constructor (private router: Router) {}

    ngOnInit() {
        this.userMenu = false;
        this.userName = localStorage.getItem('nome') || '';
    }

    userMenu: boolean = false;
    logout() {
        localStorage.clear();
        setTimeout(() => {
            this.router.navigate(['']);
        }, 500);
        
    }
}

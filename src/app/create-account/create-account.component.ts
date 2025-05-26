import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  imports: [
        FormsModule,
        CommonModule
    ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

    constructor(private LoginService: LoginService, private router: Router){}
    usuario: string = '';
    password: string = '';

    ngOnInit(): void {
        let usernameLs = localStorage.getItem('username');
        if (usernameLs) this.LoginService.username = usernameLs;
        
        if (this.LoginService.username.length > 0) this.router.navigate(['home']);
    }  

    accountCreated: boolean = false;
    loadingSubmit: boolean = false;
    
    onSubmit() {
        this.loadingSubmit = true;
        this.accountCreated = false;
        this.LoginService.createAccount(this.usuario.toLowerCase(), this.password.toLowerCase()).subscribe(
            (response: any) => {
                this.accountCreated = true;
                this.loadingSubmit = false;
                setTimeout(() => {
                    this.router.navigate(['login']);
                }, 5000);
            },
            (error: any) => {
                console.log(error);
                this.loadingSubmit = false;
            }
        );
    }
}

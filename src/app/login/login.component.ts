import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        CommonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    constructor(private LoginService: LoginService, private router: Router){}
    usuario: string = '';
    password: string = '';

    ngOnInit(): void {
        let usernameLs = localStorage.getItem('nome');
        let userToken= localStorage.getItem('token');
        if (usernameLs && userToken) this.LoginService.username = usernameLs;
        if (userToken) this.router.navigate(['home']);
    }

    errLogin: boolean = false;
    loadingReq: boolean = false;
    onSubmit() {
        this.errLogin = false;
        this.loadingReq = true;
        this.LoginService.username = this.usuario;

        this.LoginService.login(this.usuario.toLowerCase(), this.password.toLowerCase()).subscribe(
            (response:any) => {
                this.loadingReq = false;
                console.log(response)
                localStorage.setItem ('token', response.token);
                localStorage.setItem ('nome', response.user.nome);

                this.router.navigate(['home'])

            }, (error: any) => {
                this.errLogin = true;
                this.loadingReq = false;

                setTimeout(() => {
                    this.errLogin = false;
                }, 4000);
                console.log(error)
        });
    }
}

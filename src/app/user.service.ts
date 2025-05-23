import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   
    private apiUrl = 'https://tarefasli-backend.onrender.com';



    constructor(private http: HttpClient, private router: Router) { }

    currentUser(token: any)  {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get(`${this.apiUrl}/eu`, {headers}).subscribe(
            (response: any) => {
                localStorage.setItem('nome', response.nome);
            },
            (error: any) => {
                console.log(error)
            }
        );
    }
}

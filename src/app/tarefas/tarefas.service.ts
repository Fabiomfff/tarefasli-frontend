import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TarefasService {
    token: string = '';
    ngOnInit(): void {
        this.token = localStorage.getItem('token') || '';        
    }
    constructor(private http: HttpClient, private router: Router) { }
    
    private apiUrl = 'https://tarefasli-backend.onrender.com';
    userName!: string;
    tarefas: any;
    loading: any;

    listTarefas(token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        
        return this.http.get(`${this.apiUrl}/tarefas`, {headers});
    }

    addTarefa(corpo: any, token: string)  {
         const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(`${this.apiUrl}/tarefas`, corpo, {headers});
    }
    
    updateTarefa (corpo: any, token: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(`${this.apiUrl}/tarefas/att`, corpo, {headers});
    }

      deleteTarefa (corpo: any, token: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(`${this.apiUrl}/tarefas/del`, corpo, {headers});
    }
}

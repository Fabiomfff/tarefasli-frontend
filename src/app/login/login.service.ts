import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {}

    username: string = '';

    private apiUrl = 'http://localhost:3000';

    login(username: string, password: string): Observable<any> {
        const params = { username, password };
        return this.http.get(`${this.apiUrl}/login`, { params });
    }

    createAccount(username: string, password: string): Observable<any> {
        const body = { username, password };
        return this.http.post(`${this.apiUrl}/createaccount`, body);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface responseStatus {
  data: String;
}

@Injectable({
  providedIn: 'root'
})


export class ServiceService {

  baseUrl = "http://localhost:8080/home/";
  url = "";

  constructor(private http: HttpClient) { }

  play(value: number): Observable<any> {
    this.url = this.baseUrl + "play?rollValue=" + value
    return this.http.get<responseStatus>(this.url);
  }

  restart(): Observable<any> {
    this.url = this.baseUrl + "restart"
    return this.http.post<responseStatus>(this.url, "Restart");
  }
}

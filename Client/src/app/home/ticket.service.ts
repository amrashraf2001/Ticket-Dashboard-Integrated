import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'https://localhost:7169/api';

  constructor(private http: HttpClient) { }

  getTickets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tickets`);
  }

  getTicket(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tickets/${id}`);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Tickets`, ticket);
  }

  updateTicket(id: number, ticket: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Tickets/${id}`, ticket);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Tickets/${id}`);
  }

  deleteAllTickets(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Tickets`);
  }

  getTicketsTotalPrices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tickets/getTicketsTotalPrices`);
  }

  getTicketsTotalPricesByType(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tickets/getTicketsTotalPricesByType/${type}`);
  }

  getTicketsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Tickets/getTicketsCount`);
  }

  getTicketsCountByType(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tickets/getTicketsCountByType/${type}`);
  }

  getTodayTicketsCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tickets/getTodayTicketsCount`);
  }

  getTodayTicketsPrices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tickets/getTodayTicketsPrices`);
  }
}

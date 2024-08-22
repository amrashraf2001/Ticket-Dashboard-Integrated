import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { TicketService } from './ticket.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ticketCount: number = 0;
  todayTicketCount: number = 0;
  kioskTicketCount: number = 0;
  onlineTicketCount: number = 0;
  ticketTotalPrices: any = 0;
  todayTicketPrices: any = 0;
  kioskTicketPrices: any = 0;
  onlineTicketPrices: any = 0;
  quote: string | undefined;
  isLoading = false;
  cards = [
    { title: 'إجمالي التذاكر', value: this.ticketCount, bgClass: 'bg-orange', icon: 'fas fa-ticket-alt' },
    {
      title: 'إجمالي مبيعات التذاكر',
      value: this.ticketTotalPrices,
      bgClass: 'bg-orange',
      icon: 'fas fa-chart-line',
      sales: true,
    },
    { title: 'إجمالي تذاكر اليوم', value: this.todayTicketCount, bgClass: 'bg-blue', icon: 'fas fa-calendar-alt' },
    { title: 'إجمالي مبيعات اليوم', value: this.todayTicketPrices, bgClass: 'bg-blue', icon: 'fas fa-chart-line', sales: true },
    { title: 'إجمالي تذاكر الأكشاك', value: this.kioskTicketCount, bgClass: 'bg-yellow', icon: 'fas fa-store' },
    {
      title: 'إجمالي مبيعات أكشاك التذاكر',
      value: this.kioskTicketPrices,
      bgClass: 'bg-yellow',
      icon: 'fas fa-chart-line',
      sales: true,
    },
    { title: 'إجمالي تذاكر الأونلاين', value: this.onlineTicketCount, bgClass: 'bg-brown', icon: 'fas fa-mobile-alt' },
    {
      title: 'إجمالي مبيعات الأونلاين',
      value: this.onlineTicketPrices,
      bgClass: 'bg-brown',
      icon: 'fas fa-chart-line',
      sales: true,
    },
  ];

  constructor(private quoteService: QuoteService,private ticketService: TicketService) {}

  ngOnInit() {
    this.TicketCount();
    this.TodayTicketCount();
    this.KioskTicketCount();
    this.OnlineTicketCount();
    this.TicketTotalPrices();
    this.TodayTicketPrices();
    this.KioskTicketPrices();
    this.OnlineTicketPrices();
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  TicketCount(): any {
    this.ticketService.getTicketsCount().subscribe((data: any) => {
      this.ticketCount = data;
      this.cards[0].value = this.ticketCount;
    }
    );
  }

  TodayTicketCount(): any {
    this.ticketService.getTodayTicketsCount().subscribe((data: any) => {
      this.todayTicketCount = data;
      this.cards[2].value = this.todayTicketCount;
    }
    );
  }

  KioskTicketCount(): any {
    this.ticketService.getTicketsCountByType('Kiosk').subscribe((data: any) => {
      this.kioskTicketCount = data;
      this.cards[4].value = this.kioskTicketCount;
    }
    );
  }

  OnlineTicketCount(): any {
    this.ticketService.getTicketsCountByType('Online').subscribe((data: any) => {
      this.onlineTicketCount = data;
      this.cards[6].value = this.onlineTicketCount;
    }
    );
  }

  TicketTotalPrices(): any {
    this.ticketService.getTicketsTotalPrices().subscribe((data: any) => {
      this.ticketTotalPrices = data;
      this.cards[1].value = 'AED ' + this.ticketTotalPrices;
    }
    );
  }

  TodayTicketPrices(): any {
    this.ticketService.getTodayTicketsPrices().subscribe((data: any) => {
      this.todayTicketPrices = data;
      this.cards[3].value = 'AED ' + this.todayTicketPrices;
    }
    );
  }

  KioskTicketPrices(): any {
    this.ticketService.getTicketsTotalPricesByType('Kiosk').subscribe((data: any) => {
      this.kioskTicketPrices = data;
      this.cards[5].value = 'AED ' + this.kioskTicketPrices;
    }
    );
  }

  OnlineTicketPrices(): any {
    this.ticketService.getTicketsTotalPricesByType('Online').subscribe((data: any) => {
      this.onlineTicketPrices = data;
      this.cards[7].value = 'AED ' + this.onlineTicketPrices;
    }
    );
  }
}

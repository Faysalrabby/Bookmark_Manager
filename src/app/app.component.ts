import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoiceDetails = [];
  constructor(private service : AppService , private router : Router) { }


  

  ngOnInit(): void {
    
  }



 
}
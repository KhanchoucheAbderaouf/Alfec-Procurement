import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: AuthService,private route : Router,private http:HttpClient) { }

  ngOnInit(): void {
   
  }


  logout(){
    this.service.logout();
    this.route.navigate(['/login']);
  }
}

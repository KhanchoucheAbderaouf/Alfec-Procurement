import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  ThePath : string = this.route.url;
  constructor(private service: AuthService,private route : Router,private http:HttpClient) { }

  ngOnInit(): void {

  }


  logout(){
    this.service.logout();
    this.route.navigate(['/login']);
  }
}


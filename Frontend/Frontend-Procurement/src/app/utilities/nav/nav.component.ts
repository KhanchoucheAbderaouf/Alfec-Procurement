import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { GlobalsService } from '../globalvars/globals.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit  {
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  active : boolean = true;
  constructor(private vars : GlobalsService,private breakpointObserver: BreakpointObserver,private service: AuthService,private route : Router,private http:HttpClient) {}
  
  ngOnInit(): void {
   
    this.doSomething();
  }

  logout(){
    this.service.logout();
    window.location.href = "/"
  }
  spantext : string;
  doSomething(){
    this.spantext = this.vars.spanValue;
  }
}

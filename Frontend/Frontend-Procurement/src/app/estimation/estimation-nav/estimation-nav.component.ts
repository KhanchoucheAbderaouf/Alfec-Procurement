import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/security/auth.service';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-estimation-nav',
  templateUrl: './estimation-nav.component.html',
  styleUrls: ['./estimation-nav.component.css']
})
export class EstimationNavComponent implements OnInit  {
  
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
    this.route.navigate(['/login']);
  }
  spantext : string;
  doSomething(){
    this.spantext = this.vars.spanValue;
  }
}

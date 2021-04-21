import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/security/auth.service';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { DialogtauxchangeComponent } from '../dialogtauxchange/dialogtauxchange.component';

@Component({
  selector: 'app-adminsidenav',
  templateUrl: './adminsidenav.component.html',
  styleUrls: ['./adminsidenav.component.css']
})
export class AdminsidenavComponent implements OnInit  {
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  TauxChange : any = {}
  TauxChangeDollar : any = {}

  change : any
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(public dialog: MatDialog,private vars : GlobalsService,private breakpointObserver: BreakpointObserver,private service: AuthService,private route : Router,private http:HttpClient) {}
  
  ngOnInit(): void {
     this.Tauxchange();
     this.TauxchangeDollar();

  }

  logout(){
    this.service.logout();
    this.route.navigate(['/login']);
  }
 

  public Tauxchange(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.vars.urlAddress + ":8082/admin/change/index/euro",{headers,responseType:'json' as 'json'}).subscribe(data=>{
    this.TauxChange = data
    })
  }
  public update(data : number){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    this.http.get(this.vars.urlAddress + ":8082/admin/change/update/euro/"+data,{headers,responseType:'json' as 'json'}).subscribe(result=>{
      window.location.reload();
      
    });
  }
  public TauxchangeDollar(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.vars.urlAddress + ":8082/admin/change/index/dollar",{headers,responseType:'json' as 'json'}).subscribe(data=>{
    this.TauxChangeDollar = data
    })
  }
  public updateDollar(data : number){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    this.http.get(this.vars.urlAddress + ":8082/admin/change/update/dollar/"+data,{headers,responseType:'json' as 'json'}).subscribe(result=>{
      window.location.reload();
      
    });
  }
  Modif : String = "";

  openDialog(){

    const dialogRef = this.dialog.open(DialogtauxchangeComponent,{
      width: '70%',
      height: 'auto',
      data: {
        change : this.TauxChange
      }
    });
    //gonna need this to do a bihaviour for the after showing details like sending the product to cart for the commande thing
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.update(result);
        this.Modif = "Taux de Change de l'euro Modifier avec success"
        setTimeout(() => {
          this.Modif = ""
         }, 5000)
        }     
    });
  }


  openDialogDollar(){

    const dialogRef = this.dialog.open(DialogtauxchangeComponent,{
      width: '70%',
      height: 'auto',
      data: {
        change : this.TauxChangeDollar
      }
    });
    //gonna need this to do a bihaviour for the after showing details like sending the product to cart for the commande thing
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.updateDollar(result);
        this.Modif = "Taux de Change du Dollar Modifier avec success"
        setTimeout(() => {
          this.Modif = ""
         }, 5000)
         
        }     
    });
  }

}


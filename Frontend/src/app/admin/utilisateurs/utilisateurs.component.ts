import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogueComponent } from 'src/app/procurement/products/geg/dialogue/dialogue.component';
import { ConfirmationdialogComponent } from 'src/app/utilities/confirmationdialog/confirmationdialog.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { DialogconfirmsuppuserComponent } from '../dialogconfirmsuppuser/dialogconfirmsuppuser.component';
import { DialogPricesComponent } from '../services/procurement/dialog-prices/dialog-prices.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  displayedColumns: string[] = ["nom","prenom","email","telephone","poste","role","actions"];
  dataSource:  MatTableDataSource<[any]>;
  response : any[] = [];
  testing : boolean = false;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  initialData : any;
  AdminUser : any = JSON.parse(localStorage.getItem("currentUser") || "{}").role;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 

  constructor(public activatedRoute : ActivatedRoute,public dialog: MatDialog,private http:HttpClient,private url: GlobalsService) { 
    
    // Assign the data to the data source for the table to render
   this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
   
    this.allusers();
  }
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.dataSource.data.parametres.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  sortBy:string;

  
  public allusers(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/admin/users/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
     
      this.response =  data;
    
      
      this.dataSource = new MatTableDataSource<any>(this.response);
  
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.nom.toLocaleLowerCase().includes(filter)||
        data.prenom.toLocaleLowerCase().includes(filter) ||
        data.email.toLocaleLowerCase().includes(filter) ||
        data.telephone.toLocaleLowerCase().includes(filter) ||
        data.poste.toLocaleLowerCase().includes(filter) ||
        data.role.intitule.toString().includes(filter)
      }

      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: any) => {
        // property = this.sortBy;
         // console.log('item: '+JSON.stringify(item)+' '+' property: '+ property);
     switch (sortHeaderId) {
      case 'nom': {
        return data.nom;
        }
      case 'prenom': {
         return data.prenom;
        }
      case 'email': {
        return data.email;
        }
      case 'telephone': {
        return data.telephone;
        }  
      case 'poste': {
        return data.poste;
        }
      case 'role': {
        return data.role.intitule;
        }
      default: {
        return data[this.sortBy];
        }
        }
      };
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  


  personal : string;
  account : string;
  openDialogPersonal(data:any) {
    this.testing = true;

    const dialogRef = this.dialog.open(ModifyUserComponent,{
      width: '70%',
      height: 'auto',
      data: {
        result : data,
        typeupdate : "personal" 
      }
    });

    //gonna need this to do a bihaviour for the after showing details like sending the product to cart for the commande thing
    dialogRef.afterClosed().subscribe(result => {
      if(result == "personal") {
        
      this.personal = "Informations Personnelles Modifier avec success"
      this.response = [];
      this.allusers();
      setTimeout(() => {
      this.personal = ""
       }, 5000)
      } 
      else if(result == "account") {
        this.account = "Informations du compte Modifier avec success"
        this.response = [];
        this.allusers();
        setTimeout(() => {
        this.account = ""
         }, 5000)
        }      
    });
  }

  openDialogAccount(data:any) {
    this.testing = true;

    const dialogRef = this.dialog.open(ModifyUserComponent,{
      width: '70%',
      height: 'auto',
      data: {
        result : data,
        typeupdate : "account" 
      }
    });

    //gonna need this to do a bihaviour for the after showing details like sending the product to cart for the commande thing
    dialogRef.afterClosed().subscribe(result => {
      if(result == "personal") {
        
      this.personal = "Informations Personnelles Modifier avec success"
      this.response = [];
      this.allusers();
      setTimeout(() => {
      this.personal = ""
       }, 5000)
      } 
      else if(result == "account") {
        this.account = "Informations du compte Modifier avec success"
        this.response = [];
        this.allusers();
        setTimeout(() => {
        this.account = ""
         }, 5000)
        }      
    });
  }

  supprimer(iduser : number){
    const headers = new HttpHeaders().set("Authorization", this.token);
    
    this.http.delete(this.url.urlAddress + ":8082/admin/users/delete/" + iduser, { headers, responseType: 'json' as 'json' }).subscribe(result => {
    }, (error) => {
      console.log(error.error.message)
    }
    )
  
  }
  
  openDialogDelete(row : any) {
    const dialogRef = this.dialog.open(DialogconfirmsuppuserComponent,{
      width: 'auto',
      height: 'auto',
      data: {
        result : row,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supprimer(result.iduser);
        this.account = "L'utilisateur a été supprimer avec success"
        this.response = [];
        this.allusers();
        setTimeout(() => {
        this.account = ""
         }, 5000)
        window.location.reload()  


      };
    });
  }


  
}
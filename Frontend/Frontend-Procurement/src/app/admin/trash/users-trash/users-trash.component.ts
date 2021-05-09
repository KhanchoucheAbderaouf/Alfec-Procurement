import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationdialogComponent } from 'src/app/utilities/confirmationdialog/confirmationdialog.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-users-trash',
  templateUrl: './users-trash.component.html',
  styleUrls: ['./users-trash.component.css']
})
export class UsersTrashComponent implements OnInit {
  displayedColumns: string[] = ["Nom","Prenom","Email","Telephone","Poste","Role","Actions"];
  dataSource:  MatTableDataSource<[any]>;
  response : any[] = [];
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private url : GlobalsService,private titleService : Title,public activatedRoute : ActivatedRoute,public dialog: MatDialog,private http:HttpClient) { 
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit(): void {
    this.url.spanValue = "Users Trash"
    this.titleService.setTitle("Corbeille")
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
    return this.http.get(this.url.urlAddress + ":8082/admin/users/trash/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      
      this.response = data;
        
      this.dataSource = new MatTableDataSource<any>(this.response);

      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: any) => {
        // property = this.sortBy;
         // console.log('item: '+JSON.stringify(item)+' '+' property: '+ property);
     switch (sortHeaderId) {
      case 'Nom': {
        return data.nom;
        }
      case 'Prenom': {
        return data.prenom;
        }
      case 'Email': {
         return data.email;
        }
      case 'Telephone': {
        return data.telephone;
        }
      case 'Poste': {
        return data.poste;
        }  
      case 'Role': {
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

    openDialogRecover(row : any){
      const dialogRef = this.dialog.open(ConfirmationdialogComponent,{
        width: 'auto',
        height: 'auto',
        data: {
          recovery : "user",
          result : row
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.recover(row.iduser);
        } 
      });
    }

    openDialogDelete(row : any) {
      const dialogRef = this.dialog.open(ConfirmationdialogComponent,{
        width: 'auto',
        height: 'auto',
        data: {
          result : row
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.supprimer(row.iduser);
        } 
      });
    }

    supprimer(id : any){
      const headers = new HttpHeaders().set("Authorization", this.token);
      
      this.http.delete(this.url.urlAddress + ":8082/admin/users/trash/delete/" + id, { headers, responseType: 'json' as 'json' }).subscribe(result => {  
        window.location.reload() 
      }, (error) => {
        console.log(error.error.message)
      }
      )
    }

    recover(id : any){
      const headers = new HttpHeaders().set("Authorization", this.token);
      
      this.http.get(this.url.urlAddress + ":8082/admin/users/trash/recover/" + id, { headers, responseType: 'json' as 'json' }).subscribe(result => {  
        window.location.reload() 
      }, (error) => {
        console.log(error.error.message)
      }
      )
    }
    
}

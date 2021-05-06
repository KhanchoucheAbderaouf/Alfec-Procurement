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
  selector: 'app-product-trash',
  templateUrl: './product-trash.component.html',
  styleUrls: ['./product-trash.component.css']
})
export class ProductTrashComponent implements OnInit {
  displayedColumns: string[] = ["Code","Type","Fournisseur","Marque","Prix","Actions"];
  dataSource:  MatTableDataSource<[any]>;
  response : any[] = [];
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private url : GlobalsService,private titleService : Title,public activatedRoute : ActivatedRoute,public dialog: MatDialog,private http:HttpClient) { 
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit(): void {
    this.url.spanValue = "Products Trash"
    this.titleService.setTitle("Corbeille")
    this.allproducts();
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

  
  public allproducts(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/products/trash/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      
      this.response = data;
        
      this.dataSource = new MatTableDataSource<any>(this.response);

      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: any) => {
        // property = this.sortBy;
         // console.log('item: '+JSON.stringify(item)+' '+' property: '+ property);
     switch (sortHeaderId) {
      case 'Code': {
        return data.codep;
        }
      case 'Type': {
         return data.marque;
        }
      case 'Fournisseur': {
        return data.fournisseur.nomf;
        }
      case 'Marque': {
        return data.marque;
        }  
      case 'Prix': {
          return data.totalprice;
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
          recovery : "product",
          result : row
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.recover(row.idp);
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
          this.supprimer(row.idp);
        } 
      });
    }

    supprimer(id : any){
      const headers = new HttpHeaders().set("Authorization", this.token);
      
      this.http.delete(this.url.urlAddress + ":8082/products/trash/delete/" + id, { headers, responseType: 'json' as 'json' }).subscribe(result => {  
        window.location.reload() 
      }, (error) => {
        console.log(error.error.message)
      }
      )
    }

    recover(id : any){
      const headers = new HttpHeaders().set("Authorization", this.token);
      
      this.http.get(this.url.urlAddress + ":8082/products/trash/recover/" + id, { headers, responseType: 'json' as 'json' }).subscribe(result => {  
        window.location.reload() 
      }, (error) => {
        console.log(error.error.message)
      }
      )
    }
    
}

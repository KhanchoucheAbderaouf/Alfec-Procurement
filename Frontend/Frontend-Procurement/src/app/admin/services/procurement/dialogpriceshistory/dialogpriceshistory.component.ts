import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogueComponent } from 'src/app/procurement/products/geg/dialogue/dialogue.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { DialogPricesComponent } from '../dialog-prices/dialog-prices.component';

@Component({
  selector: 'app-dialogpriceshistory',
  templateUrl: './dialogpriceshistory.component.html',
  styleUrls: ['./dialogpriceshistory.component.css']
})
export class DialogpriceshistoryComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource:  MatTableDataSource<[any]>;
  response : any[] = [];
  testing : boolean = false;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  initialData : any;
  AdminUser : any = JSON.parse(localStorage.getItem("currentUser") || "{}").role;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 

  constructor(public dialogRef: MatDialogRef<DialogpriceshistoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public activatedRoute : ActivatedRoute,public dialog: MatDialog,private http:HttpClient,private url: GlobalsService) { 
    
    // Assign the data to the data source for the table to render
   this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.displayedColumns = ['OldPrice', 'NewPrice', 'DateChangement','TypeChanges', 'Reason']
    this.allproducthistory();
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

  
  public allproducthistory(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/admin/priceshistory/show/" + this.data.result.idp,{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      
      this.response = data;
       
      
      this.dataSource = new MatTableDataSource<any>(this.response);


        this.dataSource.filterPredicate = (data: any, filter: string) => {
            return data.oldprice.toString().toLocaleLowerCase().includes(filter)||
            data.newprice.toString().toLocaleLowerCase().includes(filter) ||
            data.datechangement.toString().toLocaleLowerCase().includes(filter) ||
            data.typechangement.toLocaleLowerCase().includes(filter) ||
            data.reason.toLocaleLowerCase().includes(filter)  
            }
     

      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: any) => {
        // property = this.sortBy;
         // console.log('item: '+JSON.stringify(item)+' '+' property: '+ property);
     switch (sortHeaderId) {
      case 'OldPrice': {
        return data.oldprice;
        }
      case 'NewPrice': {
         return data.newprice;
        } 
      case 'DateChangement': {
        return data.datechangement;
        }
      case 'TypeChanges': {
        return data.typechangement;
        }  
      case 'Reason': {
        return data.reason;
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
  
  
}

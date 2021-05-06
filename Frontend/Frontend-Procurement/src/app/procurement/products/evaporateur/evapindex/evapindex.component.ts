import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogPricesComponent } from 'src/app/admin/services/procurement/dialog-prices/dialog-prices.component';
import { DialogpriceshistoryComponent } from 'src/app/admin/services/procurement/dialogpriceshistory/dialogpriceshistory.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { EvapdialogComponent } from '../evapdialog/evapdialog.component';

@Component({
  selector: 'app-evapindex',
  templateUrl: './evapindex.component.html',
  styleUrls: ['./evapindex.component.css']
})
export class EvapindexComponent implements OnInit {

  displayedColumns: string[] = [];
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
    if(this.AdminUser === 'admin') {
      this.displayedColumns = ['CodeEVAP', 'FournisseurEVAP', 'MarqueEVAP','TypeEVAP','PuissanceFEVAP','ChambreEVAP','TypePrixEVAP','PrixEVAP','DetailsEVAP','HistoriqueEVAP','AddPrixEVAP']
    } else if (this.AdminUser === 'procurement'){
      this.displayedColumns = ['CodeEVAP', 'FournisseurEVAP', 'MarqueEVAP','TypeEVAP','PuissanceFEVAP','ChambreEVAP','PrixEVAP','DetailsEVAP']
    }
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
    return this.http.get(this.url.urlAddress + ":8082/products/index/EVAP",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      
      this.response = data;
       
      
      this.dataSource = new MatTableDataSource<any>(this.response);


        this.dataSource.filterPredicate = (data: any, filter: string) => {
        if(data.typeproductprice){
          return data.fournisseur.nomf.toLocaleLowerCase().includes(filter)||
          data.marque.toLocaleLowerCase().includes(filter) ||
          data.codep.toLocaleLowerCase().includes(filter) ||
          data.typeproductprice.toLocaleLowerCase().includes(filter) ||
          data.parametres.typeevap.toLocaleLowerCase().includes(filter)||
          data.parametres.utilisationchambre.toLocaleLowerCase().includes(filter) ||
          data.parametres.puissancef.toString().includes(filter);
        } else {
            return data.fournisseur.nomf.toLocaleLowerCase().includes(filter)||
            data.marque.toLocaleLowerCase().includes(filter) ||
            data.codep.toLocaleLowerCase().includes(filter) ||
            data.parametres.typeevap.toLocaleLowerCase().includes(filter) ||
            data.parametres.utilisationchambre.toLocaleLowerCase().includes(filter) ||
            data.parametres.puissancef.toString().includes(filter);

        } 
      }
     

      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: any) => {
        // property = this.sortBy;
         // console.log('item: '+JSON.stringify(item)+' '+' property: '+ property);
     switch (sortHeaderId) {
      case 'CodeEVAP': {
        return data.codep;
        }
      case 'MarqueEVAP': {
         return data.marque;
        }
      case 'FournisseurEVAP': {
        return data.fournisseur.nomf;
        }
      case 'TypeEVAP': {
        return data.parametres.typeevap;
        }  
      case 'PuissanceFEVAP' : {
        return data.parametres.puissancef;
      }
      case 'ChambreEVAP' : {
        return data.parametres.utilisationchambre;
      }
      case 'PrixEVAP': {
          return data.totalprice;
          }
      case 'TypePrixEVAP': {
          return data.typeproductprice;
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
  
  Modif : string;
  Supp : string;
  openDialog(data:any) {
    this.testing = true;

    const dialogRef = this.dialog.open(EvapdialogComponent,{
      width: '70%',
      height: 'auto',
      data: {
        result : data,
        path : this.activatedRoute.routeConfig?.path
      }
    });

    //gonna need this to do a bihaviour for the after showing details like sending the product to cart for the commande thing
    dialogRef.afterClosed().subscribe(result => {
      if(result == "Modifier") {
        
      this.Modif = "Modifier avec success"
      this.response = [];
      this.allproducts();
      setTimeout(() => {
      this.Modif = ""
       }, 5000)
      } 
      else if(result == "Supprimer") {
        this.Supp = "Le Produit a été supprimer avec success"
        this.response = [];
        this.allproducts();
        setTimeout(() => {
        this.Supp = ""
         }, 5000)
        }      
    });
  }

  openAddPrix(data:any) {
    this.testing = true;

    const dialogRef = this.dialog.open(DialogPricesComponent,{
      width: '70%',
      height: 'auto',
      data: {
        result : data,
      }
    });

    //gonna need this to do a bihaviour for the after showing details like sending the product to cart for the commande thing
    dialogRef.afterClosed().subscribe(result => {
      if(result == "Modifier") {
        
      this.Modif = "Prix Modifier avec success"
      this.response = [];
      this.allproducts();
      setTimeout(() => {
      this.Modif = ""
       }, 5000)
      }  else if(result == "Ajouter") {
        
        this.Modif = "Prix Ajouter avec success"
        this.response = [];
        this.allproducts();
        setTimeout(() => {
        this.Modif = ""
         }, 5000)
        }     
    });
  }
  
  openHistoriquePrix(data:any) {

    const dialogRef = this.dialog.open(DialogpriceshistoryComponent,{
      width: '80%',
      height: 'auto',
      data: {
        result : data,
      }
    });

    //gonna need this to do a bihaviour for the after showing details like sending the product to cart for the commande thing
   /* dialogRef.afterClosed().subscribe(result => {
          
    });*/
  }


  
}

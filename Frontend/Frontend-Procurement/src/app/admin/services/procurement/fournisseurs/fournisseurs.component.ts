import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { FournisseuralldialogComponent } from 'src/app/procurement/fournisseur/fournisseuralldialog/fournisseuralldialog.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css']
})
export class FournisseursComponent implements OnInit {
  formFournisseur : FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  constructor(public dialog: MatDialog,private http:HttpClient ,private vars: GlobalsService,private titleService : Title) { 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.allfournisseurs();
    this.vars.spanValue = "Fournisseurs";
    this.titleService.setTitle("Fournisseurs");
  }
 
  displayedColumns: string[] = ['Code', 'Nom', 'Activite','Adresse', 'Marques' ,'Details'];
  dataSource:  MatTableDataSource<[any]>;
  response : any;
  testing : boolean = false;
  token :string =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  initialData : any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.dataSource.data.parametres.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  sortBy:string;
  markfilter : string ="";
  
  public allfournisseurs(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.vars.urlAddress + ":8082/fournisseurs/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      this.response=data;
      this.dataSource = new MatTableDataSource<any>(this.response);

      /*for(let b of data.marques){
        this.markfilter = this.markfilter + b;
      }

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.numfournisseur.toLocaleLowerCase().includes(filter)||
        data.nomf.toString().toLocaleLowerCase().includes(filter) ||
        data.activite.toString().toLocaleLowerCase().includes(filter) ||
        data.adresse.toLocaleLowerCase().includes(filter);
      }*/

      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: any) => {
        // property = this.sortBy;
         // console.log('item: '+JSON.stringify(item)+' '+' property: '+ property);
     switch (sortHeaderId) {
      case 'Code': {
        return data.numfournisseur;
        }
      case 'Nom': {
         return data.nomf;
        }
      case 'Activite': {
        return data.activite;
        }
      case 'Adresse': {
        return data.adresse;
        }  
      case 'Marques': {
        return data.marques;
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

    const dialogRef = this.dialog.open(FournisseuralldialogComponent,{
      width: '70%',
      height: 'auto',
      data: {
        result : data
      }
    });

    //gonna need this to do a bihaviour for the after showing details like sending the product to cart for the commande thing
    dialogRef.afterClosed().subscribe(result => {
      if(result == "Modifier") {
      this.Modif = "Modifier avec success"
      this.allfournisseurs();
      setTimeout(() => {
      this.Modif = ""
       }, 5000)
      } 
      else if(result == "Supprimer") {
        this.Supp = "Le Produit a été supprimer avec success"
        this.allfournisseurs();
        setTimeout(() => {
        this.Supp = ""
         }, 5000)
        }      
    });
  }
}
export interface Marque {
  name: string;
}
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { EvapdialogComponent } from '../evapdialog/evapdialog.component';

@Component({
  selector: 'app-evapsearchresults',
  templateUrl: './evapsearchresults.component.html',
  styleUrls: ['./evapsearchresults.component.css']
})
export class EvapsearchresultsComponent implements OnInit {
  Modif : string;
  Supp : string;
  constructor(public dialog: MatDialog,private vars : GlobalsService) { }

  ngOnInit(): void {
  }
  displayedColumns = ['CodeEVAP', 'FournisseurEVAP', 'MarqueEVAP','TypeEVAP','PuissanceFEVAP','ChambreEVAP','PrixEVAP','DetailsEVAP']
  datasource = this.vars.searchResults;

  openDialog(data:any) {
  
    const dialogRef = this.dialog.open(EvapdialogComponent,{
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
      setTimeout(() => {
      this.Modif = ""
       }, 5000)
      } 
      else if(result == "Supprimer") {
        this.Supp = "Le Produit a été supprimer avec success"
        setTimeout(() => {
        this.Supp = ""
         }, 5000)
        }      
    });
  }

}

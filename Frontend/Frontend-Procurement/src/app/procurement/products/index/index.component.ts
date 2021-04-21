import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit,AfterViewInit {
  
  categories : string[] = [ "GEG", "CTA","Ventilo Convecteur","Armoire de précision","Groupe Frigorifique","Chaudière","Roof Top","Pompe","Evaporateur"];


  constructor(private vars : GlobalsService,private titleService : Title) { 

  // set initial selection
  this.controleCategorie.setValue(this.categories);

  // load the initial category list
  this.CategoriesFiltrer.next(this.categories.slice());

  // listen for search field value changes
  this.FiltreCategorie.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCategories();
    });

  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.vars.spanValue = "Produits"
    this.titleService.setTitle("Produits")
  }


  details = [ "GEG", "CTA","Autre"];
  categorie : string = "";

   /** control for the selected category */
   public controleCategorie: FormControl = new FormControl();

   /** control for the MatSelect filter keyword */
   public FiltreCategorie: FormControl = new FormControl();
 
   /** list of categories filtered by search keyword */
   public CategoriesFiltrer: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
 
 
   @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
   
   protected filterCategories() {
     if (!this.categories) {
       return;
     }
     // get the search keyword
     let search = this.FiltreCategorie.value;
     if (!search) {
       this.CategoriesFiltrer.next(this.categories.slice());
       return;
     } else {
       search = search.toLowerCase();
     }
     // filter the categories
     this.CategoriesFiltrer.next(
       this.categories.filter(category => category.toLowerCase().indexOf(search) > -1)
     );
   }
   catego(){
    //this.categor = this.formProduit.value.categorie;
    this.categorie = this.controleCategorie.value;

    }
   /** Subject that emits when the component has been destroyed. */
   protected _onDestroy = new Subject<void>();
}

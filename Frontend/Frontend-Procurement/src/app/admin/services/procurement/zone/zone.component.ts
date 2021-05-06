import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogconfirmsuppuserComponent } from 'src/app/admin/dialogconfirmsuppuser/dialogconfirmsuppuser.component';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';
import { DialogpriceshistoryComponent } from '../dialogpriceshistory/dialogpriceshistory.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  formZone: FormGroup;
  formWilayaZone: FormGroup;
  formMarche: FormGroup;
  formBenefice : FormGroup;
  displayedColumns: string[] = [];
  displayedColumns2: string[] = [];
  dataSource:  MatTableDataSource<[any]>;
  dataSource2:  MatTableDataSource<[any]>;
  response : any[] = [];
  response2 : any[] = [];
  testing : boolean = false;
  token =  'Bearer ' + JSON.parse(localStorage.getItem("currentUser") || "{}").token;
  initialData : any;
  AdminUser : any = JSON.parse(localStorage.getItem("currentUser") || "{}").role;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  data : any = {
    result : {
      idp : 11
    }
  };

  constructor(public activatedRoute : ActivatedRoute,public dialog: MatDialog,private http:HttpClient,private url: GlobalsService) { 
    
    // Assign the data to the data source for the table to render
   this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {

  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.M, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.displayedColumns = ['NomZ', 'Remise', 'Wilayas','Actions']
    this.displayedColumns2 = ['Zone', 'Marche', 'Benefice','Actions']
    this.AllZones();
    this.initForm();
    this.AllWilayas();
    this.AllMarches();
    this.AllBenefices()
  }
  
  
  selectable = true;
  removable = true;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.dataSource.data.parametres.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    //this.dataSource.data.parametres.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  
  sortBy:string;
 
    Zone : boolean = false;
    WilayaZone : boolean = false;
    Marches : boolean = false;
    Benefice : boolean = false;
    ModifierModeBenefice : boolean = false
    ActivateBenefice(){
      if(this.Benefice){
        this.Benefice = false;
        this.ModifierModeBenefice = false
      } else {
        this.ModifierModeBenefice = false
        this.Benefice = true;
        this.Zone = false;
        this.WilayaZone = false;
        this.Marches = false;
        this.ActivatedAddMarche = false;
        this.formZone.reset()
        this.formWilayaZone.reset()
        this.formMarche.reset()
        this.formBenefice.reset()

      }
      
    }
   ActivateZone(){
    if(this.Zone){
      this.Zone = false;
      this.ModifierMode = false
    } else {
      this.ModifierMode = false
      this.Zone = true;
      this.WilayaZone = false;
      this.Marches = false;
      this.ActivatedAddMarche = false;
      this.formZone.reset()
      this.formWilayaZone.reset()
      this.formMarche.reset()
    }
    

   }
   ActivateWilayaZone(){
      if(this.WilayaZone){
        this.WilayaZone= false;
      }else {
        this.WilayaZone=true;
        this.Zone = false;
        this.Marches = false;
        this.formZone.reset()
        this.formWilayaZone.reset()
        this.formMarche.reset()
        this.ActivatedAddMarche = false;
      }

   }
   ActivateMarches(){
    if(this.Marches){
      this.Marches = false;
    } else {
      this.Marches = true;
      this.Zone = false;
      this.WilayaZone = false ;
      this.ActivatedAddMarche = false;
      this.formZone.reset()
      this.formWilayaZone.reset()
      this.formMarche.reset()
    }
   }
  

   AllZones(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/zone/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      this.response = data;
      this.dataSource = new MatTableDataSource<any>(this.response);
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: any) => {
        // property = this.sortBy;
         // console.log('item: '+JSON.stringify(item)+' '+' property: '+ property);
     switch (sortHeaderId) {
      case 'NomZ': {
        return data.nomz;
        }
      case 'Remise': {
         return data.remise;
        } 
      case 'Wilayas': {
        return data.wilayas.nomw;
        }
       
      default: {
        
        return data[this.sortBy];
        }
        }
      };
      
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort.toArray()[0];
    })
   }

   AllBenefices(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/zonemarche/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      this.response2 = data;
      this.dataSource2 = new MatTableDataSource<any>(this.response2);

      this.dataSource2.filterPredicate = (data: any, filter: string) => {
          return data.zone.nomz.toLocaleLowerCase().includes(filter)||
          data.marche.nomm.toLocaleLowerCase().includes(filter) ||
          data.benefice.toString().toLocaleLowerCase().includes(filter) 
           
        }
      this.dataSource2.sortingDataAccessor = (data: any, sortHeaderId: any) => {
        // property = this.sortBy;
         // console.log('item: '+JSON.stringify(item)+' '+' property: '+ property);
     switch (sortHeaderId) {
      case 'Zone': {
        return data.zone.nomz;
        }
      case 'Marche': {
         return data.marche.nomm;
        } 
      case 'Benefice': {
        return data.benefice;
        }
       
      default: {
        return data[this.sortBy];
        }
        }
      };
      
      this.dataSource2.paginator = this.paginator.toArray()[1];
      this.dataSource2.sort = this.sort.toArray()[1];
    })
   }


   W : any
   AllWilayas(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/wilaya/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      this.W = data
    })
   }

   M : any
   AllMarches(){
    const headers = new HttpHeaders().set("Authorization" , this.token);
    return this.http.get(this.url.urlAddress + ":8082/marche/index",{headers,responseType:'json' as 'json'})
    .subscribe((data : any)=>{
      this.M = data
    })
   }


   initForm() {
    this.formZone = new FormGroup({
        
        nomz : new FormControl("",[Validators.required]),
        remise : new FormControl(0,[Validators.required])
    })
    //,Validators.pattern('[a-zA-Z ]*')
    this.formWilayaZone = new FormGroup({
      idzone : new FormControl(0,[Validators.required]),
      idwilaya : new FormControl(0,[Validators.required])
    })

    this.formMarche = new FormGroup({
      nomm : new FormControl("",[Validators.required])
    })

    this.formBenefice = new FormGroup({
      idzone : new FormControl("",[Validators.required]),
      idmarche : new FormControl("",[Validators.required]),
      benefice : new FormControl(0,[Validators.required])
    })
   }
   errorMessage : String 
   loading : boolean

   createBenefice(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formBenefice.valid && !this.ModifierModeBenefice) {
    this.http.post(this.url.urlAddress + ":8082/zonemarche/create/"+this.formBenefice.value.idzone 
    + "/" + this.formBenefice.value.idmarche , this.formBenefice.value, { headers, responseType: 'json' as 'json' }).
      subscribe(result => {
        window.location.reload();
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
    } else if (this.formBenefice.valid){
      this.ModifierBenefice()
    }
   }

   createZone(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formZone.valid && !this.ModifierMode) {
    this.http.post(this.url.urlAddress + ":8082/zone/create", this.formZone.value, { headers, responseType: 'json' as 'json' }).
      subscribe(result => {
        window.location.reload();
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
    } if(this.formZone.valid){
      this.ModifierZoneRemise();
    }
   }

   annulerZone(){
      this.formZone.reset();
      this.Zone = false;
   }
   annulerBenefice(){
    this.formBenefice.reset();
    this.Benefice = false;
   }
   supprimer(id : any){
    const headers = new HttpHeaders().set("Authorization", this.token);
    
    this.http.delete(this.url.urlAddress + ":8082/zone/delete/" + id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
      window.location.reload()  
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
        result : row ,
        id : row.idzone
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supprimer(result.idzone);
        this.response = [];
        this.AllZones();
      };
    });
  }

  
  ModifierMode : boolean = false;
  idzone : number ;
  modifierZone(data : any){
    this.Zone = true;
    this.WilayaZone = false ;
    this.Marches = false;
    this.ModifierMode = true;
    this.formZone.patchValue({
      nomz : data.nomz,
      remise : data.remise
    });
    this.idzone = data.idzone
  }

  ModifierBenefice(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formBenefice.valid) {
    this.http.put(this.url.urlAddress + ":8082/zonemarche/update/" + this.formBenefice.value.idzone + "/" 
                  + this.formBenefice.value.idmarche, this.formBenefice.value, { headers, responseType: 'json' as 'json' }).
      subscribe(result => {
        window.location.reload();
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
    }
  }

  ModifierZoneRemise(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formZone.valid) {
    this.http.put(this.url.urlAddress + ":8082/zone/update/" + this.idzone, this.formZone.value, { headers, responseType: 'json' as 'json' }).
      subscribe(result => {
        window.location.reload();
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
    }
  }

  AddingWilayaToZone(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formWilayaZone.valid) {
      
    this.http.put(this.url.urlAddress + ":8082/wilaya/update/"+this.formWilayaZone.value.idwilaya
     + "/" + this.formWilayaZone.value.idzone, this.formWilayaZone.value, { headers, responseType: 'json' as 'json' }).
      subscribe(result => {
        window.location.reload();
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
    }
  }

  annulerWilayaZone(){
    this.formWilayaZone.reset();
    this.WilayaZone = false;
  }

  addMarches(){
    const headers = new HttpHeaders().set("Authorization", this.token);
    if (this.formMarche.valid) {
    this.http.post(this.url.urlAddress + ":8082/marche/create", this.formMarche.value, { headers, responseType: 'json' as 'json' }).
      subscribe(result => {
        window.location.reload();
      }, (error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
        this.loading = false;
      }
      )
    }
  }


  supprimerMarche(id : number){
    const headers = new HttpHeaders().set("Authorization", this.token);
    
    this.http.delete(this.url.urlAddress + ":8082/marche/delete/" + id, { headers, responseType: 'json' as 'json' }).subscribe(result => {
      window.location.reload()  
    }, (error) => {
      console.log(error.error.message)
    }
    )
  }

  remove(row : any){
      const dialogRef = this.dialog.open(DialogconfirmsuppuserComponent,{
        width: 'auto',
        height: 'auto',
        data: {
          result : row
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.supprimerMarche(result.idmarche);
          this.response = [];
          this.AllZones();
        };
      });
    
  }

  ActivatedAddMarche : boolean = false;
  ActivateAddMarche(){
    this.ActivatedAddMarche = !this.ActivatedAddMarche
  }

  annulerMarche(){
    this.formMarche.reset();
    this.ActivatedAddMarche = false
  }

  modifierBenefice(row : any){
    this.Benefice = true;
    this.Zone = false;
    this.WilayaZone = false ;
    this.Marches = false;
    this.ModifierModeBenefice = true;
    this.formBenefice.patchValue({
      idzone : row.zone.idzone,
      idmarche : row.marche.idmarche,
      benefice : row.benefice
    });
  }


  supprimerBenefice(id : number,id2 : number){
    const headers = new HttpHeaders().set("Authorization", this.token);
    
    this.http.delete(this.url.urlAddress + ":8082/zonemarche/delete/" + id + "/" + id2, { headers, responseType: 'json' as 'json' }).subscribe(result => {
      window.location.reload()  
    }, (error) => {
      console.log(error.error.message)
    }
    )
  }


  openDialogDeleteBenefice(row : any){
    const dialogRef = this.dialog.open(DialogconfirmsuppuserComponent,{
      width: 'auto',
      height: 'auto',
      data: {
        result : row,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supprimerBenefice(result.zone.idzone,result.marche.idmarche);
        this.response2 = [];
        this.AllBenefices();
      };
    });
  }
}

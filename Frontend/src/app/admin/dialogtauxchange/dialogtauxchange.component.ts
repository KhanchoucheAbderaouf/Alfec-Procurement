import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-dialogtauxchange',
  templateUrl: './dialogtauxchange.component.html',
  styleUrls: ['./dialogtauxchange.component.css']
})
export class DialogtauxchangeComponent implements OnInit {
    change : number = this.data.change
   
 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

 

}
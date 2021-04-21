import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogconfirmsuppuser',
  templateUrl: './dialogconfirmsuppuser.component.html',
  styleUrls: ['./dialogconfirmsuppuser.component.css']
})
export class DialogconfirmsuppuserComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
   
   }

  ngOnInit(): void {
     
    
  }

}

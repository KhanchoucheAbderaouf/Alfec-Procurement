import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalsService } from 'src/app/utilities/globalvars/globals.service';

@Component({
  selector: 'app-estimation-prices',
  templateUrl: './estimation-prices.component.html',
  styleUrls: ['./estimation-prices.component.css']
})
export class EstimationPricesComponent implements OnInit {

  constructor(private vars : GlobalsService,private titleService : Title) { }

  ngOnInit(): void {
    this.vars.spanValue = "Prix"
    this.titleService.setTitle("Prix")
    console.log(this.vars.EstimationProducts)

  }

}

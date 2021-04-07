import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[] = [];
  currentBrand:Brand | null;
  dataLoaded = false;
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
      this.dataLoaded = true;
    })
  }

  clearCurrent(){
    this.currentBrand = null;
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item btn btn-warning"
    }
    else{
      return "list-group-item"
    }
  }
  
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(this.currentBrand==brand){
      return "list-group-item btn btn-warning"
    }
    else{
      return "list-group-item"
    }
    
  }
}

package com.project.products.controller;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.products.models.PricesHistory;
import com.project.products.models.Product;
import com.project.products.models.TauxChange;
import com.project.products.repositories.ChangeRepository;
import com.project.products.repositories.ProductRepository;
import com.project.products.repositories.PricesHistoryRepository;

@RestController
@CrossOrigin
@RequestMapping("/admin/change")
public class changeController {

	
	@Autowired
	ChangeRepository changeRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	PricesHistoryRepository priceshistoryRepository;
	
	 
	 @GetMapping("/index/euro")
	    public double findTauxEuro() throws Exception{
		 if(changeRepository.findById((long) 1).isPresent()) {
		 return changeRepository.findById((long) 1).get().getCurrentvalue();
		 } else {
			 throw new Exception(
                     "Taux de Change is null");
		 }
	 }
	 @GetMapping("/index/dollar")
	    public double findTauxDollar() throws Exception{
		 if(changeRepository.findById((long) 2).isPresent()) {
		 return changeRepository.findById((long) 2).get().getCurrentvalue();
		 } else {
			 throw new Exception(
                  "Taux de Change is null");
		 }
	 }
	 
	 //special for Euro Products
	 @GetMapping("/update/euro/{taux}")
	 public double changeTauxEuro(@PathVariable("taux") double taux) {
		 List<Product> products = productRepository.findAll();
		 if(changeRepository.findById((long) 1).isPresent()) {
			 //verify if there is already a euro change value
			 TauxChange tc = changeRepository.findById((long) 1).get();
			 if(tc.getOldvalue() == 0 &&  taux != changeRepository.findById((long) 1).get().getCurrentvalue()) {
				 //first insert of the euro change value
				 tc.setCurrentvalue(taux);
				 tc.setOldvalue(taux);
				 changeRepository.save(tc);
				 return tc.getCurrentvalue();
				 
			 }else if( taux != changeRepository.findById((long) 1).get().getCurrentvalue()){
				 //insert if the new value is different than the current one
				 tc.setOldvalue(tc.getCurrentvalue());
				 tc.setCurrentvalue(taux);
				 for(Product p : products) {
					 //loop to refresh the prices of all euro products
					 if(p.getTypeproductprice() != null && p.getTypeproductprice().equals("euro")) {
						 //only for euro products
						 PricesHistory ph = new PricesHistory();
						 ph.setProduct(p);
						 ph.setOldprice(p.getTotalprice());
						 p.setDinarprice(p.getEuroprice() * taux);
						 p.setDollarprice(p.getDinarprice() / changeRepository.findById((long) 2).get().getCurrentvalue() );
						 p.setDouaneDinar(p.getDouane() * p.getDinarprice() / 100);
						 p.setFraisdiversDinar(p.getDinarprice() * p.getFraisdivers() / 100);
						 p.setTotalprice(p.getDinarprice() + p.getDouaneDinar() + p.getFraisdiversDinar());	
						 ph.setNewprice(p.getTotalprice());
						 ph.setReason("Changement dans le Taux de Change de l'Euro");
						 if(ph.getOldprice() < ph.getNewprice()) {
							 ph.setTypechangement("Augmenter");
						 } else {
							 ph.setTypechangement("Diminuer");
						 }
						 ph.setDatechangement(ZonedDateTime.now(ZoneId.of("Africa/Algiers")));
						 ph.setDatecreation(ZonedDateTime.now(ZoneId.of("Africa/Algiers")));
						 priceshistoryRepository.save(ph);
						  
					 } 	
				 }
				 changeRepository.save(tc);
				 return tc.getCurrentvalue();
			 } else {
				 //just a return
				 return changeRepository.findById((long) 1).get().getCurrentvalue();
			 }
		 } else {
			 //if the change doesn't exist
			 TauxChange tc = new TauxChange();
			 tc.setIdchange(1);
			 tc.setOldvalue(taux);
			 tc.setCurrentvalue(taux);
			 tc.setDate_creation(new Date());
			 changeRepository.save(tc);
			 return tc.getCurrentvalue();
		 }		 
	 }	
	 
	 @GetMapping("/update/dollar/{taux}")
	 public double changeTauxDollar(@PathVariable("taux") double taux) {
		 List<Product> products = productRepository.findAll();
		 if(changeRepository.findById((long) 2).isPresent()) {
			//verify if there is already a dollar change value
			 TauxChange tc = changeRepository.findById((long) 2).get();
			 if(tc.getOldvalue() == 0 &&  taux != changeRepository.findById((long) 2).get().getCurrentvalue()) {
				//first insert of the dollar change value
				 tc.setCurrentvalue(taux);
				 tc.setOldvalue(taux);
				 changeRepository.save(tc);
				 return tc.getCurrentvalue();
				 
			 }else if( taux != changeRepository.findById((long) 2).get().getCurrentvalue()){
				//insert if the new value is different than the current one
				 tc.setOldvalue(tc.getCurrentvalue());
				 tc.setCurrentvalue(taux);
				 for(Product p : products) {
					 if(p.getTypeproductprice() != null && p.getTypeproductprice().equals("dollar")) {
						 PricesHistory ph = new PricesHistory();
						 ph.setProduct(p);
						 ph.setOldprice(p.getTotalprice());
						 p.setDinarprice(p.getDollarprice() * taux);
						 p.setEuroprice(p.getDinarprice() / changeRepository.findById((long) 1).get().getCurrentvalue() );
						 p.setDouaneDinar(p.getDouane() * p.getDinarprice() / 100);
						 p.setFraisdiversDinar(p.getDinarprice() * p.getFraisdivers() / 100);
						 p.setTotalprice(p.getDinarprice() + p.getDouaneDinar() + p.getFraisdiversDinar());	
						 ph.setNewprice(p.getTotalprice());
						 ph.setReason("Changement dans le Taux de Change du Dollar");
						 if(ph.getOldprice() < ph.getNewprice()) {
							 ph.setTypechangement("Augmenter");
						 } else {
							 ph.setTypechangement("Diminuer");
						 }
						 ph.setDatechangement(ZonedDateTime.now(ZoneId.of("Africa/Algiers")));
						 ph.setDatecreation(ZonedDateTime.now(ZoneId.of("Africa/Algiers")));
						 priceshistoryRepository.save(ph);
					 }
				 }
				 changeRepository.save(tc);
				 return tc.getCurrentvalue();
			 } else {
				 //just a return
				 return changeRepository.findById((long) 2).get().getCurrentvalue();
			 }
		 } else {
			 //if the change doesn't exist
			 TauxChange tc = new TauxChange();
			 tc.setIdchange(2);
			 tc.setOldvalue(taux);
			 tc.setCurrentvalue(taux);
			 tc.setDate_creation(new Date());
			 changeRepository.save(tc);
			 return tc.getCurrentvalue();
		 }		 
	 }	
	 
	 
	 
}

package com.project.products.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.products.models.PricesHistory;
import com.project.products.models.Product;
import com.project.products.repositories.ProductRepository;
import com.project.products.repositories.PricesHistoryRepository;

@RestController
@CrossOrigin
@RequestMapping("/admin/priceshistory")
public class PricesHistoryController {
	
	@Autowired
	PricesHistoryRepository priceshistoryRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	@GetMapping("/index")
	public List<PricesHistory> allPricesHisotry(){
		return priceshistoryRepository.findAllByOrderByProductAsc();
	}
	
	@GetMapping("/show/{idp}")
	public List<PricesHistory> show(@PathVariable("idp") long idp){
		
		Product produit =  productRepository.findById(idp).get();
		return priceshistoryRepository.findAllByProductOrderByDatechangementDesc(produit);
		 
	}
	
	/*@PostMapping("/create")
	public PricesHistory addPriceHistory(@RequestBody PricesHistory priceshistory) {
		PricesHistory ph = new PricesHistory();
		ph.setProduct(priceshistory.getProduct());
		ph.setOldprice(priceshistory.getOldprice());
		ph.setNewprice(priceshistory.getNewprice());
		ph.setDatechangement(new Date());
		ph.setDatecreation(new Date());
		return priceshistoryRepository.save(ph);
	}
	
	@PutMapping("/update/{idpriceshistory}")
	public PricesHistory update(@RequestBody PricesHistory marche,@PathVariable("idpriceshistory") long idpriceshistory) {
		PricesHistory ph = priceshistoryRepository.findById(idpriceshistory).get();
		 
		return priceshistoryRepository.save(ph);
	}
	
	@DeleteMapping("/delete/{idpriceshistory}")
	public void delete(@PathVariable("idpriceshistory") long idpriceshistory) {
		
		priceshistoryRepository.delete(priceshistoryRepository.findById(idpriceshistory).get());
		
	}*/
}

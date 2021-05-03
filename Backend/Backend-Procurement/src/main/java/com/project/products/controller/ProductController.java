package com.project.products.controller;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.products.models.Fournisseur;
import com.project.products.models.PricesHistory;
import com.project.products.models.Product;
import com.project.products.models.ProductPrices;
import com.project.products.repositories.ChangeRepository;
import com.project.products.repositories.FournisseurRepository;
import com.project.products.repositories.PricesHistoryRepository;
import com.project.products.repositories.ProductRepository;
 

@RestController
@CrossOrigin
@RequestMapping("/procurement/products")
public class ProductController {
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	FournisseurRepository fournisseurRepository;
	
	@Autowired
	ChangeRepository changeRepository;
	
	@Autowired
	PricesHistoryRepository priceshistoryRepository;
	
	
	@GetMapping("/index")
    public List<Product> index(){

    	return productRepository.findByActive(true);
    }
	
	@GetMapping("/trash/index")
    public List<Product> trashindex(){

    	return productRepository.findByActive(false);
    }
	
	@GetMapping("/trash/recover/{id}")
    public Product recover(@PathVariable("id") long id){
		Product product = productRepository.findById(id).get();
		product.setActive(true);
    	return productRepository.save(product);
    }
	
	@GetMapping("/time")
	public ZonedDateTime datenow() {
		//ZonedDateTime a = ZonedDateTime.now(ZoneId.of("Africa/Algiers"));
		/*LocalDateTime now = LocalDateTime.now();  
        System.out.println("Before Formatting: " + a);  
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");  
        String formatDateTime = now.format(format);*/
		return ZonedDateTime.now(ZoneId.of("Africa/Algiers"));
	}
	@PostMapping("/create")
    public ResponseEntity<Product> insert(@RequestBody Product produit) throws Exception{
    
		
    	try {
    		Fournisseur f = fournisseurRepository.findById(produit.getFournisseur().getId()).get();
    		Product prod = productRepository.save(new Product(produit.getNomp(),produit.getCodep(),produit.getType(),produit.getTypeproductprice(),
    				produit.getParametres(),produit.getMarque(),f,new Date()));
    
    	    return new ResponseEntity<>(prod, HttpStatus.CREATED);
    		
    	  } catch (Exception e) {
    	    throw new Exception(e);
    	  }
    }
	
	@GetMapping("/show/{idproduct}")
	public Product show(@PathVariable("idproduct") long idproduct){
		
		return productRepository.findById(idproduct).get();
		
	}
	
    @PutMapping("/update/{idp}")
    public ResponseEntity<Product> update(@RequestBody Product produit,@PathVariable("idp") long idp){
    	try {
    		
    		Product p = productRepository.findById(idp).get();
    		p.setCodep(produit.getCodep());
    		p.setFournisseur(produit.getFournisseur());
    		p.setMarque(produit.getMarque());
    		p.setNomp(produit.getNomp());
    		p.setParametres(produit.getParametres());
    		p.setType(produit.getType());
    		Product prod = productRepository.save(p);
    	    
    	    return new ResponseEntity<>(prod, HttpStatus.CREATED);
    		
    	  } catch (Exception e) {
    	    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	  }
    }
    
    @DeleteMapping("/delete/{idp}")
    public void delete(@PathVariable("idp") long idp){
    	Product produit =  productRepository.findById(idp).get();
    	produit.setActive(false);
    	productRepository.save(produit);
    }
    
    @DeleteMapping("/trash/delete/{idp}")
    public void trashdelete(@PathVariable("idp") long idp){
    	Product produit =  productRepository.findById(idp).get();
    	productRepository.delete(produit);
    }
    
    
    @GetMapping("/index/{nomp}")
    public List<Product> indexByCatego(@PathVariable("nomp") String nomp){
    	
    	return productRepository.findByNompIgnoreCaseAndActive(nomp,true);
    }
    
    @PutMapping("/price/{idproduct}")
	public Product update(@RequestBody ProductPrices price,@PathVariable("idproduct") long idproduct) {
		Product p = productRepository.findById(idproduct).get();
		p.setTypeproductprice(price.getTypeproductprice());
		if(p.getTypeproductprice().equals("euro")) {
			//changement pour l'euro
			if(p.getTotalprice() != 0 && (price.getEuroprice() != p.getEuroprice()
					|| price.getDouane() != p.getDouane() || price.getFraisdivers() != p.getFraisdivers()) ) {
				PricesHistory ph = new PricesHistory();
				ph.setProduct(p);
				ph.setOldprice(p.getTotalprice());
				ph.setReason("");  
				if(p.getEuroprice() != price.getEuroprice()) {
					ph.setReason(ph.getReason()  +  "Changement dans le prix du Produit");
				}
				if(p.getDouane() != price.getDouane()) {
					ph.setReason(ph.getReason()  + "Changement dans le pourcentage des Tax Douane du Produit");
				}
				if(p.getFraisdivers() != price.getFraisdivers()) {
					ph.setReason( ph.getReason()  +  "Changement dans le pourcentage des Frais Divers du Produit");
				}
				ph.setDatechangement(ZonedDateTime.now(ZoneId.of("Africa/Algiers")));
				ph.setDatecreation(ZonedDateTime.now(ZoneId.of("Africa/Algiers")));
				p.setEuroprice(price.getEuroprice());
				p.setDouane(price.getDouane());	
				p.setFraisdivers(price.getFraisdivers());
				p.setDinarprice(price.getEuroprice() * changeRepository.findById((long)1).get().getCurrentvalue());
				p.setDollarprice(p.getDinarprice() / changeRepository.findById((long)2).get().getCurrentvalue());
				p.setDouaneDinar(p.getDouane() * p.getDinarprice() / 100);
				p.setFraisdiversDinar(p.getDinarprice() * p.getFraisdivers() / 100);
				p.setTotalprice(p.getDinarprice() + p.getDouaneDinar() + p.getFraisdiversDinar());
				
				ph.setNewprice(p.getTotalprice());
				if(ph.getOldprice() < ph.getNewprice()) {
					ph.setTypechangement("Augmenter");
				} else {
					ph.setTypechangement("Diminuer");
				}
				priceshistoryRepository.save(ph);
				return productRepository.save(p);
			} else {
				p.setEuroprice(price.getEuroprice());
				p.setDouane(price.getDouane());	
				p.setFraisdivers(price.getFraisdivers());
				p.setDinarprice(price.getEuroprice() * changeRepository.findById((long)1).get().getCurrentvalue());
				p.setDollarprice(p.getDinarprice() / changeRepository.findById((long)2).get().getCurrentvalue());
				p.setDouaneDinar(p.getDouane() * p.getDinarprice() / 100);
				p.setFraisdiversDinar(p.getDinarprice() * p.getFraisdivers() / 100);
				p.setTotalprice(p.getDinarprice() + p.getDouaneDinar() + p.getFraisdiversDinar()); 
				return productRepository.save(p);
			}	
		} else {
			if(p.getTotalprice() != 0 && (price.getDollarprice() != p.getDollarprice()
					|| price.getDouane() != p.getDouane() || price.getFraisdivers() != p.getFraisdivers())) {
				PricesHistory ph = new PricesHistory();
				ph.setProduct(p);
				ph.setOldprice(p.getTotalprice());
				ph.setReason("");  
				if(p.getDollarprice() != price.getDollarprice()) {
					ph.setReason(ph.getReason()  +  "Changement dans le prix du Produit");
				}
				if(p.getDouane() != price.getDouane()) {
					if(ph.getReason().equals("")) {
						ph.setReason(ph.getReason()  + "Changement dans le pourcentage des Tax Douane du Produit");
					}else {
						ph.setReason(ph.getReason()  + " + Changement dans le pourcentage des Tax Douane du Produit");
					}
					
				}
				if(p.getFraisdivers() != price.getFraisdivers()) {
					if(ph.getReason().equals("")) {
						ph.setReason( ph.getReason()  +  "Changement dans le pourcentage des Frais Divers du Produit");
					}else {
						ph.setReason( ph.getReason()  +  " + Changement dans le pourcentage des Frais Divers du Produit");
					}
					
				}
				ph.setDatechangement(ZonedDateTime.now(ZoneId.of("Africa/Algiers")));
				ph.setDatecreation(ZonedDateTime.now(ZoneId.of("Africa/Algiers")));
				p.setDollarprice(price.getDollarprice());
				p.setDouane(price.getDouane());	
				p.setFraisdivers(price.getFraisdivers());
				p.setDinarprice(price.getDollarprice() * changeRepository.findById((long)2).get().getCurrentvalue());
				p.setEuroprice(p.getDinarprice() / changeRepository.findById((long)1).get().getCurrentvalue());
				p.setDouaneDinar(p.getDouane() * p.getDinarprice() / 100);
				p.setFraisdiversDinar(p.getDinarprice() * p.getFraisdivers() / 100);
				p.setTotalprice(p.getDinarprice() + p.getDouaneDinar() + p.getFraisdiversDinar());
				ph.setNewprice(p.getTotalprice());
				if(ph.getOldprice() < ph.getNewprice()) {
					ph.setTypechangement("Augmenter");
				} else {
					ph.setTypechangement("Diminuer");
				}
				priceshistoryRepository.save(ph);
				return productRepository.save(p);
			} else {
				p.setDollarprice(price.getDollarprice());
				p.setDouane(price.getDouane());	
				p.setFraisdivers(price.getFraisdivers());
				p.setDinarprice(price.getDollarprice() * changeRepository.findById((long)2).get().getCurrentvalue());
				p.setEuroprice(p.getDinarprice() / changeRepository.findById((long)1).get().getCurrentvalue());
				p.setDouaneDinar(p.getDouane() * p.getDinarprice() / 100);
				p.setFraisdiversDinar(p.getDinarprice() * p.getFraisdivers() / 100);
				p.setTotalprice(p.getDinarprice() + p.getDouaneDinar() + p.getFraisdiversDinar());
				return productRepository.save(p);
			}
			
		} 
	}
   
}

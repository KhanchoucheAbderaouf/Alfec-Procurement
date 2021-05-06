package com.project.products.controller;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
import com.project.products.models.Product;
import com.project.products.repositories.FournisseurRepository;
import com.project.products.repositories.ProductRepository;




@RestController
@CrossOrigin
@Validated
@RequestMapping("/fournisseurs")
public class FournisseurController {
	@Autowired
	FournisseurRepository fournisseurRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	
    @PostMapping("/create")
    public ResponseEntity<Fournisseur> create(@Validated @RequestBody Fournisseur fournisseur){
    	
    	   try {
    		fournisseur.setActive(true);
    		fournisseur.setDate_creation(new Date());
   	    	Fournisseur fourni = fournisseurRepository.save(fournisseur);
   	    	return new ResponseEntity<>(fourni, HttpStatus.CREATED);
   	    	
   	    } catch (Exception e) {
   	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
   	    }
    }
    
    @GetMapping("/index")
    public List<Fournisseur> index(){

    	return fournisseurRepository.findByActive(true);
    }
    @GetMapping("/trash/index")
    public List<Fournisseur> trashindex(){

    	return fournisseurRepository.findByActive(false);
    }
    
    @DeleteMapping("/trash/delete/{id}")
    public void trashdelete(@PathVariable("id") long id){
    	Fournisseur fournisseur =  fournisseurRepository.findById(id).get();
    	List<Product> products = productRepository.findByFournisseur(fournisseur);
    	for(Product produit : products) {
    		productRepository.delete(produit);
    	}
    	fournisseurRepository.delete(fournisseur);
    }
    
    @GetMapping("/trash/recover/{id}")
    public Fournisseur recover(@PathVariable("id") long id){
		Fournisseur fournisseur = fournisseurRepository.findById(id).get();
		fournisseur.setActive(true);
    	return fournisseurRepository.save(fournisseur);
    }
    
    @GetMapping("/show/{id}")
    public  Fournisseur show(@Validated @PathVariable("id") long id){

    	return fournisseurRepository.findById(id).get();
    }
    
    @GetMapping("/marques/index")
    public Set<String> allmarques(){
    	List<Fournisseur> fournisseurs = fournisseurRepository.findAll();
    	Set<String> result = new HashSet<String>();
    	for(Fournisseur fourni : fournisseurs) {
    		for(String mark : fourni.getMarques())
    		result.add(mark);
    	}
    	 
    	return  result;
    }
    
    @GetMapping("/marques/{id}")
    public Set<String> fournisseurmarques(@Validated @PathVariable("id") long id){

    	Fournisseur fournisseur = fournisseurRepository.findById(id).get();
    	Set<String> result = new HashSet<String>();
    	for(String mark : fournisseur.getMarques()) result.add(mark);
    	
    	 
    	return result;
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Fournisseur> update (@RequestBody Fournisseur fournisseur,@PathVariable("id") long id){
    
    	try {
    		Fournisseur fourni = fournisseurRepository.findById(id).get();
    		fourni.setNumfournisseur(fournisseur.getNumfournisseur());
    		fourni.setNomf(fournisseur.getNomf());
    		fourni.setNumtel(fournisseur.getNumtel());
    		fourni.setNumfax(fournisseur.getNumfax());
    		fourni.setEmail(fournisseur.getEmail());
    		fourni.setContact(fournisseur.getContact());
    		fourni.setAdresse(fournisseur.getAdresse());
    		fourni.setCodefam(fournisseur.getCodefam());
    		fourni.setActivite(fournisseur.getActivite());
    		fourni.setNumfix(fournisseur.getNumfix());
    		fourni.setGarantie(fournisseur.getGarantie());
    		fourni.setConditionreglement(fournisseur.getConditionreglement());
    		fourni.setPaiement(fournisseur.getPaiement());
    		fourni.setMarques(fournisseur.getMarques());	
    		fourni.setDelailivraison(fournisseur.getDelailivraison());
    		fournisseurRepository.save(fourni);
    	    return new ResponseEntity<>(fourni, HttpStatus.CREATED);
    		
    	  } catch (Exception e) {
    	    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	  }
    }
    
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id){
    	Fournisseur f = fournisseurRepository.findById(id).get();
    	f.setActive(false);
    	fournisseurRepository.save(f);
    }
}
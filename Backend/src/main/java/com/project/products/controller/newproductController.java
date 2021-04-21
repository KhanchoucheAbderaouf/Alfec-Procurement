/*package com.project.products.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.products.models.Product;
import com.project.products.models.ProductUser;
import com.project.products.repositories.NewProductRepository;
import com.project.products.repositories.UserRepository;

@RestController
@CrossOrigin
@RequestMapping("/admin/newproduct")
public class newproductController {
	
	
	@Autowired
	NewProductRepository newproductRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/index")
	public List<ProductUser> indexvalid(){
		
		return newproductRepository.findAll();
	}
	
	@GetMapping("/show/{idproduct}")
	public ProductUser show(@PathVariable("idproduct") long idproduct){
		
		return newproductRepository.findById(idproduct).get();
		
	}
	
	@PostMapping("/create/{iduser}")
	public ProductUser create(@RequestBody Product product,@PathVariable("iduser") long iduser) {
		ProductUser p = new ProductUser();
		p.setDate_creation(new Date());
		p.setNomp(product.getNomp());
		p.setUser(userRepository.findById(iduser).get());
		return newproductRepository.save(p);
	}
	
	@DeleteMapping("/delete/{idproductuser}")
	public void delete(@PathVariable("idproductuser") long idproductuser) {

		 newproductRepository.delete(newproductRepository.findById(idproductuser).get());
	}
	
	
}*/

package com.project.products.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.products.models.Marche;
import com.project.products.repositories.MarcheRepository;

@RestController
@CrossOrigin
@RequestMapping("/admin/marche")
public class marcheController {
	
	
	@Autowired
	MarcheRepository marcheRepository;
	
	@GetMapping("/index")
	public List<Marche> allMarches(){
		return marcheRepository.findAll();
	}
	@GetMapping("/show/{idmarche}")
	public Marche show(@PathVariable("idmarche") long idmarche){
		
		return marcheRepository.findById(idmarche).get();
		
	}
	
	@PostMapping("/create")
	public Marche addMarche(@RequestBody Marche marche) {
		Marche m = new Marche();
		m.setNomm(marche.getNomm());
		return marcheRepository.save(m);
	}
	
	@PutMapping("/update/{idmarche}")
	public Marche update(@RequestBody Marche marche,@PathVariable("idmarche") long idmarche) {
		Marche m = marcheRepository.findById(idmarche).get();
		m.setNomm(marche.getNomm());
		return marcheRepository.save(m);
	}
	
	@DeleteMapping("/delete/{idmarche}")
	public void delete(@PathVariable("idmarche") long idmarche) {
		
		marcheRepository.delete(marcheRepository.findById(idmarche).get());
		
	}
}

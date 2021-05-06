package com.project.products.controller;

import java.util.Date;
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

import com.project.products.models.JustToSend;
import com.project.products.models.Wilayas;
import com.project.products.models.Zone;
import com.project.products.repositories.WilayaRepository;
import com.project.products.repositories.ZoneRepository;

@RestController
@CrossOrigin
@RequestMapping("/wilaya")
public class wilayaController {

	
	@Autowired
	WilayaRepository wilayaRepository;
	
	@Autowired
	ZoneRepository zoneRepository;
	
	
	 
	@GetMapping("/index")
	public List<Wilayas> index(){
	 
		return  wilayaRepository.findAllByOrderByNomwAsc();
		
	}
	
	@GetMapping("/show/{numwilaya}")
	public JustToSend show(@PathVariable("numwilaya") int numwilaya) {
			Wilayas w = wilayaRepository.findByNumwilaya(numwilaya).get();
			JustToSend a = new JustToSend();
			a.setIdwilaya(w.getIdwilaya());
			a.setNomw(w.getNomw());
			a.setNumwilaya(w.getNumwilaya());
			a.setZ(w.getZone());
			return a;
	}
	
	@PostMapping("/create/{nomz}")
	public Wilayas create(@RequestBody Wilayas wilaya,@PathVariable("nomz") String nomz) {
			Wilayas w = new Wilayas();
			w.setDate_creation(new Date());
			w.setNomw(wilaya.getNomw());
			w.setNumwilaya(wilaya.getNumwilaya());
			Zone zone = zoneRepository.findByNomz(nomz).get();
			w.setZone(zone);
			return wilayaRepository.save(w);			  
	}
	
	@PutMapping("/update/{idwilaya}/{idzone}")
	public Wilayas update(@PathVariable("idwilaya") long idwilaya,@PathVariable("idzone") long idzone) {
		Wilayas w = wilayaRepository.findById(idwilaya).get();
		Zone z = zoneRepository.findById(idzone).get();
		w.setZone(z);
		return wilayaRepository.save(w);
	}
	
	@DeleteMapping("/delete/{idwilaya}")
	public void delete(@PathVariable("idwilaya") long idwilaya) {
		Wilayas wilaya = wilayaRepository.findById(idwilaya).get();
		wilayaRepository.delete(wilaya);
	}
	
	
	
}

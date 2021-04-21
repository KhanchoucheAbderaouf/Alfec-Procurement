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
import com.project.products.models.Zone;
import com.project.products.models.ZoneMarche;
import com.project.products.repositories.MarcheRepository;
import com.project.products.repositories.ZoneMarcheRepository;
import com.project.products.repositories.ZoneRepository;

@RestController
@CrossOrigin
@RequestMapping("/admin/zonemarche")
public class zonemarcheController {
	
	@Autowired
	ZoneRepository zoneRepository;
	
	@Autowired
	MarcheRepository marcheRepository;
	
	
	@Autowired
	ZoneMarcheRepository zonemarcheRepository;
	
	@GetMapping("/index")
	public List<ZoneMarche> index(){
		return zonemarcheRepository.findAll();	
	}
	
	@GetMapping("show/{idzone}/{idmarche}")
	public ZoneMarche show(@PathVariable("idzone") long idzone,@PathVariable("idmarche") long idmarche) {
		
		Zone z = zoneRepository.findById(idzone).get();
		Marche marche = marcheRepository.findById(idmarche).get();
		ZoneMarche zm = new ZoneMarche();
		for(ZoneMarche zone : z.getZonemarche()) {
			if(zone.getMarche().equals(marche)) {
				zm =  zone;
				}
		}
		return zm;
	}
	
	@PostMapping("create/{idzone}/{idmarche}")
	public ZoneMarche create(@RequestBody ZoneMarche zonem,@PathVariable("idzone") long idzone,@PathVariable("idmarche") long idmarche) {
		ZoneMarche zm = new ZoneMarche();
		Zone zone = zoneRepository.findById(idzone).get();
		Marche marche = marcheRepository.findById(idmarche).get();
		zm.setZone(zone);
		zm.setMarche(marche);
		zm.setBenefice(zonem.getBenefice());
		return zonemarcheRepository.save(zm);
	}
	
	
	@PutMapping("update/{idzone}/{idmarche}")
	public ZoneMarche update(@RequestBody ZoneMarche zonem,@PathVariable("idzone") long idzone,@PathVariable("idmarche") long idmarche) {
		//ZoneMarche zm = show(nomz,nomm);
		Zone zone = zoneRepository.findById(idzone).get();
		Marche marche = marcheRepository.findById(idmarche).get();
		List<ZoneMarche> z = zonemarcheRepository.findByZone_idzone(zone.getIdzone()).get();
		ZoneMarche zm = new ZoneMarche();
		for(ZoneMarche a : z) {
			if(a.getMarche() == marche) {
				zm = a ;
			}
		}
		//System.out.print(zm.getBenefice());
		zm.setBenefice(zonem.getBenefice());
		//System.out.print(zm.getBenefice());
		return zonemarcheRepository.save(zm);
	}
	
	@DeleteMapping("delete/{idzone}/{idmarche}")
	public void delete(@PathVariable("idzone") long idzone,@PathVariable("idmarche") long idmarche) {
		 ZoneMarche zm = show(idzone,idmarche);

		 zonemarcheRepository.delete(zm);
	}
	
}

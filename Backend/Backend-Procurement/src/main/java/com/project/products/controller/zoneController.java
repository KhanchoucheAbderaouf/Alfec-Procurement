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

import com.project.products.models.Wilayas;
import com.project.products.models.Zone;
import com.project.products.models.ZoneMarche;
import com.project.products.repositories.WilayaRepository;
import com.project.products.repositories.ZoneMarcheRepository;
import com.project.products.repositories.ZoneRepository;

@RestController
@CrossOrigin
@RequestMapping("/zone")
public class zoneController {

	
	@Autowired
	ZoneMarcheRepository zonemarcheRepository;
	
	@Autowired
	ZoneRepository zoneRepository;
	
	@Autowired
	WilayaRepository wilayaRepository;
	
	@GetMapping("/index")
	public List<Zone> allZones(){
		return zoneRepository.findAll();
	}
	
	@GetMapping("/show/{idzone}")
	public Zone OneZone(@PathVariable("idzone") long idzone){
		//System.out.println(zoneRepository.findById(idzone).get().getNomz());
		return zoneRepository.findById(idzone).get();
	}
	
	@PostMapping("/create")
	public Zone addZone(@RequestBody Zone zone) {
		Zone z = new Zone();
		z.setDate_creation(new Date());
		z.setRemise(zone.getRemise());
		z.setNomz(zone.getNomz());
		//	z.setWilayas(zone.getWilayas());
		return zoneRepository.save(z);
	}
	
	@PutMapping("/update/{idzone}")
	public Zone update(@RequestBody Zone zone,@PathVariable("idzone") long idzone) {
		Zone z = zoneRepository.findById(idzone).get();
		z.setRemise(zone.getRemise());
		z.setNomz(zone.getNomz());
		//	z.setWilayas(zone.getWilayas());
		return zoneRepository.save(z);
	}
	
	@PutMapping("updateWilayas/{idzone}/{idwilaya}")
	public Zone addWilaya(@PathVariable("idzone") long idzone,@PathVariable("idwilaya") long idwilaya) {
		Wilayas wilaya = wilayaRepository.findById(idwilaya).get();
		Zone zone = zoneRepository.findById(idzone).get(); 
		zone.getWilayas().add(wilaya);
		return zoneRepository.save(zone);
	}
	
	@DeleteMapping("/delete/{idzone}")
	public void delete(@PathVariable("idzone") long idzone) throws Exception {
		try {
			List<ZoneMarche> zm = zonemarcheRepository.findByZone_idzone(idzone).get();
			for(ZoneMarche z : zm) {
				zonemarcheRepository.delete(z);
			}
			zoneRepository.deleteById(idzone);
		}catch(Exception e) {
			throw new Exception(e);
		}
		
	}
	
	
}

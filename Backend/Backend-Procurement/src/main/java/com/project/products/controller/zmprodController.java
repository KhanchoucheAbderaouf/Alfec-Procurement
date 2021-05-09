package com.project.products.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.products.models.Marche;
import com.project.products.models.Product;
import com.project.products.models.Search;
import com.project.products.models.Wilayas;
import com.project.products.models.Zone;
import com.project.products.models.ZoneMarche;
import com.project.products.models.ZoneMarcheProduct;
import com.project.products.repositories.MarcheRepository;
import com.project.products.repositories.ProductRepository;
import com.project.products.repositories.WilayaRepository;
import com.project.products.repositories.ZoneMarcheRepository;
import com.project.products.repositories.ZoneRepository;

@RestController
@CrossOrigin
@RequestMapping("/zmproduct")
public class zmprodController {

	@Autowired
	ZoneRepository zoneRepository;
	
	@Autowired
	MarcheRepository marcheRepository;
	
	@Autowired
	WilayaRepository wilayaRepository;
	
	@Autowired
	ZoneMarcheRepository zonemarcheRepository;
	
	@Autowired 
	ProductRepository productRepository;
	
	@GetMapping("/index")
	public List<ZoneMarcheProduct> index() {
		List<ZoneMarcheProduct> zmp = new ArrayList<ZoneMarcheProduct>();
		List<Product> liste = productRepository.findAll();
		List<ZoneMarche> zm = zonemarcheRepository.findAll();

		for(ZoneMarche zonem : zm) {
			
			for(Product produit : liste) {
				ZoneMarcheProduct a = new ZoneMarcheProduct();
				a.setProduit(produit);
				a.setZoneMarche(zonem);
				a.setPrix((int) (produit.getTotalprice() + (produit.getTotalprice() * zonem.getBenefice() / 100)));
				if(zonem.getZone().getRemise() >0) {
					a.setPrixRemise((int)((produit.getTotalprice() + (produit.getTotalprice() * zonem.getBenefice() / 100) ) - 
				( (produit.getTotalprice() + (produit.getTotalprice() * zonem.getBenefice() / 100))  * ( (zonem.getZone().getRemise() / 100)))  ));
				}
				else a.setPrixRemise((int) (produit.getTotalprice() + (produit.getTotalprice() * zonem.getBenefice() / 100)));
				a.setRemise(zonem.getZone().getRemise());	
				//System.out.println(a.getProduit().getNomp() + " " + a.getZoneMarche().getZone().getNomz() + " " + a.getZoneMarche().getMarche().getNomm());
				zmp.add(a);
			}
			
		}	
		return zmp;
	}
	
	
	@PostMapping("/show")
	public List<ZoneMarcheProduct> show(@RequestBody Search  search){
		List<Product> liste = new ArrayList<Product>();// productRepository.findAll();
		for(String produit : search.getListproduits()) {
			liste.add(productRepository.findByCodepIgnoreCase(produit).get());
		}
		Zone zone = zoneRepository.findById(search.getZone().getIdzone()).get();
		Marche marche = marcheRepository.findById(search.getMarche().getIdmarche()).get();
		ZoneMarche zm = zonemarcheRepository.findByZone_idzoneAndMarche_idmarche(zone.getIdzone(),marche.getIdmarche()).get();
		List<ZoneMarcheProduct> zmp = new ArrayList<ZoneMarcheProduct>();
		for(Product produit : liste) {
			ZoneMarcheProduct a = new ZoneMarcheProduct();
			a.setProduit(produit);
			a.setZoneMarche(zm);
			a.setPrix((int) (produit.getTotalprice() + (produit.getTotalprice() * zm.getBenefice() / 100)));
			if(zm.getZone().getRemise() >0) {
				a.setRemise(zm.getZone().getRemise());
				a.setPrixRemise((int)((produit.getTotalprice() + (produit.getTotalprice() * zm.getBenefice() / 100) ) - 
			( (produit.getTotalprice() + (produit.getTotalprice() * zm.getBenefice() / 100))  * ( (zm.getZone().getRemise() / 100)))  ));
			}
			else a.setPrixRemise((int) (produit.getTotalprice() + (produit.getTotalprice() * zm.getBenefice() / 100)));
			//System.out.println(a.getProduit().getNomp() + " " + a.getZoneMarche().getZone().getNomz() + " " + a.getZoneMarche().getMarche().getNomm());
			zmp.add(a);
		}
		

		return zmp;	
	}
	
	@PostMapping("/showWilaya")
	public List<ZoneMarcheProduct> showWilaya(@RequestBody Search  search){
		List<Product> liste = new ArrayList<Product>();// productRepository.findAll();
		for(String produit : search.getListproduits()) {
			liste.add(productRepository.findByNomp(produit).get());
		}
		
		Wilayas wilaya = wilayaRepository.findById(search.getWilaya().getIdwilaya()).get();
		Marche marche = marcheRepository.findById(search.getMarche().getIdmarche()).get();
		ZoneMarche zm = zonemarcheRepository.findByZone_idzoneAndMarche_idmarche(wilaya.getZone().getIdzone(),marche.getIdmarche()).get();
		List<ZoneMarcheProduct> zmp = new ArrayList<ZoneMarcheProduct>();
		for(Product produit : liste) {
			ZoneMarcheProduct a = new ZoneMarcheProduct();
			a.setProduit(produit);
			a.setZoneMarche(zm);
			a.setPrix((int) (produit.getTotalprice() + (produit.getTotalprice() * zm.getBenefice() / 100)));
			if(zm.getZone().getRemise() >0) {
				a.setPrixRemise((int)((produit.getTotalprice() + (produit.getTotalprice() * zm.getBenefice() / 100) ) - 
			( (produit.getTotalprice() + (produit.getTotalprice() * zm.getBenefice() / 100))  * ( (zm.getZone().getRemise() / 100)))  ));
			}
			else a.setPrixRemise((int) (produit.getTotalprice() + (produit.getTotalprice() * zm.getBenefice() / 100)));
			//System.out.println(a.getProduit().getNomp() + " " + a.getZoneMarche().getZone().getNomz() + " " + a.getZoneMarche().getMarche().getNomm());
			zmp.add(a);
		}
		

		return zmp;	
	}
	
	@GetMapping("/indexremise/{idproduct}/{idzone}/{idmarche}")
	public int indexremise(@PathVariable("idproduct") long idproduct,@PathVariable("idzone") long idzone,@PathVariable("idmarche") long idmarche) {
		Zone z = zoneRepository.findById(idzone).get();
		Marche marche = marcheRepository.findById(idmarche).get();
		ZoneMarche zm = new ZoneMarche();
		for(ZoneMarche zone : z.getZonemarche()) {
			if(zone.getMarche().equals(marche)) {
				zm =  zone;
				}
		}
		Product p = productRepository.findById(idproduct).get();
		if(zm.getZone().getRemise()> 0 ) {
			return (int) (p.getTotalprice() - ((p.getTotalprice()+ ( p.getTotalprice() * ((double) zm.getBenefice() / 100) ) )  *  ((double) (zm.getZone().getRemise() / 100))));
		} else {
			return  (int) (p.getTotalprice()+ ( p.getTotalprice() * (double) zm.getBenefice() / 100));
		}
		 
	}
	
	@GetMapping("/indexsansremise/{idproduct}/{idzone}/{idmarche}")
	public int indexsansremise(@PathVariable("idproduct") long idproduct,@PathVariable("idzone") long idzone,@PathVariable("idmarche") long idmarche) {
		Zone z = zoneRepository.findById(idzone).get();
		Marche marche = marcheRepository.findById(idmarche).get();
		ZoneMarche zm = new ZoneMarche();
		for(ZoneMarche zone : z.getZonemarche()) {
			if(zone.getMarche().equals(marche)) {
				zm =  zone;
				}
		}
		Product p = productRepository.findById(idproduct).get();
	
		return  (int)  (p.getTotalprice()+ ( p.getTotalprice() * (double) zm.getBenefice() / 100));
	}
	
}

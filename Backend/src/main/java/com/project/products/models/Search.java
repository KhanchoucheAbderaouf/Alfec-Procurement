package com.project.products.models;

import java.util.List;

public class Search {
	private List<String> listproduits ;
	private String zone;
	private String marche;
	private String wilaya;
	
	public String getWilaya() {
		return wilaya;
	}
	public void setWilaya(String wilaya) {
		this.wilaya = wilaya;
	}
	public List<String> getListproduits() {
		return listproduits;
	}
	public void setListproduits(List<String> listproduits) {
		this.listproduits = listproduits;
	}
	public String getZone() {
		return zone;
	}
	public void setZone(String zone) {
		this.zone = zone;
	}
	public String getMarche() {
		return marche;
	}
	public void setMarche(String marche) {
		this.marche = marche;
	}
	
	
	
	
	
}

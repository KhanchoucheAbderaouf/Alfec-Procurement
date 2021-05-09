package com.project.products.models;

import java.util.List;

public class Search {
	private List<String> listproduits ;
	private Zone zone;
	private Marche marche;
	private Wilayas wilaya;
	
	public List<String> getListproduits() {
		return listproduits;
	}
	public void setListproduits(List<String> listproduits) {
		this.listproduits = listproduits;
	}
	public Zone getZone() {
		return zone;
	}
	public void setZone(Zone zone) {
		this.zone = zone;
	}
	public Marche getMarche() {
		return marche;
	}
	public void setMarche(Marche marche) {
		this.marche = marche;
	}
	public Wilayas getWilaya() {
		return wilaya;
	}
	public void setWilaya(Wilayas wilaya) {
		this.wilaya = wilaya;
	}

	
}
package com.project.products.models;

public class ZoneMarcheProduct {
	
	private Product Produit ;
	private ZoneMarche zoneMarche;
	private float remise;
	private int prix;
	private int prixRemise;
	
	
	public float getRemise() {
		return remise;
	}
	public void setRemise(float remise) {
		this.remise = remise;
	}
	public int getPrix() {
		return prix;
	}
	public void setPrix(int prix) {
		this.prix = prix;
	}
	public int getPrixRemise() {
		return prixRemise;
	}
	public void setPrixRemise(int prixRemise) {
		this.prixRemise = prixRemise;
	}
	

	public Product getProduit() {
		return Produit;
	}
	public void setProduit(Product produit) {
		Produit = produit;
	}
	public ZoneMarche getZoneMarche() {
		return zoneMarche;
	}
	public void setZoneMarche(ZoneMarche zoneMarche) {
		this.zoneMarche = zoneMarche;
	}

	
}

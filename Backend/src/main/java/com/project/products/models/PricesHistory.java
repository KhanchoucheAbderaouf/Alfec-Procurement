package com.project.products.models;

import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "priceshistory")
public class PricesHistory {
	
	@Id
    @GeneratedValue(generator="priceshistory",strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "priceshistory", sequenceName = "idpricehistory",initialValue=1, allocationSize=1)
    private long idpricehistory;
	@OneToOne
    @JoinColumn(name="idp")
    private Product product;
    @Column()
    private double oldprice;
    @Column()
    private double newprice;
    @Column()
    private ZonedDateTime datechangement;
    @Column()
    private String typechangement;
    @Column()
    private String reason; 
    private ZonedDateTime datecreation;
    
    
    
	public PricesHistory() {
		super();
	}
	public PricesHistory(Product product, double oldprice, double newprice, ZonedDateTime date_changement, String typechangement,
			String reason, ZonedDateTime date_creation) {
		super();
		this.product = product;
		this.oldprice = oldprice;
		this.newprice = newprice;
		this.datechangement = date_changement;
		this.typechangement = typechangement;
		this.reason = reason;
		this.datecreation = date_creation;
	}
	public long getIdpricehistory() {
		return idpricehistory;
	}
	public void setIdpricehistory(long idpricehistory) {
		this.idpricehistory = idpricehistory;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public double getOldprice() {
		return oldprice;
	}
	public void setOldprice(double oldprice) {
		this.oldprice = oldprice;
	}
	public double getNewprice() {
		return newprice;
	}
	public void setNewprice(double newprice) {
		this.newprice = newprice;
	}
	
	public String getTypechangement() {
		return typechangement;
	}
	public void setTypechangement(String typechangement) {
		this.typechangement = typechangement;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public ZonedDateTime getDatechangement() {
		return datechangement;
	}
	public void setDatechangement(ZonedDateTime datechangement) {
		this.datechangement = datechangement;
	}
	public ZonedDateTime getDatecreation() {
		return datecreation;
	}
	public void setDatecreation(ZonedDateTime datecreation) {
		this.datecreation = datecreation;
	}
	
    
}

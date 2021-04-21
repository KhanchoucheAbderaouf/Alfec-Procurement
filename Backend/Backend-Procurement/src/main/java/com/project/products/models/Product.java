package com.project.products.models;
 

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;


@Entity
@Table(name = "product")
@TypeDef(
		 name = "jsonb",
		 typeClass = JsonBinaryType.class
		)
public class Product {
	
	  
	  @Id
	  @GeneratedValue(generator="product",strategy = GenerationType.AUTO)
	  @SequenceGenerator(name = "product", sequenceName = "idp",initialValue=1, allocationSize=1)
	  private long idp;
	  @Column(length=255 ,nullable = false)
	  private String nomp;
	  @Column(length=255,unique = true,nullable = false)
	  private String codep;
	  @Column(length=255,nullable = false)
	  private String type;
	  @JsonProperty("parametres")
	  @Type(type = "jsonb")
	  @Column(columnDefinition = "jsonb")
	  private Object  parametres;
	  @Column(length=255,nullable = false)
	  private String marque;
	  @Column()
	  private boolean active;
	  @OneToOne
	  @JoinColumn(name="id")
	  private Fournisseur fournisseur;
	  @Column()
	  private float douane;
	  @Column()
	  private double douaneDinar;
	  @Column()
	  private float fraisdivers;
	  @Column()
	  private double fraisdiversDinar; 
	  @Column()
	  private double europrice;
	  @Column()
	  private double dollarprice;
	  @Column()
	  private String typeproductprice;
	  @Column()
	  private double dinarprice;
	  @Column()
	  private double totalprice;
	  @Column()
	  private Date date_creation;	  
 
	  
	  public Product(String nomp, String codep, String type,String typeproductprice, Object parametres, String marque,
				Fournisseur f,Date create) {
			this.nomp = nomp;
			this.codep = codep;
			this.type = type;
			this.typeproductprice = typeproductprice;
			this.parametres = parametres;
			this.marque = marque;
			this.fournisseur = f; 
			this.date_creation = create;
			this.active = true;
		}
	  
	  public Product() {
			 
		}

	public long getIdp() {
		return idp;
	}

	public void setIdp(long idp) {
		this.idp = idp;
	}

	public String getNomp() {
		return nomp;
	}

	public void setNomp(String nomp) {
		this.nomp = nomp;
	}

	public String getCodep() {
		return codep;
	}

	public void setCodep(String codep) {
		this.codep = codep;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public  Object  getParametres() {
		return parametres;
	}

	public void setParametres(Object parametres) {
		this.parametres = parametres;
	}

	public String getMarque() {
		return marque;
	}

	public void setMarque(String marque) {
		this.marque = marque;
	}

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

	public float getDouane() {
		return douane;
	}
	public void setDouane(float douane) {
		this.douane = douane;
	}
	public double getDouaneDinar() {
		return douaneDinar;
	}
	public void setDouaneDinar(double douaneDinar) {
		this.douaneDinar = douaneDinar;
	}
	public float getFraisdivers() {
		return fraisdivers;
	}
	public void setFraisdivers(float fraisdivers) {
		this.fraisdivers = fraisdivers;
	}
	public double getFraisdiversDinar() {
		return fraisdiversDinar;
	}
	public void setFraisdiversDinar(double fraisdiversDinar) {
		this.fraisdiversDinar = fraisdiversDinar;
	}
	public double getEuroprice() {
		return europrice;
	}
	public void setEuroprice(double europrice) {
		this.europrice = europrice;
	}
	public double getDinarprice() {
		return dinarprice;
	}
	public void setDinarprice(double dinarprice) {
		this.dinarprice = dinarprice;
	}
	public double getTotalprice() {
		return totalprice;
	}
	public void setTotalprice(double totalprice) {
		this.totalprice = totalprice;
	}
	public Date getDate_creation() {
		return date_creation;
	}
	public void setDate_creation(Date date_creation) {
		this.date_creation = date_creation;
	}

	public double getDollarprice() {
		return dollarprice;
	}

	public void setDollarprice(double dollarprice) {
		this.dollarprice = dollarprice;
	}

	public String getTypeproductprice() {
		return typeproductprice;
	}

	public void setTypeproductprice(String typeproductprice) {
		this.typeproductprice = typeproductprice;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
    
	  
	  
	  
}

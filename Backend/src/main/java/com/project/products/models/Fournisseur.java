package com.project.products.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;


@Entity
@Table(name = "fournisseur")
@TypeDef(
		 name = "jsonb",
		 typeClass = JsonBinaryType.class
		)
public class Fournisseur {
	
	@Id
	@GeneratedValue(generator="fournisseur",strategy = GenerationType.AUTO)
	@SequenceGenerator(name = "fournisseur", sequenceName = "idfournisseur",initialValue=1, allocationSize=1)
	private long id;
	@Column(length=255,unique = true,nullable = false)
	private String numfournisseur;
	@Column(length=255,unique = true,nullable = false)
	private String nomf;
	@Column(length=255)
	private String numtel;
	@Column(length=255)
	private String numfix;
	@Column(length=255)
	private String numfax;
	@Column(length=255,nullable = false)
	private String email;
	@JsonProperty("contact")
	@Type(type = "jsonb")
	@Column(columnDefinition = "jsonb")
	private Object contact;
	@Column(length=255)
	private String adresse;
	@Column(length=255)
	private String codefam;
	@Column(length=255)
	private String activite;
	@Column(length=255)
	private String conditionreglement;
	@Column(length=255)
	private String paiement;
	@Column(length=255)
	private String garantie;
	@Column(length=255,nullable = false)
	@ElementCollection
	private List<String> marques;
	@Column(length=255,nullable = false)
	private String delailivraison;
	@Column()
	private boolean active;
	@Column()
	private Date date_creation;	  

	public Fournisseur() {
		
	}
	
	public long getId() {
		return id;
	}
	public void setId(long idfournisseur) {
		this.id= idfournisseur;
	}
	public String getNumfournisseur() {
		return numfournisseur;
	}
	public void setNumfournisseur(String numfournisseur) {
		this.numfournisseur = numfournisseur;
	}
	public String getNomf() {
		return nomf;
	}
	public void setNomf(String nomf) {
		this.nomf = nomf;
	}
	public String getNumtel() {
		return numtel;
	}
	public void setNumtel(String numtel) {
		this.numtel = numtel;
	}
	public String getNumfax() {
		return numfax;
	}
	public void setNumfax(String numfax) {
		this.numfax = numfax;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Object getContact() {
		return contact;
	}
	public void setContact(Object contact) {
		this.contact = contact;
	}
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public String getCodefam() {
		return codefam;
	}
	public void setCodefam(String codefam) {
		this.codefam = codefam;
	}
	public String getActivite() {
		return activite;
	}
	public void setActivite(String activite) {
		this.activite = activite;
	}
	public String getConditionreglement() {
		return conditionreglement;
	}
	public void setConditionreglement(String conditionreglement) {
		this.conditionreglement = conditionreglement;
	}
	public String getPaiement() {
		return paiement;
	}
	public void setPaiement(String paiement) {
		this.paiement = paiement;
	}
	public String getGarantie() {
		return garantie;
	}
	public void setGarantie(String garantie) {
		this.garantie = garantie;
	}
	public List<String> getMarques() {
		return marques;
	}
	public void setMarques(List<String> marques) {
		this.marques = marques;
	}
	public String getDelailivraison() {
		return delailivraison;
	}
	public void setDelailivraison(String delailivraison) {
		this.delailivraison = delailivraison;
	}

	public Date getDate_creation() {
		return date_creation;
	}

	public void setDate_creation(Date date_creation) {
		this.date_creation = date_creation;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getNumfix() {
		return numfix;
	}

	public void setNumfix(String numfix) {
		this.numfix = numfix;
	}
	
	
}

package com.project.products.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "wilaya")
public class Wilayas {
	@Id
    @GeneratedValue(generator="wilaya",strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "wilaya", sequenceName = "id_wilaya",initialValue=1, allocationSize=1)
    private long idwilaya;
    @Column(length=255,unique=true,nullable = false)
    private String nomw;
    @Column
    private int numwilaya;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="idzone")
    private Zone zone;
    
    private Date date_creation;
    
    
	public Zone getZone() {
		return zone;
	}
	public void setZone(Zone zone) {
		this.zone = zone;
	}
	public long getIdwilaya() {
		return idwilaya;
	}
	public void setIdwilaya(long idwilaya) {
		this.idwilaya = idwilaya;
	}
	public String getNomw() {
		return nomw;
	}
	public void setNomw(String nomw) {
		this.nomw = nomw;
	}
	public int getNumwilaya() {
		return numwilaya;
	}
	public void setNumwilaya(int numwilaya) {
		this.numwilaya = numwilaya;
	}
	public Date getDate_creation() {
		return date_creation;
	}
	public void setDate_creation(Date date_creation) {
		this.date_creation = date_creation;
	}
    
    	
    
}

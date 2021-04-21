package com.project.products.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "marche")
public class Marche {
	 	
		@Id
	    @GeneratedValue(generator="marche",strategy = GenerationType.AUTO)
	    @SequenceGenerator(name = "marche", sequenceName = "id_marche",initialValue=1, allocationSize=1)
	    private long idmarche;
	    @Column(length=255,unique = true,nullable = false)
	    private String nomm;
	    @Column
	    private Date date_creation = new Date();
	    @JsonIgnore
		@OneToMany(mappedBy= "marche")
	    private Set<ZoneMarche> zonemarche = new HashSet<>();
	    
		public Set<ZoneMarche> getZonemarche() {
			return zonemarche;
		}
		public void setZonemarche(Set<ZoneMarche> zonemarche) {
			this.zonemarche = zonemarche;
		}
		public long getIdmarche() {
			return idmarche;
		}
		public void setIdmarche(long idmarche) {
			this.idmarche = idmarche;
		}
		public String getNomm() {
			return nomm;
		}
		public void setNomm(String nomm) {
			this.nomm = nomm;
		}
		public Date getDate_creation() {
			return date_creation;
			}
		public void setDate_creation(Date date_creation) {
			this.date_creation = date_creation;
			}
	    

}

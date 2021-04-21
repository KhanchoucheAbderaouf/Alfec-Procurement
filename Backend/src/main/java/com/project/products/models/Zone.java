package com.project.products.models;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
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
@Table(name = "zone")
public class Zone {
	
	 @Id
	    @GeneratedValue(generator="zone",strategy = GenerationType.AUTO)
	    @SequenceGenerator(name = "zone", sequenceName = "id_zone",initialValue=1, allocationSize=1)
	    private long idzone;
	    @Column(length=255,unique=true,nullable = false)
	    private String nomz;
	    @JsonIgnore
	    @OneToMany(mappedBy= "zone")
	    private Set<ZoneMarche> zonemarche = new HashSet<>();
	    //private boolean active;
	    @Column	
	    private float remise;
	    @OneToMany(mappedBy="zone", cascade = CascadeType.ALL)
	    private List<Wilayas> wilayas;
	   
	    
	    
	   	 public List<Wilayas> getWilayas() {
			return wilayas;
		}

		public void setWilayas(List<Wilayas> wilayas) {
			this.wilayas = wilayas;
		}

		@Column
		    private Date date_creation;

		public long getIdzone() {
			return idzone;
		}

		public void setIdzone(long idzone) {
			this.idzone = idzone;
		}

		public String getNomz() {
			return nomz;
		}

		public void setNomz(String nomz) {
			this.nomz = nomz;
		}

		

		public float getRemise() {
			return remise;
		}

		public void setRemise(float remise) {
			this.remise = remise;
		}

	
		
		public Set<ZoneMarche> getZonemarche() {
			return zonemarche;
		}

		public void setZonemarche(Set<ZoneMarche> zonemarche) {
			this.zonemarche = zonemarche;
		}

		public Date getDate_creation() {
			return date_creation;
		}

		public void setDate_creation(Date date_creation) {
			this.date_creation = date_creation;
		}

		
		
	    
	    
	    
	    
}

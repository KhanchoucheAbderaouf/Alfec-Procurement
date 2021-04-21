package com.project.products.models;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;


@Entity
public class ZoneMarche {

	@EmbeddedId
	private ZoneMarcheId id = new ZoneMarcheId();
	
	@ManyToOne
	@MapsId("idzone")
	private Zone zone;
	
	
	@ManyToOne
	@MapsId("idmarche")
	private Marche marche;
	
	private int benefice;


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

	public int getBenefice() {
		return benefice;
	}

	public void setBenefice(int benefice) {
		this.benefice = benefice;
	}
	
	@Embeddable
	public static class ZoneMarcheId implements Serializable{
			
		private static final long serialVersionUID = 1L;
		
		private Long idzone;
		private Long idmarche;
		
		
		public ZoneMarcheId() {
		
		}
		
		public ZoneMarcheId(long idzone,long idmarche) {
			super();
			this.idzone = idzone;
			this.idmarche = idmarche;
			
		}

		public long getIdzone() {
			return idzone;
		}

		public void setIdzone(long idzone) {
			this.idzone = idzone;
		}

		public long getIdmarche() {
			return idmarche;
		}

		public void setIdmarche(long idmarche) {
			this.idmarche = idmarche;
		}
		
		
		
		
	}
	
	
}

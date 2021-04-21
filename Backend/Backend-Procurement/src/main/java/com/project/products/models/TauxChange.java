package com.project.products.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "tauxchange")
public class TauxChange {
	

		    @Id
		    private long idchange;
		    @Column
		    private double oldvalue;
		    @Column
		    private double currentvalue;
		    //private boolean active;
		    @Column
		    private Date date_creation;
		    
		    
			public long getIdchange() {
				return idchange;
			}
			public void setIdchange(long idchange) {
				this.idchange = idchange;
			}
			public double getOldvalue() {
				return oldvalue;
			}
			public void setOldvalue(double oldvalue) {
				this.oldvalue = oldvalue;
			}
			public double getCurrentvalue() {
				return currentvalue;
			}
			public void setCurrentvalue(double currentvalue) {
				this.currentvalue = currentvalue;
			}
			public Date getDate_creation() {
				return date_creation;
			}
			public void setDate_creation(Date date_creation) {
				this.date_creation = date_creation;
			}
		    
		    
			
		    
			
		    
					   
	}


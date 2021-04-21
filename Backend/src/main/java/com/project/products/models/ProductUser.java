/*package com.project.products.models;

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

@Entity
@Table(name = "productuser")
public class ProductUser {
	@Id
    @GeneratedValue(generator="productuser",strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "productuser", sequenceName = "id_productuser",initialValue=1, allocationSize=1)
    private long idproductuser;
    @Column(length=255,unique = true,nullable = false)
    private String nomp;
    
    @OneToOne
    @JoinColumn(name="iduser")
    private Users user;
    
    @Column
    private Date date_creation;
    
	public Users getUser() {
		return user;
	}
	public void setUser(Users user) {
		this.user = user;
	}
	public long getIdproductuser() {
		return idproductuser;
	}
	public void setIdproductuser(long idproductuser) {
		this.idproductuser = idproductuser;
	}
	public String getNomp() {
		return nomp;
	}
	public void setNomp(String nomp) {
		this.nomp = nomp;
	}
	
	public Date getDate_creation() {
		return date_creation;
	}
	public void setDate_creation(Date date_creation) {
		this.date_creation = date_creation;
	}
    
    
	
    
    
    
}*/

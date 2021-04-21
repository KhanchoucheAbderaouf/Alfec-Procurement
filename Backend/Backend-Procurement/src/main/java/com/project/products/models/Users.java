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


@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(generator="users",strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "users", sequenceName = "id_user",initialValue=1, allocationSize=1)
    private long iduser;
    @Column(length=255,unique = true,nullable = false)
    private String username;
    @Column(length=255)
    private String password;
    @Column()
    private boolean active;
    @Column(length=50,nullable = false)
    private String nom;
    @Column(length=50,nullable = false)
    private String prenom;
    @Column(length=10)
    private String telephone;
    @Column(length=100)
    private String email;
    @Column(length=100)
    private String poste;
    private Date date_creation;
    @OneToOne
    @JoinColumn(name="idrole")
    private Roles role;

   

    public long getIduser() {
        return iduser;
    }

    public void setIduser(long iduser) {
        this.iduser = iduser;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPoste() {
        return this.poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public Date getDate_creation() {
        return date_creation;
    }

    public void setDate_creation(Date date_creation) {
        this.date_creation = date_creation;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

}

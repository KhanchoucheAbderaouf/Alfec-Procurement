package com.project.products.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.project.products.models.Fournisseur;

public interface FournisseurRepository  extends JpaRepository<Fournisseur,Long>  {
	Optional<Fournisseur> findByNomf(String nomf);

	public List<Fournisseur> findByActive(boolean active);
	
}

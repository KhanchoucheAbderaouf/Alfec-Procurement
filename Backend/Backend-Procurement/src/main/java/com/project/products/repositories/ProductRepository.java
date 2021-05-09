package com.project.products.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.products.models.Fournisseur;
import com.project.products.models.Product;

public interface ProductRepository  extends JpaRepository<Product,Long>{

	List<Product> findAllByNomp(String nomp);

	Optional<Product> findByNomp(String produit);

	List<Product> findAllByNompIgnoreCase(String categorie);
 

	List<Product> findByNompIgnoreCaseAndActive(String nomp, boolean b);

	List<Product> findByActive(boolean b);

	List<Product> findByFournisseur(Fournisseur fournisseur);

	Optional<Product> findByCodep(String produit);

	Optional<Product> findByCodepIgnoreCase(String produit);





	
}

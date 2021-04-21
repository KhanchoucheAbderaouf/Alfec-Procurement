package com.project.products.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.products.models.Marche;

public interface MarcheRepository  extends JpaRepository<Marche,Long> {
	Optional<Marche> findByNomm(String nomm);	
}

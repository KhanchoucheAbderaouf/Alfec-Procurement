package com.project.products.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.products.models.Zone;

public interface ZoneRepository   extends JpaRepository<Zone,Long> {
	
	Optional<Zone> findByNomz(String nomz);	

}

package com.project.products.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.products.models.ZoneMarche;

public interface ZoneMarcheRepository extends JpaRepository<ZoneMarche,Long>{

	Optional<List<ZoneMarche>> findByZone_idzone(long idzone);	
	
	Optional<ZoneMarche> findByZone_idzoneAndMarche_idmarche(long idzone,long idmarche);

	
}

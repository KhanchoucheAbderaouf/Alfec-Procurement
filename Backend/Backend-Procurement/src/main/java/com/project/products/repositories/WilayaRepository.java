package com.project.products.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.products.models.Wilayas;

public interface WilayaRepository extends JpaRepository<Wilayas,Long>{
	 Optional<Wilayas> findByNomw(String nomw);
	 List<Wilayas> findAllByOrderByNumwilayaAsc();
	 Optional<Wilayas> findByNumwilaya(int numwilaya);
	List<Wilayas> findAllByOrderByNomwAsc();
}

package com.project.products.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.products.models.TauxChange;

public interface ChangeRepository   extends JpaRepository<TauxChange,Long> {
	
	
}

package com.project.products.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.products.models.Roles;

public interface RoleRepository  extends JpaRepository<Roles,Long> {


    Optional<Roles> findByIntitule(String intitule);

}
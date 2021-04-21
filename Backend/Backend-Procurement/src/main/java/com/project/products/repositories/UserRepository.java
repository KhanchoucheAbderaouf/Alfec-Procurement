package com.project.products.repositories;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.products.models.Users;



public interface UserRepository extends JpaRepository<Users,Long> {

    Optional<Users> findByUsername(String username);
    List<Users> findAllByActive(boolean active);

}
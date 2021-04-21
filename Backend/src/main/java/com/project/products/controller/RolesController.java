package com.project.products.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.products.models.Roles;
import com.project.products.repositories.RoleRepository;

@RestController
@CrossOrigin
@RequestMapping("/admin/roles")
public class RolesController {


    @Autowired
    RoleRepository roleRepository;



    @GetMapping("/index")
    public List<Roles> allRoles(){
        return roleRepository.findAll();
    }

    @PostMapping("/create/{intitule}")
    public Roles addRole(@PathVariable("intitule") String intitule) throws Exception{

        if(roleRepository.findByIntitule(intitule).isPresent()){
            throw new Exception(
                    "This role exists!!"
            );
        }else {
            Roles R = new Roles();
            R.setIntitule(intitule);
            return roleRepository.save(R);
        }
    }

}

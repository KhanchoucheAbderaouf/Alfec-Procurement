package com.project.products.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.products.models.Product;
import com.project.products.models.Roles;
import com.project.products.models.Users;
import com.project.products.repositories.RoleRepository;
import com.project.products.repositories.UserRepository;


@RestController
@CrossOrigin
@RequestMapping("/admin/users")
public class UsersController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;




    @Autowired
    private PasswordEncoder passwordEncoder;


   

    @GetMapping("/index")
    public List<Users> findAllUsers(){
    	/*List<Users> liste = new ArrayList<Users>();
        List<Users> alluser = userRepository.findAll();
        for(Users u : alluser) {
        	if (u.isActive()) liste.add(u);
        }*/
        return userRepository.findAllByActive(true);
    }
    @GetMapping("/trash/index")
    public List<Users> findAllTrashUsers(){
    	 
        return userRepository.findAllByActive(false);
    }
    
    @GetMapping("/show/{iduser}")
    public Optional<Users> findUserByUsername(@PathVariable("iduser") Long iduser){
        return userRepository.findById(iduser);
    }
    
    @PostMapping("/create/{idrole}")
    public Users addUser(@RequestBody Users user,@PathVariable("idrole") long idrole) throws Exception{
        if(userRepository.findByUsername(user.getNom()).isPresent() && userRepository.findByUsername(user.getPrenom()).isPresent() ){
                throw new Exception(
                        "Username : " + user.getNom() + " " + user.getPrenom() + " already exists");
            }
        if(!(roleRepository.findById(idrole).isPresent())){
            throw new Exception(
                    "Role doesn't exist : " + idrole);
        }
        Users U = user;
        U.setDate_creation(new Date());
        U.setActive(true);
        Roles roleUser  = roleRepository.findById(idrole).get();
        U.setRole(roleUser);
        U.setUsername(user.getUsername());
        U.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(U);
    }

    @DeleteMapping("/delete/{iduser}")
    public void deleteUser(@PathVariable("iduser") Long iduser) throws Exception {

            if(!(userRepository.findById(iduser).isPresent())) {
                throw new Exception(
                        "This user doesn't exists"
                );}
            else{
            		
                   Users user  = userRepository.findById(iduser).get();
                   
                   user.setActive(false);
                   userRepository.save(user);
                }
            }
    
    @DeleteMapping("/trash/delete/{iduser}")
    public void deleteTrashUser(@PathVariable("iduser") Long iduser) throws Exception {

            if(!(userRepository.findById(iduser).isPresent())) {
                throw new Exception(
                        "This user doesn't exists"
                );}
            else{   
                   userRepository.delete(userRepository.findById(iduser).get());
                }
            }
    
    @GetMapping("/trash/recover/{id}")
    public Users recover(@PathVariable("id") long id){
		Users user = userRepository.findById(id).get();
		user.setActive(true);
    	return userRepository.save(user);
    }

    @PutMapping("/update/{iduser}/{idrole}")
    public Users updateUserInfos(@RequestBody Users user,@PathVariable("iduser") Long iduser,@PathVariable("idrole") long idrole) throws  Exception {
        if(!(userRepository.findById(iduser).isPresent())){
            throw new Exception(
                    "User not found ! "
            );
        }else {
            Users U = userRepository.findById(iduser).get();
            Roles roleUser  = roleRepository.findById(idrole).get();
            U.setRole(roleUser);
            U.setTelephone(user.getTelephone());
            U.setPoste(user.getPoste());
            U.setEmail(user.getEmail());
            U.setNom(user.getNom());
            U.setPrenom(user.getPrenom());
            return userRepository.save(U);
        }
    }

    @PutMapping("/update/userpass/{iduser}")
    public Users updateUsernamePass(@RequestBody Users user,@PathVariable("iduser") Long iduser) throws  Exception {
        if(!(userRepository.findById(iduser).isPresent())){
            throw new Exception(
                    "User not found ! "
            );
        }else {
            Users U = userRepository.findById(iduser).get();
            U.setUsername(user.getUsername());
            U.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(U);
        }
    }
   /* @PutMapping("/updateUserNamePass/{iduser}")
    public Users updateUserNamePass(@RequestBody Users user,@PathVariable("iduser") Long iduser) throws  Exception {
        if (!(userRepository.findById(iduser).isPresent())) {
            throw new Exception(
                    "User  not found ! "
            );
        } else {
            Users U = userRepository.findById(iduser).get();
            U.setUsername(user.getUsername());
            U.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(U);
        }
    }*/





    }




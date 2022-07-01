package com.curso.java.curso.controllers;

import com.curso.java.curso.Models.User;
import com.curso.java.curso.dao.UserDaoImp;
import com.curso.java.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
   @Autowired
   private UserDaoImp userDao;
   @Autowired
   private JWTUtil jwtUtil;

   @RequestMapping(value = "api/login", method = RequestMethod.POST)
   public String login(@RequestBody User user) {
      User loguedUser = userDao.getUserByCredentials(user);
      if(loguedUser != null){
         String tokenJwt = jwtUtil.create(String.valueOf(loguedUser.getId()), loguedUser.getEmail());
         return tokenJwt; //tambien se puede devolver el usuario, los permisos que tiene el usuario, para no hacer tantos requests al server
      }
      return "fail";
   }
}

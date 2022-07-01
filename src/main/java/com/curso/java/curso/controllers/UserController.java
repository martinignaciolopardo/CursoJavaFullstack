package com.curso.java.curso.controllers;
import com.curso.java.curso.Models.User;
import com.curso.java.curso.dao.UserDaoImp;
import com.curso.java.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
   @Autowired
   private UserDaoImp userDao;
   @Autowired
   private JWTUtil jwtUtil;

   private boolean validateToken(String token){
      String userId = jwtUtil.getKey(token);
      return userId != null;
   }

   @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
   public List<User> getUsers(@RequestHeader(value = "Authorization") String token) {
      if (!validateToken(token)){
         return null;
      }
      return userDao.getUsers();
   }

   @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
   public void deleteUser(@RequestHeader(value = "Authorization") String token,
                          @PathVariable Long id) {
      if (!validateToken(token)){
         return;
      }
      userDao.deleteUser(id);
   }

   @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
   public void registerUser(@RequestBody User user) {
      Argon2 argon = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
      String hash = argon.hash(1, 1024, 1, user.getPassword());
      user.setPassword(hash);
      userDao.registerUser(user);
   }

}

package com.curso.java.curso.dao;

import com.curso.java.curso.Models.User;

import java.util.List;

public interface UsuarioDao {
   List<User> getUsers();

   void deleteUser(Long id);

   void registerUser(User user);

   User getUserByCredentials(User user);
}

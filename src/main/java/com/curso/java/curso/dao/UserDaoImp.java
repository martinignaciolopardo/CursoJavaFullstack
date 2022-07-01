package com.curso.java.curso.dao;
import com.curso.java.curso.Models.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
@Repository
@Transactional
public class UserDaoImp implements UsuarioDao{

   @PersistenceContext
   EntityManager entityManager;

   @Override
   public List<User> getUsers() {
      // La query hace referencia a la clase usuario
      String query = "FROM User";
      return entityManager.createQuery(query).getResultList();
   }

   @Override
   public void deleteUser(Long id) {
      User user = entityManager.find(User.class, id);
      entityManager.remove(user);
   }

   @Override
   public void registerUser(User user) {
      entityManager.merge(user);
   }

   public User getUserByCredentials(User user) {
      String query = "FROM User WHERE email = :email";
      List<User> resultCheck = entityManager.createQuery(query)
                                             .setParameter("email", user.getEmail())
                                             .getResultList();
      if(resultCheck.isEmpty()){
         return null;
      }
      String passwordHashed = resultCheck.get(0).getPassword();
      Argon2 argon = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
      if(argon.verify(passwordHashed, user.getPassword())){
         return resultCheck.get(0);
      }
      else{
         return null;
      }
   }
}

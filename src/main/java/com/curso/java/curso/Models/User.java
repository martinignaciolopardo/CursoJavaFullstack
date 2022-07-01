package com.curso.java.curso.Models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "usuarios")
@ToString @EqualsAndHashCode
public class User {

   @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Getter @Setter @Column(name = "id")
   private Long id;

   @Getter @Setter @Column(name = "name")
   private String name;

   @Getter @Setter @Column(name = "surname")
   private String surname;

   @Getter @Setter @Column(name = "email")
   private String email;

   @Getter @Setter @Column(name = "phone")
   private int phone;

   @Getter @Setter @Column(name = "password")
   private String password;

}

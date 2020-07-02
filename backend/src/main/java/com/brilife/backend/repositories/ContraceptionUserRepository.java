package com.brilife.backend.repositories;

import com.brilife.backend.entities.ContraceptionUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContraceptionUserRepository
  extends JpaRepository<ContraceptionUser, Integer> {}

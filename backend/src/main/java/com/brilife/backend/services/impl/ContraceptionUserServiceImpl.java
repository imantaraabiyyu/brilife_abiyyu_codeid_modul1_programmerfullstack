package com.brilife.backend.services.impl;

import com.brilife.backend.entities.ContraceptionUser;
import com.brilife.backend.repositories.ContraceptionUserRepository;
import com.brilife.backend.services.ContraceptionUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ContraceptionUserServiceImpl
  extends CommonServiceImpl<ContraceptionUser, Integer>
  implements ContraceptionUserService {
  @Autowired
  private ContraceptionUserRepository repository;

  @Override
  protected JpaRepository<ContraceptionUser, Integer> getRepository() {
    return repository;
  }
}

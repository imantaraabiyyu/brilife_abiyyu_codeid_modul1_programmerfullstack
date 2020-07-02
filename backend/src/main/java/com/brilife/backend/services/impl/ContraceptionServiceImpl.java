package com.brilife.backend.services.impl;

import com.brilife.backend.entities.Contraception;
import com.brilife.backend.repositories.ContraceptionRepository;
import com.brilife.backend.services.ContraceptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ContraceptionServiceImpl
  extends CommonServiceImpl<Contraception, Integer>
  implements ContraceptionService {
  @Autowired
  private ContraceptionRepository repository;

  @Override
  protected JpaRepository<Contraception, Integer> getRepository() {
    return repository;
  }
}

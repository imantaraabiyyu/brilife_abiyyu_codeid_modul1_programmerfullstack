package com.brilife.backend.services.impl;

import com.brilife.backend.entities.Province;
import com.brilife.backend.repositories.ProvinceRepository;
import com.brilife.backend.services.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ProvinceServiceImpl
  extends CommonServiceImpl<Province, Integer>
  implements ProvinceService {
  @Autowired
  private ProvinceRepository repository;

  @Override
  protected JpaRepository<Province, Integer> getRepository() {
    return repository;
  }
}

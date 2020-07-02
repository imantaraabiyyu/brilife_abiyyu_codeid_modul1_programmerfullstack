package com.brilife.backend.repositories;

import com.brilife.backend.entities.Province;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {
  public List<Province> findByNameContaining(String name);
}

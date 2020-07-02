package com.brilife.backend.repositories;

import com.brilife.backend.entities.Contraception;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContraceptionRepository
  extends JpaRepository<Contraception, Integer> {
  public List<Contraception> findByNameContaining(String name);
}

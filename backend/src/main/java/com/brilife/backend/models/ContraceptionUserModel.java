package com.brilife.backend.models;

import com.brilife.backend.entities.Contraception;
import com.brilife.backend.entities.Province;

public class ContraceptionUserModel {
  private Integer id;

  private Province province;

  private Contraception contraception;

  private Integer qty;

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Province getProvince() {
    return this.province;
  }

  public void setProvince(Province province) {
    this.province = province;
  }

  public Contraception getContraception() {
    return this.contraception;
  }

  public void setContraception(Contraception contraception) {
    this.contraception = contraception;
  }

  public Integer getQty() {
    return qty;
  }

  public void setQty(Integer qty) {
    this.qty = qty;
  }
}

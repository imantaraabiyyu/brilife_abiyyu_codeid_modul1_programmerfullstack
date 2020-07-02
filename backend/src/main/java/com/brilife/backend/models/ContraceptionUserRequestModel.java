package com.brilife.backend.models;

public class ContraceptionUserRequestModel {
  private Integer id;

  private Integer qty;

  private Integer provinceId;

  private Integer contraceptionId;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getQty() {
    return qty;
  }

  public void setQty(Integer qty) {
    this.qty = qty;
  }

  public Integer getProvinceId() {
    return provinceId;
  }

  public void setProvinceId(Integer provinceId) {
    this.provinceId = provinceId;
  }

  public Integer getContraceptionId() {
    return contraceptionId;
  }

  public void setContraceptionId(Integer contraceptionId) {
    this.contraceptionId = contraceptionId;
  }
}

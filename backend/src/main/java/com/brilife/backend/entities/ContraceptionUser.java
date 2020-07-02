package com.brilife.backend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name = "LIST_PEMAKAI_KONTRASEPSI")
@Entity
public class ContraceptionUser {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "Id_List")
  private Integer id;

  @ManyToOne
  @JoinColumn(nullable = false, name = "Id_Propinsi")
  private Province province;

  @ManyToOne
  @JoinColumn(nullable = false, name = "Id_Kontrasepsi")
  private Contraception contraception;

  @Column(name = "Jumlah_Pemakai")
  private Integer qty;

  public ContraceptionUser() {}

  public ContraceptionUser(
    Province province,
    Contraception contraception,
    Integer qty
  ) {
    this.province = province;
    this.contraception = contraception;
    this.qty = qty;
  }

  public ContraceptionUser(Province province) {}

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Province getProvince() {
    return province;
  }

  public void setProvince(Province province) {
    this.province = province;
  }

  public Contraception getContraception() {
    return contraception;
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

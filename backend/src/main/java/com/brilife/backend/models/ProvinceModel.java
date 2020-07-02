package com.brilife.backend.models;

import com.brilife.backend.validation.annotations.MinLength;
import javax.validation.constraints.NotBlank;

public class ProvinceModel {
  private Integer id;

  @MinLength(3)
  @NotBlank(message = "{name.not.blank}")
  private String name;

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }
}

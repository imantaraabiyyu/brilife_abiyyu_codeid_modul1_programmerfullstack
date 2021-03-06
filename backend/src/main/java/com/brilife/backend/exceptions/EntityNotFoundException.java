package com.brilife.backend.exceptions;

import com.brilife.backend.exceptions.enums.ResponseCodes;
import org.springframework.http.HttpStatus;

public class EntityNotFoundException extends ApplicationException {
  private static final long serialVersionUID = 6319928901151338347L;

  public EntityNotFoundException() {
    super(
      HttpStatus.NOT_FOUND,
      "exception.entity.not.found",
      ResponseCodes.ENTITY_NOT_FOUND
    );
  }
}

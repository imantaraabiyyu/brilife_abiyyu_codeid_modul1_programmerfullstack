package com.brilife.backend.controllers;

import com.brilife.backend.entities.Contraception;
import com.brilife.backend.models.ContraceptionModel;
import com.brilife.backend.models.PageAbleModel;
import com.brilife.backend.models.ResponseModel;
import com.brilife.backend.services.ContraceptionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.lang.reflect.Type;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/contraceptions")
@RestController
@Validated
@Api(
  value = "Contraception",
  tags = { "contraception" },
  description = "Controller for contraception"
)
public class ContraceptionController {
  @Autowired
  private ContraceptionService contraceptionService;

  @ApiOperation(value = "Find All Contraception", tags = { "contraception" })
  @ApiResponses(
    {
      @ApiResponse(code = 200, message = "OK", response = ResponseModel.class),
      @ApiResponse(code = 404, message = "Entity Not Found")
    }
  )
  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<ContraceptionModel>> findAll(
    @RequestParam(required = false) @ApiParam(
      name = "name",
      type = "String",
      value = "Use this field to find records containing this parameter.",
      example = "Coffee",
      required = false
    ) String name,
    @RequestParam(defaultValue = "asc") @ApiParam(
      name = "sort",
      type = "String",
      value = "Use this field to set order by of data you want to show {defaultValue = asc} .",
      example = "1",
      required = false
    ) String sort,
    @RequestParam(defaultValue = "0") @ApiParam(
      name = "page",
      type = "Integer",
      value = "Use this field to set which you want show, this parameter start from 0 {defaultValue = 0}.",
      example = "1",
      required = false
    ) Integer page,
    @RequestParam(defaultValue = "10") @Max(100) @ApiParam(
      name = "size",
      type = "Integer",
      value = "Use this field to set how much data you want to show {defaultValue = 10} maximum is 100.",
      example = "5",
      required = false
    ) Integer size
  ) {
    Contraception entity = new Contraception(name);
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<Contraception> pageContraceptions = contraceptionService.findAll(
      entity,
      direction,
      page,
      size
    );
    List<Contraception> contraceptions = pageContraceptions.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<ContraceptionModel>>() {}.getType();

    List<ContraceptionModel> ContraceptionModels = modelMapper.map(
      contraceptions,
      type
    );
    PageAbleModel<ContraceptionModel> data = new PageAbleModel<>(
      ContraceptionModels,
      pageContraceptions.getNumber(),
      pageContraceptions.getSize(),
      pageContraceptions.getTotalElements()
    );
    return ResponseModel.success(data);
  }

  @ApiOperation(
    value = "Find Contraception By Id",
    produces = "json",
    tags = { "contraception" }
  )
  @ApiResponses(
    {
      @ApiResponse(code = 200, message = "OK", response = ResponseModel.class),
      @ApiResponse(code = 404, message = "Entity Not Found")
    }
  )
  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<ContraceptionModel> findById(@PathVariable Integer id) {
    Contraception Contraception = contraceptionService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    ContraceptionModel data = modelMapper.map(
      Contraception,
      ContraceptionModel.class
    );

    return ResponseModel.success(data);
  }

  @ApiOperation(
    value = "Add Contraception",
    produces = "json",
    consumes = "json",
    tags = { "contraception" }
  )
  @ApiResponses(
    {
      @ApiResponse(
        code = 201,
        message = "Created",
        response = ResponseModel.class
      ),
      @ApiResponse(code = 400, message = "Illegal Argument")
    }
  )
  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<ContraceptionModel> add(
    @RequestBody @Valid ContraceptionModel model
  ) {
    Contraception addedContraception = contraceptionService.save(
      new Contraception(model.getName())
    );

    ModelMapper modelMapper = new ModelMapper();
    ContraceptionModel data = modelMapper.map(
      addedContraception,
      ContraceptionModel.class
    );

    return ResponseModel.successAdd(data);
  }

  @ApiOperation(
    value = "Edit Contraception",
    produces = "json",
    consumes = "json",
    tags = { "contraception" }
  )
  @ApiResponses(
    {
      @ApiResponse(code = 200, message = "OK", response = ResponseModel.class),
      @ApiResponse(code = 400, message = "Illegal Argument")
    }
  )
  @PutMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<ContraceptionModel> edit(
    @RequestBody @Valid ContraceptionModel model
  ) {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Contraception entity = contraceptionService.findById(model.getId());
    modelMapper.map(model, entity);

    Contraception editedContraception = contraceptionService.save(entity);
    ContraceptionModel data = modelMapper.map(
      editedContraception,
      ContraceptionModel.class
    );
    return ResponseModel.success(data);
  }

  @ApiOperation(
    value = "Delete Contraception",
    produces = "json",
    tags = { "contraception" }
  )
  @ApiResponses(
    {
      @ApiResponse(
        code = 200,
        message = "Created",
        response = ResponseModel.class
      ),
      @ApiResponse(code = 404, message = "Entity Not Found")
    }
  )
  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<ContraceptionModel> delete(@PathVariable Integer id) {
    Contraception deletedContraception = contraceptionService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    ContraceptionModel data = modelMapper.map(
      deletedContraception,
      ContraceptionModel.class
    );

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<ContraceptionModel>> delete(
    @RequestParam Integer[] ids
  ) {
    List<Contraception> deletedContraceptions = contraceptionService.removeAll(
      ids
    );
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<ContraceptionModel>>() {}.getType();
    List<ContraceptionModel> data = modelMapper.map(
      deletedContraceptions,
      type
    );

    return ResponseModel.success(data);
  }
}

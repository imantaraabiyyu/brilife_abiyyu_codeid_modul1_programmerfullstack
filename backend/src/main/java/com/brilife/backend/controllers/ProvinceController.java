package com.brilife.backend.controllers;

import com.brilife.backend.entities.Province;
import com.brilife.backend.models.PageAbleModel;
import com.brilife.backend.models.ProvinceModel;
import com.brilife.backend.models.ResponseModel;
import com.brilife.backend.services.ProvinceService;
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

@RequestMapping("/provinces")
@RestController
@Validated
@Api(
  value = "Province",
  tags = { "province" },
  description = "Controller for province"
)
public class ProvinceController {
  @Autowired
  private ProvinceService provinceService;

  @ApiOperation(value = "Find All Province", tags = { "province" })
  @ApiResponses(
    {
      @ApiResponse(code = 200, message = "OK", response = ResponseModel.class),
      @ApiResponse(code = 404, message = "Entity Not Found")
    }
  )
  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<ProvinceModel>> findAll(
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
    Province entity = new Province(name);
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<Province> pageProvinces = provinceService.findAll(
      entity,
      direction,
      page,
      size
    );
    List<Province> Provinces = pageProvinces.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<ProvinceModel>>() {}.getType();

    List<ProvinceModel> ProvinceModels = modelMapper.map(Provinces, type);
    PageAbleModel<ProvinceModel> data = new PageAbleModel<>(
      ProvinceModels,
      pageProvinces.getNumber(),
      pageProvinces.getSize(),
      pageProvinces.getTotalElements()
    );
    return ResponseModel.success(data);
  }

  @ApiOperation(
    value = "Find Province By Id",
    produces = "json",
    tags = { "province" }
  )
  @ApiResponses(
    {
      @ApiResponse(code = 200, message = "OK", response = ResponseModel.class),
      @ApiResponse(code = 404, message = "Entity Not Found")
    }
  )
  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<ProvinceModel> findById(@PathVariable Integer id) {
    Province Province = provinceService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    ProvinceModel data = modelMapper.map(Province, ProvinceModel.class);

    return ResponseModel.success(data);
  }

  @ApiOperation(
    value = "Add Province",
    produces = "json",
    consumes = "json",
    tags = { "province" }
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
  public ResponseModel<ProvinceModel> add(
    @RequestBody @Valid ProvinceModel model
  ) {
    Province addedProvince = provinceService.save(
      new Province(model.getName())
    );

    ModelMapper modelMapper = new ModelMapper();
    ProvinceModel data = modelMapper.map(addedProvince, ProvinceModel.class);

    return ResponseModel.successAdd(data);
  }

  @ApiOperation(
    value = "Edit Province",
    produces = "json",
    consumes = "json",
    tags = { "province" }
  )
  @ApiResponses(
    {
      @ApiResponse(code = 200, message = "OK", response = ResponseModel.class),
      @ApiResponse(code = 400, message = "Illegal Argument")
    }
  )
  @PutMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<ProvinceModel> edit(
    @RequestBody @Valid ProvinceModel model
  ) {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    Province entity = provinceService.findById(model.getId());
    modelMapper.map(model, entity);

    Province editedProvince = provinceService.save(entity);
    ProvinceModel data = modelMapper.map(editedProvince, ProvinceModel.class);
    return ResponseModel.success(data);
  }

  @ApiOperation(
    value = "Delete Province",
    produces = "json",
    tags = { "province" }
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
  public ResponseModel<ProvinceModel> delete(@PathVariable Integer id) {
    Province deletedProvince = provinceService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    ProvinceModel data = modelMapper.map(deletedProvince, ProvinceModel.class);

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<ProvinceModel>> delete(
    @RequestParam Integer[] ids
  ) {
    List<Province> deletedProvinces = provinceService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<ProvinceModel>>() {}.getType();
    List<ProvinceModel> data = modelMapper.map(deletedProvinces, type);

    return ResponseModel.success(data);
  }
}

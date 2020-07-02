package com.brilife.backend.controllers;

import com.brilife.backend.entities.Contraception;
import com.brilife.backend.entities.ContraceptionUser;
import com.brilife.backend.entities.Province;
import com.brilife.backend.models.ContraceptionUserModel;
import com.brilife.backend.models.ContraceptionUserRequestModel;
import com.brilife.backend.models.PageAbleModel;
import com.brilife.backend.models.ResponseModel;
import com.brilife.backend.services.ContraceptionService;
import com.brilife.backend.services.ContraceptionUserService;
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

@RequestMapping("/contraception-users")
@RestController
@Validated
@Api(
  value = "ContraceptionUser",
  tags = { "contraceptionUser" },
  description = "Controller for contraceptionUser"
)
public class ContraceptionUserController {
  @Autowired
  private ProvinceService provinceService;

  @Autowired
  private ContraceptionService contraceptionService;

  @Autowired
  private ContraceptionUserService contraceptionUserService;

  @ApiOperation(
    value = "Find All ContraceptionUser",
    tags = { "contraceptionUser" }
  )
  @ApiResponses(
    {
      @ApiResponse(code = 200, message = "OK", response = ResponseModel.class),
      @ApiResponse(code = 404, message = "Entity Not Found")
    }
  )
  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<ContraceptionUserModel>> findAll(
    @RequestParam(required = false) @ApiParam(
      name = "provinceName",
      type = "String",
      value = "Use this field to find records containing this parameter.",
      example = "Coffee",
      required = false
    ) String provinceName,
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
    Province province = new Province(provinceName);
    ContraceptionUser entity = new ContraceptionUser(province);
    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<ContraceptionUser> pageContraceptionUsers = contraceptionUserService.findAll(
      entity,
      direction,
      page,
      size
    );
    List<ContraceptionUser> contraceptionUsers = pageContraceptionUsers.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<ContraceptionUserModel>>() {}.getType();

    List<ContraceptionUserModel> contraceptionUserModels = modelMapper.map(
      contraceptionUsers,
      type
    );

    PageAbleModel<ContraceptionUserModel> data = new PageAbleModel<>(
      contraceptionUserModels,
      pageContraceptionUsers.getNumber(),
      pageContraceptionUsers.getSize(),
      pageContraceptionUsers.getTotalElements()
    );
    return ResponseModel.success(data);
  }

  @ApiOperation(
    value = "Find ContraceptionUser By Id",
    produces = "json",
    tags = { "contraceptionUser" }
  )
  @ApiResponses(
    {
      @ApiResponse(code = 200, message = "OK", response = ResponseModel.class),
      @ApiResponse(code = 404, message = "Entity Not Found")
    }
  )
  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<ContraceptionUserModel> findById(
    @PathVariable Integer id
  ) {
    ContraceptionUser contraceptionUser = contraceptionUserService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    ContraceptionUserModel data = modelMapper.map(
      contraceptionUser,
      ContraceptionUserModel.class
    );

    return ResponseModel.success(data);
  }

  @ApiOperation(
    value = "Add ContraceptionUser",
    produces = "json",
    consumes = "json",
    tags = { "contraceptionUser" }
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
  public ResponseModel<ContraceptionUserModel> add(
    @RequestBody @Valid ContraceptionUserRequestModel model
  ) {
    Integer qty = model.getQty();
    Province province = provinceService.findById(model.getProvinceId());
    Contraception contraception = contraceptionService.findById(
      model.getContraceptionId()
    );
    ContraceptionUser addedContraceptionUser = contraceptionUserService.save(
      new ContraceptionUser(province, contraception, qty)
    );

    ModelMapper modelMapper = new ModelMapper();
    ContraceptionUserModel data = modelMapper.map(
      addedContraceptionUser,
      ContraceptionUserModel.class
    );

    return ResponseModel.successAdd(data);
  }

  @ApiOperation(
    value = "Edit ContraceptionUser",
    produces = "json",
    consumes = "json",
    tags = { "contraceptionUser" }
  )
  @ApiResponses(
    {
      @ApiResponse(code = 200, message = "OK", response = ResponseModel.class),
      @ApiResponse(code = 400, message = "Illegal Argument")
    }
  )
  @PutMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<ContraceptionUserModel> edit(
    @RequestBody @Valid ContraceptionUserRequestModel model
  ) {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    ContraceptionUser entity = contraceptionUserService.findById(model.getId());
    entity.setProvince(provinceService.findById(model.getProvinceId()));
    entity.setContraception(
      contraceptionService.findById(model.getContraceptionId())
    );
    modelMapper.map(model, entity);

    ContraceptionUser editedContraceptionUser = contraceptionUserService.save(
      entity
    );
    ContraceptionUserModel data = modelMapper.map(
      editedContraceptionUser,
      ContraceptionUserModel.class
    );
    return ResponseModel.success(data);
  }

  @ApiOperation(
    value = "Delete ContraceptionUser",
    produces = "json",
    tags = { "contraceptionUser" }
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
  public ResponseModel<ContraceptionUserModel> delete(
    @PathVariable Integer id
  ) {
    ContraceptionUser deletedContraceptionUser = contraceptionUserService.removeById(
      id
    );

    ModelMapper modelMapper = new ModelMapper();
    ContraceptionUserModel data = modelMapper.map(
      deletedContraceptionUser,
      ContraceptionUserModel.class
    );

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<ContraceptionUserModel>> delete(
    @RequestParam Integer[] ids
  ) {
    List<ContraceptionUser> deletedContraceptionUsers = contraceptionUserService.removeAll(
      ids
    );
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<ContraceptionUserModel>>() {}.getType();
    List<ContraceptionUserModel> data = modelMapper.map(
      deletedContraceptionUsers,
      type
    );

    return ResponseModel.success(data);
  }
}

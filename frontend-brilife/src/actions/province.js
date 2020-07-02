import {
  DELETE_PROVINCE_REQUEST,
  DELETE_PROVINCE_SUCCESS,
  DELETE_PROVINCE_FAILURE,
  DELETE_PROVINCES_REQUEST,
  DELETE_PROVINCES_SUCCESS,
  DELETE_PROVINCES_FAILURE,
  FIND_PROVINCE_REQUEST,
  FIND_PROVINCE_SUCCESS,
  FIND_PROVINCE_FAILURE,
  FIND_PROVINCES_REQUEST,
  FIND_PROVINCES_SUCCESS,
  FIND_PROVINCES_FAILURE,
  SAVE_PROVINCE_REQUEST,
  SAVE_PROVINCE_SUCCESS,
  SAVE_PROVINCE_FAILURE
} from "./constants";
import { commonAxios } from "../util/apiUtil";
import Swal from "sweetalert2";

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_PROVINCE_REQUEST
  });

  commonAxios
    .delete(`provinces/${id}`)
    .then((data) => {
      dispatch(deleteProvinceSuccess(data));
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteProvinceFailure(error));
    });
};

export const deleteAll = (ids) => (dispatch) => {
  dispatch({
    type: DELETE_PROVINCES_REQUEST
  });

  commonAxios
    .delete(`provinces?${ids.map((id) => "ids=" + id).join("&")}`)
    .then((data) => {
      dispatch(deleteProvincesSuccess(data));
    })
    .then(() => {
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteProvincesFailure(error));
    });
};

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_PROVINCE_REQUEST
  });

  commonAxios
    .get(`provinces/${id}`)
    .then((data) => {
      dispatch(findProvinceSuccess(data));
    })
    .catch((error) => {
      dispatch(findProvinceFailure(error));
    });
};

export const findAll = ({ search, sort = "asc", page = 0, size = 10 } = {}) => (
  dispatch
) => {
  dispatch({
    type: FIND_PROVINCES_REQUEST
  });

  commonAxios
    .get("provinces", {
      params: {
        ...search,
        sort,
        page,
        size
      }
    })
    .then((data) => {
      dispatch(findProvincesSuccess(data));
    })
    .catch((error) => {
      dispatch(findProvincesFailure(error));
    });
};

export const save = ({ id, name, description } = {}) => (dispatch) => {
  dispatch({
    type: SAVE_PROVINCE_REQUEST
  });

  const request = id
    ? commonAxios.put(`provinces/`, { id, name, description })
    : commonAxios.post("provinces/", { name, description });

  request
    .then((data) => {
      dispatch(saveProvinceSuccess(data));
    })
    .then(() => {
      dispatch(Swal.fire("Success", "Province Successfully Saved!", "success"));
    })
    .catch((error) => {
      dispatch(saveProvinceFailure(error));
    });
};

function saveProvinceSuccess(data) {
  return {
    type: SAVE_PROVINCE_SUCCESS,
    data: data
  };
}

function saveProvinceFailure(error) {
  return {
    type: SAVE_PROVINCE_FAILURE,
    error: error
  };
}

function deleteProvinceSuccess(data) {
  return {
    type: DELETE_PROVINCE_SUCCESS,
    data: data
  };
}

function deleteProvinceFailure(error) {
  return {
    type: DELETE_PROVINCE_FAILURE,
    error: error
  };
}

function deleteProvincesSuccess(data) {
  return {
    type: DELETE_PROVINCES_SUCCESS,
    data: data
  };
}

function deleteProvincesFailure(error) {
  return {
    type: DELETE_PROVINCES_FAILURE,
    error: error
  };
}

function findProvinceSuccess(data) {
  return {
    type: FIND_PROVINCE_SUCCESS,
    data: data
  };
}

function findProvinceFailure(error) {
  return {
    type: FIND_PROVINCE_FAILURE,
    error: error
  };
}

function findProvincesSuccess(data) {
  return {
    type: FIND_PROVINCES_SUCCESS,
    data: data
  };
}

function findProvincesFailure(error) {
  return {
    type: FIND_PROVINCES_FAILURE,
    error: error
  };
}

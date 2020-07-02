import {
  DELETE_CONTRACEPTION_USER_REQUEST,
  DELETE_CONTRACEPTION_USER_SUCCESS,
  DELETE_CONTRACEPTION_USER_FAILURE,
  DELETE_CONTRACEPTION_USERS_REQUEST,
  DELETE_CONTRACEPTION_USERS_SUCCESS,
  DELETE_CONTRACEPTION_USERS_FAILURE,
  FIND_CONTRACEPTION_USER_REQUEST,
  FIND_CONTRACEPTION_USER_SUCCESS,
  FIND_CONTRACEPTION_USER_FAILURE,
  FIND_CONTRACEPTION_USERS_REQUEST,
  FIND_CONTRACEPTION_USERS_SUCCESS,
  FIND_CONTRACEPTION_USERS_FAILURE,
  SAVE_CONTRACEPTION_USER_REQUEST,
  SAVE_CONTRACEPTION_USER_SUCCESS,
  SAVE_CONTRACEPTION_USER_FAILURE
} from "./constants";
import { commonAxios } from "../util/apiUtil";
import Swal from "sweetalert2";

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_CONTRACEPTION_USER_REQUEST
  });

  commonAxios
    .delete(`contraception-users/${id}`)
    .then((data) => {
      dispatch(deleteContraceptionUserSuccess(data));
      dispatch(findAll());
    })
    .catch((error) => {
      console.log(error);
      dispatch(deleteContraceptionUserFailure(error));
    });
};

export const deleteAll = (ids) => (dispatch) => {
  dispatch({
    type: DELETE_CONTRACEPTION_USERS_REQUEST
  });

  commonAxios
    .delete(`contraception-users?${ids.map((id) => "ids=" + id).join("&")}`)
    .then((data) => {
      dispatch(deleteContraceptionUsersSuccess(data));
    })
    .then(() => {
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteContraceptionUsersFailure(error));
    });
};

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_CONTRACEPTION_USER_REQUEST
  });

  commonAxios
    .get(`contraception-users/${id}`)
    .then((data) => {
      dispatch(findContraceptionUserSuccess(data));
    })
    .catch((error) => {
      dispatch(findContraceptionUserFailure(error));
    });
};

export const findAll = ({ search, sort = "asc", page = 0, size = 10 } = {}) => (
  dispatch
) => {
  dispatch({
    type: FIND_CONTRACEPTION_USERS_REQUEST
  });

  commonAxios
    .get("contraception-users", {
      params: {
        ...search,
        sort,
        page,
        size
      }
    })
    .then((data) => {
      dispatch(findContraceptionUsersSuccess(data));
    })
    .catch((error) => {
      dispatch(findContraceptionUsersFailure(error));
    });
};

export const save = ({ id, province, qty, contraception } = {}) => (
  dispatch
) => {
  dispatch({
    type: SAVE_CONTRACEPTION_USER_REQUEST
  });
  let provinceId = province.id;
  let contraceptionId = contraception.id;
  const request = id
    ? commonAxios.put(`contraception-users/`, {
        id,
        provinceId,
        qty,
        contraceptionId
      })
    : commonAxios.post("contraception-users/", {
        provinceId,
        qty,
        contraceptionId
      });

  request
    .then((data) => {
      dispatch(saveContraceptionUserSuccess(data));
    })
    .then(() => {
      dispatch(Swal.fire("Success", "Province Successfully Saved!", "success"));
    })
    .catch((error) => {
      dispatch(saveContraceptionUserFailure(error));
    });
};

function saveContraceptionUserSuccess(data) {
  return {
    type: SAVE_CONTRACEPTION_USER_SUCCESS,
    data: data
  };
}

function saveContraceptionUserFailure(error) {
  return {
    type: SAVE_CONTRACEPTION_USER_FAILURE,
    error: error
  };
}

function deleteContraceptionUserSuccess(data) {
  return {
    type: DELETE_CONTRACEPTION_USER_SUCCESS,
    data: data
  };
}

function deleteContraceptionUserFailure(error) {
  return {
    type: DELETE_CONTRACEPTION_USER_FAILURE,
    error: error
  };
}

function deleteContraceptionUsersSuccess(data) {
  return {
    type: DELETE_CONTRACEPTION_USERS_SUCCESS,
    data: data
  };
}

function deleteContraceptionUsersFailure(error) {
  return {
    type: DELETE_CONTRACEPTION_USERS_FAILURE,
    error: error
  };
}

function findContraceptionUserSuccess(data) {
  return {
    type: FIND_CONTRACEPTION_USER_SUCCESS,
    data: data
  };
}

function findContraceptionUserFailure(error) {
  return {
    type: FIND_CONTRACEPTION_USER_FAILURE,
    error: error
  };
}

function findContraceptionUsersSuccess(data) {
  return {
    type: FIND_CONTRACEPTION_USERS_SUCCESS,
    data: data
  };
}

function findContraceptionUsersFailure(error) {
  return {
    type: FIND_CONTRACEPTION_USERS_FAILURE,
    error: error
  };
}

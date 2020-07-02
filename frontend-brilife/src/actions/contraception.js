import {
  DELETE_CONTRACEPTION_REQUEST,
  DELETE_CONTRACEPTION_SUCCESS,
  DELETE_CONTRACEPTION_FAILURE,
  DELETE_CONTRACEPTIONS_REQUEST,
  DELETE_CONTRACEPTIONS_SUCCESS,
  DELETE_CONTRACEPTIONS_FAILURE,
  FIND_CONTRACEPTION_REQUEST,
  FIND_CONTRACEPTION_SUCCESS,
  FIND_CONTRACEPTION_FAILURE,
  FIND_CONTRACEPTIONS_REQUEST,
  FIND_CONTRACEPTIONS_SUCCESS,
  FIND_CONTRACEPTIONS_FAILURE,
  SAVE_CONTRACEPTION_REQUEST,
  SAVE_CONTRACEPTION_SUCCESS,
  SAVE_CONTRACEPTION_FAILURE
} from "./constants";
import { commonAxios } from "../util/apiUtil";
import Swal from "sweetalert2";

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_CONTRACEPTION_REQUEST
  });

  commonAxios
    .delete(`contraceptions/${id}`)
    .then((data) => {
      dispatch(deleteContraceptionSuccess(data));
    })
    .then(() => {
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteContraceptionFailure(error));
    });
};

export const deleteAll = (ids) => (dispatch) => {
  dispatch({
    type: DELETE_CONTRACEPTIONS_REQUEST
  });

  commonAxios
    .delete(`contraceptions?${ids.map((id) => "ids=" + id).join("&")}`)
    .then((data) => {
      dispatch(deleteContraceptionsSuccess(data));
      dispatch(findAll());
    })
    .catch((error) => {
      dispatch(deleteContraceptionsFailure(error));
    });
};

export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_CONTRACEPTION_REQUEST
  });

  commonAxios
    .get(`contraceptions/${id}`)
    .then((data) => {
      dispatch(findContraceptionSuccess(data));
    })
    .catch((error) => {
      dispatch(findContraceptionFailure(error));
    });
};

export const findAll = ({ search, sort = "asc", page = 0, size = 10 } = {}) => (
  dispatch
) => {
  dispatch({
    type: FIND_CONTRACEPTIONS_REQUEST
  });

  commonAxios
    .get("contraceptions", {
      params: {
        ...search,
        sort,
        page,
        size
      }
    })
    .then((data) => {
      dispatch(findContraceptionsSuccess(data));
    })
    .catch((error) => {
      dispatch(findContraceptionsFailure(error));
    });
};

export const save = ({ id, name, description } = {}) => (dispatch) => {
  dispatch({
    type: SAVE_CONTRACEPTION_REQUEST
  });

  const request = id
    ? commonAxios.put(`contraceptions/`, { id, name, description })
    : commonAxios.post("contraceptions/", { name, description });

  request
    .then((data) => {
      dispatch(saveContraceptionSuccess(data));
    })
    .then(() => {
      dispatch(Swal.fire("Success", "Province Successfully Saved!", "success"));
    })
    .catch((error) => {
      dispatch(saveContraceptionFailure(error));
    });
};

function saveContraceptionSuccess(data) {
  return {
    type: SAVE_CONTRACEPTION_SUCCESS,
    data: data
  };
}

function saveContraceptionFailure(error) {
  return {
    type: SAVE_CONTRACEPTION_FAILURE,
    error: error
  };
}

function deleteContraceptionSuccess(data) {
  return {
    type: DELETE_CONTRACEPTION_SUCCESS,
    data: data
  };
}

function deleteContraceptionFailure(error) {
  return {
    type: DELETE_CONTRACEPTION_FAILURE,
    error: error
  };
}

function deleteContraceptionsSuccess(data) {
  return {
    type: DELETE_CONTRACEPTIONS_SUCCESS,
    data: data
  };
}

function deleteContraceptionsFailure(error) {
  return {
    type: DELETE_CONTRACEPTIONS_FAILURE,
    error: error
  };
}

function findContraceptionSuccess(data) {
  return {
    type: FIND_CONTRACEPTION_SUCCESS,
    data: data
  };
}

function findContraceptionFailure(error) {
  return {
    type: FIND_CONTRACEPTION_FAILURE,
    error: error
  };
}

function findContraceptionsSuccess(data) {
  return {
    type: FIND_CONTRACEPTIONS_SUCCESS,
    data: data
  };
}

function findContraceptionsFailure(error) {
  return {
    type: FIND_CONTRACEPTIONS_FAILURE,
    error: error
  };
}

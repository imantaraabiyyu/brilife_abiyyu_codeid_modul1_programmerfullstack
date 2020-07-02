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
} from "../actions/constants";

const defaultState = {
  saveSuccess: false,
  data: null,
  loading: false,
  error: null
};

export function ContraceptionUsers(state = defaultState, action) {
  switch (action.type) {
    case FIND_CONTRACEPTION_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_CONTRACEPTION_USERS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_CONTRACEPTION_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_CONTRACEPTION_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_CONTRACEPTION_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_CONTRACEPTION_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function ContraceptionUser(state = defaultState, action) {
  switch (action.type) {
    case FIND_CONTRACEPTION_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_CONTRACEPTION_USER_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_CONTRACEPTION_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SAVE_CONTRACEPTION_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_CONTRACEPTION_USER_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case SAVE_CONTRACEPTION_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_CONTRACEPTION_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_CONTRACEPTION_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case DELETE_CONTRACEPTION_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FIND_CONTRACEPTION_USERS_SUCCESS:
      return {
        data: action.data,
        saveSuccess: false
      };
    default:
      return state;
  }
}

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
} from "../actions/constants";

const defaultState = {
  saveSuccess: false,
  data: null,
  loading: false,
  error: null
};

export function Contraceptions(state = defaultState, action) {
  switch (action.type) {
    case FIND_CONTRACEPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_CONTRACEPTIONS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_CONTRACEPTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_CONTRACEPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_CONTRACEPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_CONTRACEPTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function Contraception(state = defaultState, action) {
  switch (action.type) {
    case FIND_CONTRACEPTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_CONTRACEPTION_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_CONTRACEPTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SAVE_CONTRACEPTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_CONTRACEPTION_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case SAVE_CONTRACEPTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_CONTRACEPTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_CONTRACEPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case DELETE_CONTRACEPTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FIND_CONTRACEPTIONS_SUCCESS:
      return {
        ...state,
        saveSuccess: false
      };
    default:
      return state;
  }
}

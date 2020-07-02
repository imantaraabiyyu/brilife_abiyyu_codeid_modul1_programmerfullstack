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
} from "../actions/constants";

const defaultState = {
  saveSuccess: false,
  data: null,
  loading: false,
  error: null,
  image: null
};

export function Provinces(state = defaultState, action) {
  switch (action.type) {
    case FIND_PROVINCES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_PROVINCES_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_PROVINCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_PROVINCES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_PROVINCES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_PROVINCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function Province(state = defaultState, action) {
  switch (action.type) {
    case FIND_PROVINCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_PROVINCE_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_PROVINCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SAVE_PROVINCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_PROVINCE_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case SAVE_PROVINCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_PROVINCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_PROVINCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        saveSuccess: true
      };
    case DELETE_PROVINCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FIND_PROVINCES_SUCCESS:
      return {
        ...state,
        saveSuccess: false
      };
    default:
      return state;
  }
}

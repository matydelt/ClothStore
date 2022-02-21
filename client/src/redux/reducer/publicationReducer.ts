import type { Reducer } from "redux";
import type { Action } from "../actions/publicationActions";
import type { Publication } from "./stateTypes";

export interface PublicationState {
  publicationList: any;
  loading: boolean;
  publications?: Publication[] | string | any;
  publicationsAdm: Publication[] | any;
  error?: string;
  cartLength: number;
  mark: string;
  category: string;
  gender: string;
  price: string;
  author: string;
  name: string;
  order: string;
  page: string;
  count: number | any;
}

const publicationListReducer: Reducer<PublicationState, Action> = (
  state = {
    publicationList: {},
    loading: false,
    publications: [],
    publicationsAdm: [],
    error: "",
    cartLength: 0,
    mark: "",
    category: "",
    gender: "",
    price: "",
    author: "",
    name: "",
    order: "Ascendente",
    page: "1",
    count: 0,
  },
  action
) => {
  switch (action.type) {
    case "PUBLICATION_LIST_REQUEST":
      return { ...state, loading: true };
    case "PUBLICATION_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        publications: action.payload?.success,
        mark: action.cartPayload?.mark,
        category: action.cartPayload?.category,
        gender: action.cartPayload?.gender,
        price: action.cartPayload?.price,
        author: action.cartPayload?.author,
        count: action.countPayload,
      };
    case "PUBLICATION_LIST_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    case "PUBLICATION_NAME_REQUEST":
      return { ...state, loading: true };
    case "PUBLICATION_NAME_SUCCESS":
      return {
        ...state,
        loading: false,
        publications: action.payload?.success,
      };
    case "PUBLICATION_NAME_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload?.error,
      };
    case "GET_PUBLICATIONS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_PUBLICATIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        publicationsAdm: action.payload?.success,
      };
    case "GET_PUBLICATIONS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload?.error,
      };
    default:
      return state;
  }
};

const publicationSaveReducer: Reducer<PublicationState, Action> = (
  state = {
    publicationList: {},
    loading: false,
    publications: [],
    publicationsAdm: [],
    error: "",
    cartLength: 0,
    mark: "",
    category: "",
    gender: "",
    price: "",
    author: "",
    name: "",
    order: "Asendente",
    page: "1",
    count: 0,
  },
  action
) => {
  switch (action.type) {
    case "CART_LENGTH":
      return { ...state, cartLength: action.cartPayload };
    case "PUBLICATION_SAVE_REQUEST":
      return { ...state, loading: true };
    case "PUBLICATION_SAVE_SUCCESS":
      return { ...state, loading: false };
    case "PUBLICATION_SAVE_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    case "ACTIVATE_PUBLICATION_REQUEST":
      return { ...state, loading: true };
    case "ACTIVATE_PUBLICATION_SUCCESS":
      return { ...state, loading: false };
    case "MESSAGE_PUBLICATION_REQUEST":
      return { ...state, loading: true };
    case "MESSAGE_PUBLICATION_SUCCESS":
      return { ...state, loading: false };
    case "MESSAGE_PUBLICATION_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    case "ACTIVATE_PUBLICATION_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export { publicationListReducer, publicationSaveReducer };

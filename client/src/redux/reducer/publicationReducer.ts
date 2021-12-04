import { Action } from "../actions/publicationActions";
import { Publication } from "./stateTypes";

export interface PublicationState {
  publicationList: any;
  loading: boolean;
  publications?: Publication[] | string | any;
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
  count: number| any;
}

const publicationListReducer = (
  state: PublicationState = {
    publicationList: {},
    loading: false,
    publications: [],
    error: "",
    cartLength: 0,
    mark: "",
    category: "",
    gender: "",
    price: "",
    author: "",
    name: "",
    order: "",
    page: "1",
    count: 0
  },
  action: Action
): PublicationState => {
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
    default:
      return state;
  }
};

const publicationSaveReducer = (
  state: PublicationState = {
    publicationList: {},
    loading: false,
    publications: [],
    error: "",
    cartLength: 0,
    mark: "",
    category: "",
    gender: "",
    price: "",
    author: "",
    name: "",
    order: "",
    page: "1",
    count: 0,
  },
  action: Action
): PublicationState => {
  switch (action.type) {
    case "CART_LENGTH":
      return { ...state, cartLength: action.cartPayload };
    case "PUBLICATION_SAVE_REQUEST":
      return { ...state, loading: true };
    case "PUBLICATION_SAVE_SUCCESS":
      return { ...state, loading: false };
    case "PUBLICATION_SAVE_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export { publicationListReducer, publicationSaveReducer };

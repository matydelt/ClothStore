import { Action } from "../actions/publicationActions";
import { Publication } from "./stateTypes";

export interface PublicationState {
  publicationList: any;
  loading?: boolean;
  publications?: Publication[] | string | any;
  error?: string;
}

const publicationListReducer = (
  state: PublicationState = {
    publicationList: {},
    loading: true,
    publications: [],
    error: "",
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
    loading: true,
    publications: [],
    error: "",
  },
  action: Action
): PublicationState => {
  switch (action.type) {
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

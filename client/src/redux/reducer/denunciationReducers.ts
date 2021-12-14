import { Action } from "../actions/denunciationActions";
import { Publication, User } from "./stateTypes";

export interface Denunciation {
    message: string;
    state: boolean;
    author: [string];
    publication: [string];
    _id: string;
}
export interface DenunciationData {
    denunciation: Denunciation;
    author: User;
    infractor: User;
    publication: Publication;

}

export interface DenunciationState {
    denunciations?: DenunciationData[];
    loading: boolean;
    error?: string;
}

const DenunciationReducer = (
    state: DenunciationState = { denunciations: [], loading: false },
    action: Action
): DenunciationState => {
    switch (action.type) {
        case "DENUNCIATION_GET_REQUEST":
            return { ...state, loading: true };
        case "DENUNCIATION_GET_SUCCESS":
            return { ...state, loading: false, denunciations: action.payload?.success };
        case "DENUNCIATION_GET_FAIL":
            return { ...state, loading: false, error: action.payload?.error };
        case "DENUNCIATION_POST_REQUEST":
            return { ...state, loading: true };
        case "DENUNCIATION_POST_SUCCESS":
            return { ...state, loading: false };
        case "DENUNCIATION_POST_FAIL":
            return { ...state, loading: false, error: action.payload?.error };
        case "DENUNCIATION_PUT_REQUEST":
            return { ...state, loading: true };
        case "DENUNCIATION_PUT_SUCCESS":
            return { ...state, loading: false };
        case "DENUNCIATION_PUT_FAIL":
            return { ...state, loading: false, error: action.payload?.error };
        case "DENUNCIATION_DELETE_REQUEST":
            return { ...state, loading: true };
        case "DENUNCIATION_DELETE_SUCCESS":
            return { ...state, loading: false };
        case "DENUNCIATION_DELETE_FAIL":
            return { ...state, loading: false, error: action.payload?.error };
        default:
            return state;
    }
};

export { DenunciationReducer };

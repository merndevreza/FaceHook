import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  error: false,
};
const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        posts: action.data,
      };
    }
    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actions.post.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        posts:[...state.posts,action.data]
      };
    }

    default: {
      return state;
    }
  }
};
export {initialState,postReducer}
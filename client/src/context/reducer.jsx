import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_FAIL,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  LOGOUT_USER,
  GET_CALORIE_BEGIN,
  GET_CALORIE_SUCCESS,
  GET_CALORIE_FAIL,
  CALCULATE_CALORIE_SUCCESS,
  CALCULATE_CALORIE_FAIL,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'green',
        alertText: action.payload.text
          ? action.payload.text
          : 'Please provide all values',
      };
      break;

    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };
      break;

    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'green',
        alertText: action.payload.alertText,
        user: action.payload.user,
        token: action.payload.token,
      };
      break;

    case SETUP_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: '',
        alertText: action.payload.msg,
      };
      break;

    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'green',
        alertText: action.payload.alertText,
        user: action.payload.user,
        token: action.payload.token,
      };
      break;

    case UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: '',
        alertText: action.payload.msg,
      };
      break;

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: '',
      };
      break;

    case GET_CALORIE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case GET_CALORIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSearching: true,
        foodName: action.payload.name,
        foodCalorie: action.payload.calorie,
      };
      break;

    case GET_CALORIE_FAIL:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'red',
        alertText: action.payload.msg,
      };
      break;

    case CALCULATE_CALORIE_SUCCESS:
      return {
        ...state,
        isCalculating: true,
        showAlert: true,
        alertType: 'green',
        alertText: action.payload.alertText,
        calorieOfUser: action.payload.calorieOfUser.toString(),
      };
      break;

    case CALCULATE_CALORIE_FAIL:
      return {
        ...state,
        isCalculating: false,
        showAlert: true,
        alertType: 'red',
        alertText: action.payload.msg,
      };
      break;

    default:
      return state;
  }
};

export default reducer;

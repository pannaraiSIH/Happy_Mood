import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';

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

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState = {
  showAlert: false,
  alertType: '',
  alertText: '',
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token || '',
  isSearching: false,
  foodName: '',
  isCalculating: false,
  foodCalorie: null,
  calorieOfUser: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = text => {
    dispatch({ type: DISPLAY_ALERT, payload: { text } });

    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const setUpUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const response = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );
      const { user, token } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const updateUser = async ({ currentUser, authHeader, alertText }) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const response = await axios.post(
        '/api/v1/auth/updateUser',
        currentUser,
        {
          headers: {
            Authorization: `Bearer ${authHeader}`,
          },
        }
      );
      const { user, token } = response.data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, alertText },
      });

      // add new info to localstorage
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const logoutUser = () => {
    removeUserFromLocalStorage();
    dispatch({ type: LOGOUT_USER });
  };

  const getCalorie = async search => {
    dispatch({ type: GET_CALORIE_BEGIN });

    try {
      const response = await axios.get(`/api/v1/calorie?query=${search}`);
      const { name, calorie } = response.data;
      dispatch({ type: GET_CALORIE_SUCCESS, payload: { name, calorie } });
    } catch (error) {
      dispatch({
        type: GET_CALORIE_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const calculateCalorie = async ({ currentUser, authHeader, alertText }) => {
    try {
      const response = await axios.post('/api/v1/calorie', currentUser, {
        headers: { Authorization: `Bearer ${authHeader}` },
      });
      const { calorieOfUser, createdAt } = response.data;
      dispatch({
        type: CALCULATE_CALORIE_SUCCESS,
        payload: { calorieOfUser, createdAt, alertText },
      });
    } catch (error) {
      dispatch({
        type: CALCULATE_CALORIE_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setUpUser,
        updateUser,
        logoutUser,
        getCalorie,
        calculateCalorie,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };

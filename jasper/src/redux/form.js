const FORM_RESET = "formReset";
const SHOW_FORM = "showForm";
const HIDE_FORM = "hideForm";
const ACCOUNT_CREATION_SUCCESS = "accountCompletionSuccess";
const ACCOUNT_DETAIL_SUCCESS = "accountDetailSuccess";

// ACTION
export const formReset = () => ({
  type: FORM_RESET,
});

export const showForm = () => ({
  type: SHOW_FORM,
});

export const hideForm = () => ({
  type: HIDE_FORM,
});

export const accountCreationSuccess = () => ({
  type: ACCOUNT_CREATION_SUCCESS,
});

export const accountDetailSuccess = () => ({
  type: ACCOUNT_DETAIL_SUCCESS,
});

// STATE
const initialState = {
  formVisible: false,
  accountCreationSuccess: false,
  accountDetailSuccess: false,
};

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_CREATION_SUCCESS:
      return { ...state, accountCreationSuccess: true };
    case ACCOUNT_DETAIL_SUCCESS:
      return { ...state, accountDetailSuccess: true };
    case SHOW_FORM:
      return { ...state, formVisible: true };
    case HIDE_FORM:
      return { ...state, formVisible: false };
    case FORM_RESET:
      return {
        formVisible: false,
        accountCreationSuccess: false,
        accountDetailSuccess: false,
      };
    default:
      return state;
  }
};

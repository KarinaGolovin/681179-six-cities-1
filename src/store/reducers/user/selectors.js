export const getAuthorizationStatus = (state) => {
  return state.user.isAuthorizationRequired;
};

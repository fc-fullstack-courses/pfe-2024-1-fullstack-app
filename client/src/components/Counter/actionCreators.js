import ACTION_TYPES from "./actionTypes";

// actionCreators - спеціальні функції, які повертають об'єкти екшенів з корректною структурою 

export const increment = () => {
  return {
    type: ACTION_TYPES.INCREMENT
  }
}

export const setStep = (payload) => ({
  type: ACTION_TYPES.SET_STEP,
  payload
});

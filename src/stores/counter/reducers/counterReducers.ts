import { Reducer } from "react";

export interface StateType {
  count: number;
}

export interface ActionType {
  type: string;
  num?: number;
}

export const counterReducer: Reducer<StateType, ActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case "increase 1":
      return { ...state, count: state.count + 1 };
    case "decrease 1":
      return { ...state, count: state.count - 1 };
    case "increase n":
      if (action.num !== undefined) {
        return {...state, count: state.count + action.num}
      }
      return { ...state, count: state.count + 1 };
    default:
      throw new Error('unknow action type')
  }
};

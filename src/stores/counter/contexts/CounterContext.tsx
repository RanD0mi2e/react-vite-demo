import { ReactNode, createContext, useReducer } from "react"
import { ActionType, StateType, counterReducer } from "../reducers/counterReducers"

const initCountState = {
  count: 0
}
export const CounterContext = createContext<StateType | null>(null)
export const CounterDispathContext = createContext<React.Dispatch<ActionType> | null>(null)

export function CounterProvider({children}: {children: ReactNode}) {
  const [count, countDispatch] = useReducer(counterReducer, initCountState)

  return (
    <CounterContext.Provider value={count}>
      <CounterDispathContext.Provider value={countDispatch}>
        {children}
      </CounterDispathContext.Provider>
    </CounterContext.Provider>
  )
}


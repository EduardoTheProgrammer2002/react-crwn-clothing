import { AnyAction } from "redux";

type Matcher<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>;
  match(action: AnyAction): action is ReturnType<AC> 
}

export function withMatcher<AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matcher<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matcher<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    }
  })
}



export type ActionWithPayload<T extends string, P> = {
  type: T,
  payload: P
}

export type Action<T extends string> = {
  type: T
}

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>

export function createAction<T extends string>(type: T, payload: void): Action<T>

export function createAction<T extends string, P>(type: T, payload: P) {
  return {type, payload}
} 
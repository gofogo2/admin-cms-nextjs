import React, { createContext, Dispatch, useContext, useReducer } from "react";

export type CurrentPage = {
  id: number;
};
type PageState = CurrentPage;
const PageStateContext = createContext<PageState | undefined>(undefined);

type Action = { type: "CHANGE"; id: number } | { type: "TOGGLE"; id: number };

type PageDispatcher = Dispatch<Action>;

const PageDispatchContext = createContext<PageDispatcher | undefined>(
  undefined
);

function pageReducer(state: PageState, action: Action): PageState {
  switch (action.type) {
    case "CHANGE":
      console.log(action.id);
      return {
        id: action.id,
      };
    default:
      throw new Error("Unhandled action");
  }
}

export function PageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, dispatch] = useReducer(pageReducer, {
    id: 1,
  });

  return (
    <PageDispatchContext.Provider value={dispatch}>
      <PageStateContext.Provider value={page}>
        {children}
      </PageStateContext.Provider>
    </PageDispatchContext.Provider>
  );
}

export function usePageState() {
  const state = useContext(PageStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
}

export function usePageDispatch() {
  const dispatch = useContext(PageDispatchContext);
  if (!dispatch) throw new Error("TodosProvider not found");
  return dispatch;
}

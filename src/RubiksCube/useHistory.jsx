import {
    useReducer,
    useCallback
} from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

function historyReducer(state, action) {
    const { past, present, future } = state;
    const { type, newPresent } = action;
  
    switch (action.type) {
      case UNDO: {
        if (past.length === 0) return state;
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }
  
      case REDO: {
        if (future.length === 0) return state;
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }
  
      case SET: {
        if (newPresent === present) return state;
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        };
      }
  
      case RESET: {
        return {
          past: [],
          present: newPresent,
          future: [],
        };
      }
    }
  }

export default function useHistory(initialPresent) {
    const [state, dispatch] = useReducer(historyReducer, {
      past: [],
      present: initialPresent,
      future: [],
    });
  
    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;
    const undo = useCallback(() => dispatch({ type: UNDO }), []);
    const redo = useCallback(() => dispatch({ type: REDO }), []);
    const set = useCallback(
      (newPresent) => dispatch({ type: SET, newPresent }),
      []
    );
    const reset = useCallback(
      (newPresent) => dispatch({ type: RESET, newPresent }),
      []
    );
    return [state, { set, reset, undo, redo, canUndo, canRedo }];
}
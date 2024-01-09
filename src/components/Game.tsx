import {
  FunctionComponent,
  Reducer,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { Board } from "@/components/Board";
import { BEGINNER_STATE } from "@/constants";
import { reducer } from "@/state";
import { Action, State } from "@/types";

import styles from "@/styles/Game.module.css";

// @todo allow game configuration change
export const Game: FunctionComponent = () => {
  const intervalRef = useRef<number>(0);
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    BEGINNER_STATE
  );

  useEffect(() => {
    if (state.elapsedTime === 1) {
      intervalRef.current = window.setInterval(() => {
        dispatch({
          type: "tick",
        });
      }, 1000);
    }

    if (state.elapsedTime === 0 || state.elapsedTime === 999) {
      window.clearInterval(intervalRef.current);
    }
  }, [state.elapsedTime]);

  useEffect(() => {
    if (state.isLost || state.isWon) {
      window.clearInterval(intervalRef.current);
    }
  }, [state]);

  useEffect(
    () => () => {
      clearInterval(intervalRef.current);
    },
    []
  );

  return (
    <main className={styles.root}>
      <Board dispatch={dispatch} state={state} />
    </main>
  );
};

import { Dispatch, FunctionComponent } from "react";
import clsx from "clsx";

import localFont from "next/font/local";

import { Square } from "@/components/Square";
import { Action, State } from "@/types";

import styles from "@/styles/Board.module.css";

const NumberFont = localFont({
  src: "../fonts/DigitalDismay.otf",
});

export const Board: FunctionComponent<{
  dispatch: Dispatch<Action>;
  state: State;
}> = ({ dispatch, state }) => (
  <div
    className={styles.root}
    onContextMenu={(e) => {
      e.preventDefault();
    }}>
    <header className={styles.header}>
      <data
        className={clsx(NumberFont.className, styles.number)}
        value={state.flagsRemaining}>
        {state.flagsRemaining.toString().padStart(3, "0")}
      </data>
      <button
        aria-label="Reset"
        className={clsx(styles.reset, {
          [styles.lost]: state.isLost,
          [styles.won]: state.isWon,
        })}
        onClick={() => {
          dispatch({
            type: "reset",
          });
        }}
        type="reset"
      />
      <time
        className={clsx(NumberFont.className, styles.number)}
        dateTime={`PT${state.elapsedTime}S`}>
        {state.elapsedTime.toString().padStart(3, "0")}
      </time>
    </header>
    <div className={styles.grid}>
      {state.squares.map((row, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {row.map((_, columnIndex) => (
            <Square
              columnIndex={columnIndex}
              dispatch={dispatch}
              key={columnIndex}
              rowIndex={rowIndex}
              state={state}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

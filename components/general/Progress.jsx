"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const Progress = () => {
  return (
    <ProgressBar
      height="7px"
      color="#bfb203"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default Progress;

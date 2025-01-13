import React from "react";

function SubmitButton({ name }) {
  return (
    <button className="bg-primary text-secondary font-semibold rounded-3xl px-4 py-2  text-sm w-full hover:opacity-90">
      {name}
    </button>
  );
}

export default SubmitButton;

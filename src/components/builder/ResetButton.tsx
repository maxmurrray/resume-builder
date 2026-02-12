"use client";

import { useState } from "react";

interface Props {
  onReset: () => void;
}

export default function ResetButton({ onReset }: Props) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-secondary">Reset all data?</span>
        <button
          onClick={() => {
            onReset();
            setConfirming(false);
          }}
          className="text-xs font-medium text-danger hover:text-danger-hover transition-colors duration-200"
        >
          Yes
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs font-medium text-secondary hover:text-primary transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs font-medium text-secondary hover:text-primary transition-colors duration-200"
    >
      Reset
    </button>
  );
}

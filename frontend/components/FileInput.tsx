import React from "react";

export default function FileInput() {
  return (
    <div>
      <label className="block">
        <input
          type="file"
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-theme-50 file:text-theme-500
            hover:file:bg-blue-100
            "
        />
      </label>
    </div>
  );
}

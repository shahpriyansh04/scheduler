"use client";
import React from "react";

export default function FetchButton() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/cron").then((response) => {
          console.log(response);
        });
      }}
    >
      CLick
    </button>
  );
}

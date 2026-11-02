"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { cities, districts, type City } from "@/data/cities";

const selectClass =
  "w-full min-w-0 cursor-pointer bg-transparent text-base text-ink outline-none disabled:cursor-not-allowed disabled:text-muted/70";

export function HeroLocationFields() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const options = city ? districts[city as City] : [];

  return (
    <>
      <label className="flex items-center gap-3 flex-1 px-4 py-2">
        <MapPin className="size-5 shrink-0 text-brand-500" aria-hidden />
        <span className="sr-only">Shahar</span>
        <select
          name="shahar"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
            setDistrict("");
          }}
          className={selectClass}
        >
          <option value="">Barcha shahar</option>
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <span className="hidden h-8 w-px shrink-0 bg-line sm:block" aria-hidden />
      <label className="flex items-center gap-3 flex-1 px-4 py-2">
        <span className="sr-only">Tuman</span>
        <select
          name="tuman"
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
          disabled={!city}
          className={selectClass}
        >
          <option value="">Barcha tuman</option>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

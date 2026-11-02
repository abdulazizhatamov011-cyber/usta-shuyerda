"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { cities, districts, type City } from "@/data/cities";

export function HeroLocationFields() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const options = city ? districts[city as City] : [];

  return (
    <>
      <Dropdown
        name="shahar"
        label="Shahar"
        placeholder="Barcha shahar"
        value={city}
        onChange={(next) => {
          setCity(next);
          setDistrict("");
        }}
        options={cities}
        icon={<MapPin className="size-5 shrink-0 text-brand-500" aria-hidden />}
        className="flex-1"
      />
      <span className="hidden h-8 w-px shrink-0 bg-line sm:block" aria-hidden />
      <Dropdown
        name="tuman"
        label="Tuman"
        placeholder="Barcha tuman"
        value={district}
        onChange={setDistrict}
        options={options}
        disabled={!city}
        className="flex-1"
      />
    </>
  );
}

"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type DropdownProps = {
  /** Formada yuboriladigan nom (yashirin input orqali). */
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  /** Hech narsa tanlanmagandagi yozuv, masalan “Barcha shahar”. */
  placeholder: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function Dropdown({
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  icon,
  disabled,
  className,
}: DropdownProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [expanded, setOpen] = useState(false);
  // Tashqaridan o‘chirib qo‘yilsa (masalan shahar o‘zgarsa) ochiq qolmasin.
  const open = expanded && !disabled;
  const [active, setActive] = useState(0);

  // Birinchi element — “hammasi” (bo‘sh qiymat).
  const items = ["", ...options];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function openList() {
    if (disabled) return;
    setActive(Math.max(0, items.indexOf(value)));
    setOpen(true);
  }

  function choose(next: string) {
    onChange(next);
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        if (!open) return openList();
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActive((index) => (index + step + items.length) % items.length);
        break;
      }
      case "Home":
      case "End":
        if (!open) return;
        event.preventDefault();
        setActive(event.key === "Home" ? 0 : items.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) choose(items[active]);
        else openList();
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-2 text-left text-base transition hover:bg-brand-50/70 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600 sm:rounded-full",
          open && "bg-brand-50",
          disabled && "cursor-not-allowed hover:bg-transparent",
        )}
      >
        {icon}
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            value ? "font-semibold text-ink" : disabled ? "text-muted/60" : "text-ink",
          )}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180 text-brand-600",
          )}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-[calc(100%+0.5rem)] z-30 max-h-80 w-full min-w-56 animate-pop overflow-y-auto overscroll-contain [scrollbar-color:var(--color-brand-200)_transparent] [scrollbar-width:thin] rounded-2xl border border-line bg-white p-1.5 shadow-2xl shadow-brand-900/15"
        >
          {items.map((item, index) => {
            const selected = item === value;
            return (
              <li
                key={item || "__all"}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(index)}
                onClick={() => choose(item)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-colors",
                  index === active && "bg-brand-50",
                  selected ? "font-bold text-brand-800" : "text-ink",
                  !item && !selected && "text-muted",
                )}
              >
                <span className="truncate">{item || placeholder}</span>
                {selected && <Check className="size-4 shrink-0 text-brand-600" aria-hidden />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

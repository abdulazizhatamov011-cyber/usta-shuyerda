"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions";
import { Field, inputClass } from "@/components/forms/Field";
import { SubmitButton } from "./SubmitButton";

export function LoginForm() {
  const [state, action] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={action} className="space-y-5">
      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue={state.email}
          required
          className={inputClass}
        />
      </Field>
      <Field label="Parol" htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </Field>

      {state.error && (
        <p role="alert" className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {state.error}
        </p>
      )}

      <SubmitButton pendingText="Tekshirilmoqda..." className="w-full">
        Kirish
      </SubmitButton>
    </form>
  );
}

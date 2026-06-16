import { useSyncExternalStore } from "react";

// Subscrição vazia: o valor de "hidratado" nunca muda depois de montar.
const noopSubscribe = () => () => {};

/**
 * Retorna `false` no servidor e no primeiro render do cliente, e `true`
 * após a hidratação. É a forma idiomática (React 19) de adiar conteúdo
 * client-only sem disparar `setState` dentro de `useEffect` — evita
 * tanto o mismatch de hidratação quanto cascading renders.
 */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true, // cliente, já hidratado
    () => false, // servidor / build estático
  );
}

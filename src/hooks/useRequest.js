import { useEffect, useState } from 'react';

// Reutiliza o ciclo da consulta; cada chamada do hook mantém seu próprio estado.
export function useRequest(key, load, enabled = true) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  const requestKey = JSON.stringify([key, attempt]);
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let active = true;
    async function run() {
      try {
        const data = await load(controller.signal);
        if (active) setResult({ key: requestKey, status: 'success', data, error: '' });
      } catch (error) {
        if (active) setResult({ key: requestKey, status: 'error', data: null, error: error.message });
      }
    }
    run();
    return () => { active = false; controller.abort(); };
  }, [requestKey, load, enabled]);

  // Esconde a resposta antiga já na renderização que mudou a seleção.
  const current = !enabled ? { status: 'idle', data: null, error: '' }
    : result?.key === requestKey ? result : { status: 'loading', data: null, error: '' };
  return { ...current, retry: () => setAttempt((previous) => previous + 1) };
}

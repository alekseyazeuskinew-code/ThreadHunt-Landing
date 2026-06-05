'use client';

import { useEffect } from 'react';

// Запрет копирования контента сайта: контекстное меню, copy/cut/drag,
// горячие клавиши (Ctrl/Cmd+C/X/S/U/P/A, F12). Поля ввода не блокируются.
export function CopyGuard() {
  useEffect(() => {
    const isField = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
    };
    const block = (e: Event) => {
      if (isField(e.target)) return;
      e.preventDefault();
    };
    const keyBlock = (e: KeyboardEvent) => {
      if (isField(e.target)) return;
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 's', 'u', 'p', 'a'].includes(k)) e.preventDefault();
      if (k === 'f12') e.preventDefault();
    };
    document.addEventListener('contextmenu', block);
    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    document.addEventListener('dragstart', block);
    document.addEventListener('keydown', keyBlock);
    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.removeEventListener('dragstart', block);
      document.removeEventListener('keydown', keyBlock);
    };
  }, []);

  return null;
}

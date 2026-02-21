import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.3";

export const SUPABASE_URL = "https://kzbffhhcejczghhrhbzy.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6YmZmaGhjZWpjemdoaHJoYnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NzM0MjgsImV4cCI6MjA4NzI0OTQyOH0.8Yfqz6v0DVOhZMrz13xTF96486sas4uWK7F0XvpKL1E";
export const VAPID_PUBLIC_KEY = "PEGA_AQUI_TU_VAPID_KEY"; // si usas push

// Storage seguro iOS/PWA (igual al que ya tienes)
const safeStorage = {
  getItem: (key) => { try { return window.localStorage.getItem(key); } catch { return null; } },
  setItem: (key, value) => { try { window.localStorage.setItem(key, value); } catch {} },
  removeItem: (key) => { try { window.localStorage.removeItem(key); } catch {} },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storage: safeStorage,
  },
});

// (Opcional) si en tu index usas safeStorage directamente, lo exportamos también
export { safeStorage };
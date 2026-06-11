import { useState } from 'react'

const ADMIN_SESSION_KEY = 'wedding-admin-session'
const TEMP_ADMIN_USER = 'admin'
const TEMP_ADMIN_PASSWORD = 'boda2026'

function readSession() {
  return typeof window !== 'undefined' && window.localStorage.getItem(ADMIN_SESSION_KEY) === 'active'
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => readSession())

  const login = (user: string, password: string) => {
    // Seguridad temporal: estas credenciales solo sirven para desarrollo local.
    // Antes de producción se debe reemplazar por Supabase, Firebase, Netlify Identity
    // o una autenticación real del backend.
    const isValid = user === TEMP_ADMIN_USER && password === TEMP_ADMIN_PASSWORD

    if (isValid) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, 'active')
      setIsAuthenticated(true)
    }

    return isValid
  }

  const logout = () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY)
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}

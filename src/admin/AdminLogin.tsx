import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { useAdminAuth } from './hooks/useAdminAuth'

export function AdminLogin() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAdminAuth()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (login(user, password)) {
      navigate('/admin')
      return
    }

    setError('Usuario o contraseña incorrectos.')
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#fbf6ec] px-5">
      <form
        className="w-full max-w-md rounded-[8px] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(33,27,23,0.1)]"
        onSubmit={submitLogin}
      >
        <div className="mb-6 text-center">
          <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#fbf6ec] text-[#b88a43]">
            <LockKeyhole className="h-6 w-6" />
          </span>
          <h1 className="font-sans text-2xl font-bold text-stone-950">Entrar al administrador</h1>
          <p className="mt-2 text-sm leading-6 text-stone-500">
            Acceso temporal para editar la invitación.
          </p>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-semibold text-stone-800">Usuario</span>
          <input
            value={user}
            onChange={(event) => setUser(event.target.value)}
            className="w-full rounded-[8px] border border-stone-200 px-4 py-3 outline-none focus:border-[#b88a43] focus:ring-4 focus:ring-[#b88a43]/10"
            autoComplete="username"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-stone-800">Contraseña</span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-[8px] border border-stone-200 px-4 py-3 outline-none focus:border-[#b88a43] focus:ring-4 focus:ring-[#b88a43]/10"
            autoComplete="current-password"
            type="password"
          />
        </label>

        {error ? <p className="mt-4 rounded-[8px] bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p> : null}

        <button
          type="submit"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#211b17] px-5 text-sm font-bold text-white"
        >
          Entrar
        </button>

        <p className="mt-4 text-xs leading-5 text-stone-500">
          Seguridad temporal: reemplazar por autenticación real antes de producción.
        </p>
      </form>
    </main>
  )
}

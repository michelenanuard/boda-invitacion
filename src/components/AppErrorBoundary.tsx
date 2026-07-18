import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[App] Error de renderizado', error, info)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <main className="grid min-h-screen place-content-center bg-[#fbf6ec] px-6 text-center text-[#211b17]">
        <div className="mx-auto max-w-md rounded-2xl border border-[#d8b77c]/50 bg-white/70 p-8 shadow-lg">
          <p className="font-serif text-3xl">No pudimos mostrar esta sección</p>
          <p className="mt-3 text-[#6f655d]">Recarga la página para intentarlo nuevamente.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-[#211b17] px-5 py-3 text-sm font-semibold text-white"
            >
              Recargar
            </button>
            <a href="/" className="rounded-full border border-[#b88a43] px-5 py-3 text-sm font-semibold">
              Ir al inicio
            </a>
          </div>
        </div>
      </main>
    )
  }
}

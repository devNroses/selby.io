import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Rendered in place of children once an error is caught. Defaults to
   * null so the boundary just quietly gives up rather than crashing
   * whatever it's embedded in. */
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Minimal catch-all for render-time errors in a subtree — React only
 * has a class-component API for this, no hook equivalent exists.
 *
 * First use case: WordmarkScene's Suspense-integrated asset loaders
 * (useGLTF/useEnvironment) throw if a fetch genuinely fails (bad
 * network, 404, decode error) rather than just being slow — Suspense
 * alone only covers the "still loading" case. Without a boundary
 * somewhere above it, that throw has nothing to catch it and can take
 * out more of the tree than just the 3D panel that failed.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Swallow it past this point, but don't swallow it silently —
    // still worth seeing in the console if it happens.
    console.error('ErrorBoundary caught:', error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

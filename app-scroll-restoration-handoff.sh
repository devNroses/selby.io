#!/bin/bash
# Fix the react-hooks/immutability lint error in App.tsx (the one that's
# shown up as the sole pre-existing error in every build/lint check this
# session).
#
# Run from your selby.io repo root, any branch -- this file isn't Vomero-
# specific, it's the top-level App component.
#
# What it was: window.history.scrollRestoration = 'manual' was being set
# directly in App's render body. That mutates external browser state
# during render, which breaks the 'render must be pure' assumption that
# rule (and the React Compiler it backs) enforces -- hence 'this value
# cannot be modified... consider using an effect.'
#
# Fix: moved it into useEffect(() => {...}, []) so it runs once, after
# mount, client-side only, instead of on every render.
#
# Verified: tsc -b, vite build, eslint -- zero errors now.
set -e

if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "ERROR: no package.json/src/ here ($(pwd))." >&2
  echo "cd into your selby.io repo root, then re-run." >&2
  exit 1
fi

echo "Writing src/App.tsx..."
cat > src/App.tsx <<'FILEEOF'
// // import { useMainStore } from './store/mainStore'
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatedRoutes } from './components/AnimatedRoutes';
// import { Hero } from './components/Hero'
import './index.css';

function App() {
  // Moved out of the render body and into an effect -- mutating
  // window.history directly during render broke the "render must be
  // pure" assumption the react-hooks/immutability rule enforces (it's
  // the rule the React Compiler relies on). An effect is the correct
  // place for a one-time side effect like this: it runs after mount,
  // client-side only, and doesn't run again on re-renders.
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
  )
}

export default App
FILEEOF

echo ""
echo "Done. Next steps:"
echo "1. npx tsc -b && npx vite build && npx eslint src   (sanity check -- eslint should now be clean)"
echo "2. git add -A && git commit -m fix-app-scroll-restoration-effect"

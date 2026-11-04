import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
const mock = vi.hoisted(() => {
  const listeners = new Set();
  const state = { user: null };
  const emit = user => { state.user = user; for (const listener of listeners) listener(user); };
  const auth = {
    onAuthStateChanged: vi.fn(listener => { listeners.add(listener); listener(state.user); return () => listeners.delete(listener); }),
    createUserWithEmailAndPassword: vi.fn(async () => { emit({ uid: 'test-user' }); }),
    signInWithEmailAndPassword: vi.fn(async () => { emit({ uid: 'test-user' }); }),
    signOut: vi.fn(async () => { emit(null); })
  };
  const app = { apps: [], initializeApp: vi.fn(() => app.apps.push({})), auth: () => auth };
  return { app, auth, state, listeners, emit };
});
vi.mock('firebase/compat/app', () => ({ default: mock.app }));
vi.mock('firebase/compat/auth', () => ({}));
import App from './App';
import { FirebaseProvider } from './contexts/Firebase';

beforeEach(() => {
  history.replaceState(null, '', '/');
  localStorage.clear();
  mock.state.user = null;
  vi.clearAllMocks();
});
afterEach(() => { cleanup(); expect(mock.listeners.size).toBe(0); });
const showApp = () => render(<FirebaseProvider><App /></FirebaseProvider>);
function fill(form, name, value) {
  fireEvent.change(form.querySelector(`[name="${name}"]`), { target: { value } });
}
it('preserves sign-up, authenticated navigation, theme persistence and sign-out', async () => {
  showApp();
  const form = screen.getByRole('button', { name: 'Sign up' }).closest('form');
  fill(form, 'email', 'test@example.com');fill(form, 'password', 'test-password');fill(form, 'repeatPassword', 'test-password');
  fireEvent.submit(form);
  expect(await screen.findByRole('button', { name: 'Sign out' })).toBeInTheDocument();
  expect(mock.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'test-password');
  expect(location.pathname).toBe('/dashboard');
  fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(JSON.parse(localStorage.getItem('theme')).className).toBe('dark');
  fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
  expect(await screen.findByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  expect(mock.auth.signOut).toHaveBeenCalledOnce();
});
it('signs in through the new SDK and reports rejected credentials', async () => {
  mock.auth.signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid credentials'));
  showApp();
  let form = screen.getByRole('button', { name: 'Sign in' }).closest('form');
  fill(form, 'email', 'test@example.com');fill(form, 'password', 'test-password');
  fireEvent.submit(form);
  expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials');
  expect(location.pathname).toBe('/');
  fireEvent.submit(form);
  expect(await screen.findByRole('button', { name: 'Sign out' })).toBeInTheDocument();
  expect(mock.auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'test-password');
});
it('redirects a signed-out visitor away from protected routes', async () => {
  history.replaceState(null, '', '/dashboard');
  showApp();
  await waitFor(() => expect(location.pathname).toBe('/'));
  expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
});

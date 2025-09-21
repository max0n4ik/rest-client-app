vi.mock('@/components/Footer/Footer', () => ({ default: () => <div data-testid="footer" /> }));
vi.mock('@/components/Header/Header', () => ({ default: () => <div data-testid="header" /> }));

import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
function renderWithRouter(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route index element={<div data-testid="outlet-content">Home</div>} />
          <Route path="login" element={<div data-testid="outlet-content">Login</div>} />
          <Route path="registration" element={<div data-testid="outlet-content">Registration</div>} />
          <Route path="rest-client" element={<div data-testid="outlet-content">REST Client</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
describe('Layout', () => {
  let originalTitle: string;
  let originalQuerySelector: typeof document.querySelector;
  let originalCreateElement: typeof document.createElement;
  let faviconLink: HTMLLinkElement;
  beforeEach(() => {
    originalTitle = document.title;
    faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.href = '/favicon.ico';
    document.head.appendChild(faviconLink);
    originalQuerySelector = document.querySelector;
    originalCreateElement = document.createElement;
  });
  afterEach(() => {
    document.title = originalTitle;
    faviconLink.remove();
    document.querySelector = originalQuerySelector;
    document.createElement = originalCreateElement;
  });
  it('renders Header, Footer, and Outlet', () => {
    const { getByTestId } = renderWithRouter('/');
    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('outlet-content')).toHaveTextContent('Home');
  });
  it('sets document title for known routes', () => {
    renderWithRouter('/login');
    expect(document.title).toBe('Login - RESTify');
  });
  it('sets document title for unknown routes', () => {
    renderWithRouter('/unknown');
    expect(document.title).toBe('RESTify');
  });
  it('sets favicon if not present', () => {
    faviconLink.remove();
    let createdLink: HTMLLinkElement | null = null;
    document.querySelector = vi.fn(() => null);
    document.createElement = vi.fn((tag: string): HTMLElement => {
      if (tag === 'link') {
        createdLink = originalCreateElement.call(document, tag) as HTMLLinkElement;
        return createdLink;
      }
      return originalCreateElement.call(document, tag);
    }) as typeof document.createElement;
    renderWithRouter('/');
    expect(createdLink).not.toBeNull();
    expect((createdLink as HTMLLinkElement | null)?.rel).toBe('icon');
    expect((createdLink as HTMLLinkElement | null)?.href).toContain('/favicon.ico');
  });
  it('does not update favicon if already set to correct url', () => {
    const setHrefSpy = vi.spyOn(faviconLink, 'href', 'set');
    renderWithRouter('/');
    expect(setHrefSpy).not.toHaveBeenCalled();
  });
});

import { StrictMode } from "react";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "@/App";

// Animation timing/layout is checked in a real browser; these tests exercise content and navigation.
vi.mock("@/components/SmoothScroll", () => ({ default: () => null }));

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/");
  vi.restoreAllMocks();
  // jsdom has no scrollIntoView; tests that need it define a mock.
  Reflect.deleteProperty(Element.prototype, "scrollIntoView");
});

const toTop = { top: 0, left: 0, behavior: "instant" };

describe("2027 edition (root)", () => {
  it("renders the 2027 front door and links to the 2026 archive", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(/全球健康創新黑客松/);
    expect(screen.getAllByText(/2027/).length).toBeGreaterThan(0);

    // A prominent path into the archive exists.
    const toArchive = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href") === "/2026");
    expect(toArchive.length).toBeGreaterThan(0);

    // The front door carries no in-page section anchors (those live on /2026).
    const navLinks = within(screen.getByRole("navigation")).getAllByRole("link");
    for (const link of navLinks) {
      const href = link.getAttribute("href") ?? "";
      expect(/^#.+/.test(href)).toBe(false);
    }
  });

  it("offers a skip link to the main content before anything else focusable", () => {
    render(<App />);
    const skip = screen.getByRole("link", { name: /Skip to content/ });
    expect(skip).toHaveAttribute("href", "#main-content");
    expect(document.querySelector("a[href], button, input, [tabindex]:not([tabindex='-1'])")).toBe(skip);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });
});

describe("2026 archive (/2026)", () => {
  it("renders the event and gives every section link a unique destination", async () => {
    window.history.replaceState({}, "", "/2026");
    const { container } = render(<App />);
    expect(await screen.findByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(/全球健康創新黑客松/);

    const links = within(screen.getByRole("navigation")).getAllByRole("link");
    for (const link of links) {
      const href = link.getAttribute("href");
      if (href?.startsWith("#") && href.length > 1) {
        expect(container.querySelectorAll(href), href).toHaveLength(1);
      }
    }
    expect(screen.getByRole("link", { name: /View the Winners/i })).toHaveAttribute("href", "#winners");
    expect(screen.getByRole("link", { name: /Visit HSIL/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/^https:\/\/hsph\.harvard\.edu\//)
    );
    expect(container.textContent).not.toMatch(/Quote placeholder|Bio placeholder|bigger, broader|June 19|now join/);
    expect(screen.getAllByText(/June 16, 2026/).length).toBeGreaterThan(0);
  });

  it("links back to the current edition", async () => {
    window.history.replaceState({}, "", "/2026");
    render(<App />);
    await screen.findByRole("main");
    const backLinks = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href") === "/");
    expect(backLinks.length).toBeGreaterThan(0);
  });

  it("opens the mobile menu and closes it after a section is chosen", async () => {
    window.history.replaceState({}, "", "/2026");
    render(<App />);
    await screen.findByRole("navigation");
    const nav = within(screen.getByRole("navigation"));
    const toggle = nav.getByRole("button", { name: "Toggle menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(nav.getAllByRole("link", { name: "About" })).toHaveLength(1);
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const aboutLinks = nav.getAllByRole("link", { name: "About" });
    expect(aboutLinks).toHaveLength(2);
    // jsdom can't navigate; block the default so the test asserts menu state without stderr noise
    aboutLinks[1].addEventListener("click", (e) => e.preventDefault());
    fireEvent.click(aboutLinks[1]);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(nav.getAllByRole("link", { name: "About" })).toHaveLength(1);
  });

  it("moves focus into the opened mobile menu, and Escape closes it back to the toggle", async () => {
    window.history.replaceState({}, "", "/2026");
    render(<App />);
    const nav = within(await screen.findByRole("navigation"));
    const toggle = nav.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(toggle);
    const menu = document.getElementById("mobile-navigation");
    expect(menu).not.toBeNull();
    expect(within(menu!).getAllByRole("link")[0]).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-navigation")).toBeNull();
    expect(toggle).toHaveFocus();
  });
});

describe("scroll position", () => {
  it("starts each page at the top when navigating between editions", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<App />);
    // First load: the browser owns the initial position.
    expect(scrollTo).not.toHaveBeenCalledWith(toTop);

    fireEvent.click(within(screen.getByRole("navigation")).getByRole("link", { name: "2026 Archive" }));
    const current = await screen.findByRole("link", { name: "Current edition" });
    expect(window.location.pathname).toBe("/2026");
    expect(scrollTo).toHaveBeenCalledWith(toTop);

    scrollTo.mockClear();
    fireEvent.click(current);
    await waitFor(() => expect(window.location.pathname).toBe("/"));
    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith(toTop));
  });

  it("brings a #section deep link into view once the lazy archive has rendered it", async () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, "scrollIntoView", { value: scrollIntoView, configurable: true, writable: true });
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.history.replaceState({}, "", "/2026#winners");
    // StrictMode re-runs effects; the second run must not cancel the pending seek.
    render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
    expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById("winners"));
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "instant" });
    expect(scrollTo).not.toHaveBeenCalledWith(toTop);
  });

  it("holds a deep link opened in a background tab until the tab is shown", async () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, "scrollIntoView", { value: scrollIntoView, configurable: true, writable: true });
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    let visibility: DocumentVisibilityState = "hidden";
    Object.defineProperty(document, "visibilityState", { configurable: true, get: () => visibility });
    try {
      window.history.replaceState({}, "", "/2026#winners");
      render(<App />);
      await screen.findByRole("main");
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(scrollIntoView).not.toHaveBeenCalled();

      visibility = "visible";
      document.dispatchEvent(new Event("visibilitychange"));
      await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
      expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById("winners"));
    } finally {
      Reflect.deleteProperty(document, "visibilityState");
    }
  });
});

describe("fallback", () => {
  it("offers a route back home for an unknown page without logging an error", () => {
    window.history.replaceState({}, "", "/missing-page");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<App />);
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Return to Home/ })).toHaveAttribute("href", "/");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(consoleError).not.toHaveBeenCalled();
  });
});

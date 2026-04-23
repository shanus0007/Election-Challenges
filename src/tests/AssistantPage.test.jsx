import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ── We import AssistantPage lazily to avoid triggering the Gemini SDK ──
// Mocking external deps
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: {
      generateContent: vi.fn().mockResolvedValue({ text: '**Test** AI response.' }),
    },
  })),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useLocation: () => ({ state: null }) };
});

import AssistantPage from '../pages/AssistantPage';

const renderPage = (initialQuery = null) =>
  render(
    <MemoryRouter initialEntries={[{ pathname: '/assistant', state: { initialQuery } }]}>
      <AssistantPage />
    </MemoryRouter>
  );

describe('AssistantPage', () => {
  it('renders the heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /ElectWise Assistant/i })).toBeDefined();
  });

  it('renders the initial AI greeting', () => {
    renderPage();
    expect(screen.getByText(/your personal election assistant/i)).toBeDefined();
  });

  it('renders suggestion chips', () => {
    renderPage();
    expect(screen.getByLabelText(/Ask: How do I register to vote/i)).toBeDefined();
  });

  it('input is accessible with aria-label', () => {
    renderPage();
    const input = screen.getByRole('textbox', { name: /your question/i });
    expect(input).toBeDefined();
  });

  it('send button is disabled when input is empty', () => {
    renderPage();
    const btn = screen.getByRole('button', { name: /send message/i });
    expect(btn.disabled).toBe(true);
  });

  it('send button enables when user types', () => {
    renderPage();
    const input = screen.getByRole('textbox', { name: /your question/i });
    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    const btn = screen.getByRole('button', { name: /send message/i });
    expect(btn.disabled).toBe(false);
  });

  it('clicking a suggestion fills the input', () => {
    renderPage();
    const chip = screen.getByLabelText(/Ask: Mail-in voting rules/i);
    fireEvent.click(chip);
    const input = screen.getByRole('textbox', { name: /your question/i });
    expect(input.value).toBe('Mail-in voting rules');
  });

  it('input enforces max length of 500', () => {
    renderPage();
    const input = screen.getByRole('textbox', { name: /your question/i });
    expect(input.maxLength).toBe(500);
  });

  it('has accessible main landmark', () => {
    renderPage();
    expect(screen.getByRole('main', { name: /ElectWise AI Assistant/i })).toBeDefined();
  });
});

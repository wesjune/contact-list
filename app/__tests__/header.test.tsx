import { render, screen } from '@testing-library/react';
import Header from '@/app/ui/header';

describe('Header component', () => {
  it(`should show "Contact List"`, () => {
    render(<Header />);

    expect(screen.queryByText(/Contact List/i)).toBeInTheDocument();
  });

  it(`should show "Add Contact"`, () => {
    render(<Header />);

    const addContactButton = screen.queryByText(/Add Contact/i);

    expect(addContactButton).toBeInTheDocument();
  });
});

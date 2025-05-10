import { render, screen } from '@testing-library/react';

import { Loading } from './Loading';

describe('Loading', () => {
  it('renders msg correctly', () => {
    render(<Loading msg="loading..." />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });
});

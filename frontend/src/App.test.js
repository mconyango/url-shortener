import {render, screen} from '@testing-library/react';
import Form from "./Form";

test('Form is loading', () => {
    render(<Form/>);
    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
});
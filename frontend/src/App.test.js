import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from "./Form";
import Table from "./Table";

test('Form is loading', () => {
    render(<Form/>);
    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
})

test('Form snapshot', () => {
    const {asFragment} = render(<Form/>)

    expect(asFragment(<Form/>)).toMatchSnapshot()
})
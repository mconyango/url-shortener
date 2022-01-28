import React from 'react';

import Enzyme, {shallow, render, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from "./App";
import Form from "./Form";
import Table from "./Table";


Enzyme.configure({adapter: new Adapter()})

describe('Testing components rendering', () => {
    it('App component renders correctly', () => {
        const wrapper = shallow(<App/>)

        expect(toJson(wrapper)).toMatchSnapshot();
    })
    it('Form component renders correctly', () => {
        const wrapper = shallow(<Form/>)

        expect(toJson(wrapper)).toMatchSnapshot();
    })
    it('Table component renders correctly', () => {
        const wrapper = shallow(<Table/>)

        expect(toJson(wrapper)).toMatchSnapshot();
    })
})
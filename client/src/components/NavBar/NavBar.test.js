/** @jest-environment jsdom */
import {screen} from '@testing-library/react';
import { NavBar } from '.';

describe('Jumbotron', () => {
    beforeEach(()=>{
        render(<NavBar/>)
    })

    test('renders navbar with multiple links',  () => {
        const linkHomeElement = screen.getByText(/Home/i);
        expect(linkHomeElement).toBeInTheDocument();
    })

})

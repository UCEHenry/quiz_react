/** @jest-environment jsdom */
import {screen} from '@testing-library/react';
import { Jumbotron } from '.';

describe('Jumbotron', () => {
    beforeEach(()=>{
        render(<Jumbotron/>)
    })

    test('renders hero image with two buttons',  () => {
        const btns = screen.queryAllByRole('button')
        const btn1 = btns[0]
        const btn2 = btns[1]
        expect(btn1.textContent).toContain('Host')
        expect(btn2.textContent).toContain('Join')
    })

    test('renders App Title', () => {
        const titleElement = screen.getByText(/Quiz Wars/i);
        expect(titleElement).toBeInTheDocument();
      });

})

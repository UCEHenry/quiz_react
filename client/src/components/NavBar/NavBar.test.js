/** @jest-environment jsdom */
import {screen} from '@testing-library/react';
import { NavBar } from '.';

describe('Jumbotron', () => {
    beforeEach(()=>{
        render(<NavBar/>)
    })

    test('renders navbar with multiple links',  () => {
        const links = screen.queryAllByRole('a')
        const HomeLink = links[0]
        expect(HomeLink.textContent).toContain('Home')
    })

})

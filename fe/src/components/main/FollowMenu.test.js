import { render, screen } from '@testing-library/react';
import FolloweMenu from './FolloweMenu';
import userEvent from "@testing-library/user-event";
import {MAIN_MENU, MAIN_MENU_PAGE} from "../../modules/processes";

test('Should show "View All Processes" and Back buttons', () => {
    render(<FolloweMenu _useDispatch={() => {}}/>);
    expect(screen.getByText(/View All Processes/)).toBeInTheDocument();
    expect(screen.getByText(/Back/)).toBeInTheDocument();
});

it('should dispatch viewFollowerProcesses when "View All Processes" button clicked', () => {
    const dispatch = jest.fn()
    render(<FolloweMenu _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('View All Processes'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})

test('Should dispatch MAIN_MENU when Back button clicked', () => {
    const mock = jest.fn()
    render(<FolloweMenu _useDispatch={() => mock}/>)

    userEvent.click(screen.getByText('Back'))
    expect(mock).toHaveBeenCalledWith({type: MAIN_MENU_PAGE})
})
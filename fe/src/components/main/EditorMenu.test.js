import { render, screen } from '@testing-library/react';
import EditorMenu from './EditorMenu';
import userEvent from "@testing-library/user-event";
import {MAIN_MENU, MAIN_MENU_PAGE} from "../../modules/processes";

test('Should show "View All Processes", "View All Finished", and Back buttons', () => {
    render(<EditorMenu _useDispatch={() => {}}/>);
    expect(screen.getByText(/View All Processes/)).toBeInTheDocument();
    expect(screen.getByText(/View All Finished/)).toBeInTheDocument();
    expect(screen.getByText(/Back/)).toBeInTheDocument();
});

it('should dispatch viewAllProcesses when "View All Processes" button clicked', () => {
    const dispatch = jest.fn()
    render(<EditorMenu _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('View All Processes'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})

it('should dispatch viewAllFinished when "View All Finished" button clicked', () => {
    const dispatch = jest.fn()
    render(<EditorMenu _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('View All Finished'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})

test('Should dispatch MAIN_MENU when Back button clicked', () => {
    const mock = jest.fn()
    render(<EditorMenu _useDispatch={() => mock}/>)

    userEvent.click(screen.getByText('Back'))
    expect(mock).toHaveBeenCalledWith({type: MAIN_MENU_PAGE})
})
import { render, screen } from '@testing-library/react';
import MainMenu from './MainMenu';
import userEvent from "@testing-library/user-event";
import {EDITOR_MENU_PAGE, FOLLOWER_MENU_PAGE} from "../../modules/processes";

test('Should show Editor and Follower buttons', () => {
    render(<MainMenu _useDispatch={() => {}}/>);
    expect(screen.getByText(/Editor/)).toBeInTheDocument();
    expect(screen.getByText(/Follower/)).toBeInTheDocument();
});

test('Should dispatch EDITOR_MENU_PAGE when Editor button clicked', () => {
    const mock = jest.fn()
    render(<MainMenu _useDispatch={() => mock}/>)

    userEvent.click(screen.getByText('Editor'))
    expect(mock).toHaveBeenCalledWith({type: EDITOR_MENU_PAGE})
})

test('Should dispatch FOLLOWER_MENU_PAGE when Follower button clicked', () => {
    const mock = jest.fn()
    render(<MainMenu _useDispatch={() => mock}/>)

    userEvent.click(screen.getByText('Follower'))
    expect(mock).toHaveBeenCalledWith({type: FOLLOWER_MENU_PAGE})
})

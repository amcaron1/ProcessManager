import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {VIEW_PROCESS_PAGE} from "../../modules/processes";
import Process from "./Process";

const mockProcess = {processID: 0, title: "some title"};
const index = 1

test('Should show title and Follow Process button', () => {
    render(<Process process={mockProcess} index _useDispatch={() => {}}/>);
    expect(screen.getByText(mockProcess.title)).toBeInTheDocument();
    expect(screen.getByText(/Follow Process/)).toBeInTheDocument();
});

test('Should dispatch followProcess with process and index when Follow Process button clicked', () => {
    const dispatch = jest.fn()
    render(<Process process={mockProcess} index _useDispatch={() => dispatch}/>)

    userEvent.click(screen.getByText('Follow Process'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})

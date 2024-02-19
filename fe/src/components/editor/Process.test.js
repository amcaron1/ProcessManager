import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Process from "./Process";
import {BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE, EDIT_PROCESS_PAGE} from "../../modules/processes";

const mockProcess = {processID: 0, title: 'some title', stageOrder: "1,2,3"};
const index = 0
const state = {processes: {activityTask: "viewAllProcesses"}}
function useSelector(selectorFn) {
    return selectorFn(state)}

test('Should show title and Delete & View buttons', () => {
    render(<Process process={mockProcess} index={index} _useDispatch={() => {}} _useSelector={useSelector}/>);
    expect(screen.getByText(mockProcess.title)).toBeInTheDocument();
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
    expect(screen.getByText(/View/)).toBeInTheDocument();
});

test('Should dispatch deleteProcess with processID when Delete button clicked', () => {
    const dispatch = jest.fn()
    render(<Process process={mockProcess} index={index} _useDispatch={() => dispatch} _useSelector={useSelector}/>);

    userEvent.click(screen.getByText('Delete'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})

test('Should dispatch viewOneProcess with process and index when View button clicked', () => {
    const dispatch = jest.fn()
    render(<Process process={mockProcess} index={index} _useDispatch={() => dispatch} _useSelector={useSelector}/>);

    userEvent.click(screen.getByText('View'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})

test('Should show title and Edit button', () => {
    state.processes.activityTask = "viewOneProcess"
    render(<Process process={mockProcess} index={index} _useDispatch={() => {}} _useSelector={useSelector}/>);
    expect(screen.getByText(mockProcess.title)).toBeInTheDocument();
    expect(screen.getByText(/Edit Title/)).toBeInTheDocument();
})

test('Should dispatch editTitle with index when Eidt button clicked', () => {
    state.processes.activityTask = "viewOneProcess"
    const dispatch = jest.fn()
    render(<Process process={mockProcess} index={index} _useDispatch={() => dispatch} _useSelector={useSelector}/>);

    userEvent.click(screen.getByText('Edit Title'))
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_PROCESS_PAGE,
        payload: {processToEdit: mockProcess, displayTitle: mockProcess.title}})
})

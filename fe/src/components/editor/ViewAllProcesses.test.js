import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {ADD_PROCESS_PAGE, BACK, BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE} from "../../modules/processes";
import ViewAllProcesses from "./ViewAllProcesses";

const state = {processes: {processesAry: ['process1', 'process2']}};
const mockProcess = ({process}) => <div>{process}</div>
function useSelector(selectorFn) {
    return selectorFn(state)}

test('Should show Back, & "Add Process" buttons and two processes', () => {
    render(<ViewAllProcesses ProcessC={mockProcess} _useDispatch={() => {}} _useSelector={useSelector}/>);
    expect(screen.getByText(/Back/)).toBeInTheDocument();
    expect(screen.getByText(/Add Process/)).toBeInTheDocument();
    expect(screen.getByText(state.processes.processesAry[0])).toBeInTheDocument();
    expect(screen.getByText(state.processes.processesAry[1])).toBeInTheDocument();
});

test('Should dispatch BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE when Back button clicked', () => {
    const mock = jest.fn()
    render(<ViewAllProcesses ProcessC={mockProcess} _useDispatch={() => mock} _useSelector={useSelector}/>)

    userEvent.click(screen.getByText('Back'))
    expect(mock).toHaveBeenCalledWith({type: BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE})
})


test('Should dispatch ADD_PROCESS_PAGE when "Add Process" button clicked', () => {
    const dispatch = jest.fn()
    render(<ViewAllProcesses ProcessC={mockProcess} _useDispatch={() => dispatch} _useSelector={useSelector}/>);

    userEvent.click(screen.getByText('Add Process'))
    expect(dispatch).toHaveBeenCalledWith({type: ADD_PROCESS_PAGE})
})

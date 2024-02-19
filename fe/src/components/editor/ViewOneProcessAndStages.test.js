import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {
    ADD_PROCESS_PAGE,
    BACK,
    BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE,
    BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE
} from "../../modules/processes";
import ViewAllProcesses from "./ViewAllProcesses";
import ViewOneProcessAndStages from "./ViewOneProcessAndStages";

const state = {processes: {processesAry: ['process1', 'process2'], processToViewIndex: 1,
    stagesAry: ['stage1', 'stage2']}};
const mockStage = ({stage}) => <div>{stage}</div>
const mockProcess = ({process}) => <div>{process}</div>
function useSelector(selectorFn) {
    return selectorFn(state)}

test('Should show Back button, process and two stages', () => {
    render(<ViewOneProcessAndStages StageWithButtonsC={mockStage} ProcessC={mockProcess} _useDispatch={() => {}} _useSelector={useSelector}/>);
    expect(screen.getByText(/Back/)).toBeInTheDocument();
    expect(screen.getByText("process2")).toBeInTheDocument();
    expect(screen.getByText(state.processes.stagesAry[0])).toBeInTheDocument();
    expect(screen.getByText(state.processes.stagesAry[1])).toBeInTheDocument();
});

test('Should dispatch BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE when Back button clicked', () => {
    const mock = jest.fn()
    render(<ViewOneProcessAndStages StageWithButtonsC={mockStage} ProcessC={mockProcess} _useDispatch={() => mock} _useSelector={useSelector}/>)

    userEvent.click(screen.getByText('Back'))
    expect(mock).toHaveBeenCalledWith({type: BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE})
})

// Button currently commented out.  May stay that way.
// test('Should dispatch ADD_PROCESS_PAGE when "Add Process" button clicked', () => {
//     const dispatch = jest.fn()
//     render(<ViewOneProcessAndStages StageC={mockStage} Process_EC={mockProcess} _useDispatch={() => dispatch} _useSelector={useSelector}/>);
//
//     userEvent.click(screen.getByText('Add Process'))
//     expect(dispatch).toHaveBeenCalledWith({type: ADD_PROCESS_PAGE})
// })

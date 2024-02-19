import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {BACK_OUTTA_VIEW_FOLLOWER_PROCESSES, BACK_OUTTA_VIEW_FOLLOWER_PROCESSES_PAGE} from "../../modules/responses";
import ViewFollowerProcesses from "./ViewFollowerProcesses";

const state = {responses: {processesAry: ['process1', 'process2']}};
const mockProcess = ({process}) => <div>{process}</div>
function useSelector(selectorFn) {
    return selectorFn(state)}

test('Should show Back button and two processes', () => {
    render(<ViewFollowerProcesses ProcessC={mockProcess} _useDispatch={() => {}} _useSelector={useSelector}/>);
    expect(screen.getByText(/Back/)).toBeInTheDocument();
    expect(screen.getByText(state.responses.processesAry[0])).toBeInTheDocument();
    expect(screen.getByText(state.responses.processesAry[1])).toBeInTheDocument();
});

test('Should dispatch BACK_OUTTA_VIEW_FOLLOWER_PROCESSES when Back button clicked', () => {
    const mock = jest.fn()
    render(<ViewFollowerProcesses ProcessC={mockProcess} _useDispatch={() => mock} _useSelector={useSelector}/>)

    userEvent.click(screen.getByText('Back'))
    expect(mock).toHaveBeenCalledWith({type: BACK_OUTTA_VIEW_FOLLOWER_PROCESSES})
})


import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import AddStage from "./AddStage";
import {
    ADD_STAGE_PAGE,
    CANCEL_ADD_PROCESS,
    CANCEL_ADD_STAGE,
    UPDATE_MC,
    UPDATE_PROCESS_TITLE,
    UPDATE_STAGE_QUESTION,
    UPDATE_STAGE_TYPE
} from "../../modules/processes";
import AddProcess from "./AddProcess";

const mockStage = {mockStage: "mock stage"};

test('Should show blank title and Cancel, Accept, & "Add Stage" buttons', () => {
    const state = { processes: {
            newProcessTitle: "",
            stagesAry: []
        }};
    render(<AddProcess stage={mockStage} _useSelector={fn => fn(state)} _useDispatch={()=>{}}/>)

    // expect(screen.getByPlaceholderText('Title')).toBeEmptyDOMElement()
    expect(screen.getByText(/Cancel/)).toBeInTheDocument();
    expect(screen.getByText(/Accept/)).toBeInTheDocument();
    expect(screen.getByText(/Add Stage/)).toBeInTheDocument();
});

// it('should update title when user types in title box', () => {
//     const state = { processes: {
//             newProcessTitle: "",
//             stagesAry: []
//         }};
//     const dispatch = jest.fn()
//     const title = 'some title'
//     render(<AddProcess stage={mockStage} _useSelector={fn => fn(state)} _useDispatch={()=>dispatch}/>)
//     const titleElement = screen.getByPlaceholderText('Title')
//     userEvent.type(titleElement, title)
//     expect(dispatch).toHaveBeenCalledWith({type: UPDATE_PROCESS_TITLE, payload: {newProcessTitle: title}})
// })

test('Should dispatch CANCEL_ADD_STAGE when Cancel button clicked', () => {
    const state = { processes: {
            newProcessTitle: "",
            stagesAry: []
        }};
    const dispatch = jest.fn()
    render(<AddProcess stage={mockStage} _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)

    userEvent.click(screen.getByText('Cancel'))
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_ADD_PROCESS})
})

test('Should dispatch addStageToNewStagesAry when Accept button clicked', () => {
    const state = { processes: {
            newProcessTitle: "",
            stagesAry: []
        }};
    const dispatch = jest.fn()
    render(<AddProcess stage={mockStage} _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)

    userEvent.click(screen.getByText('Accept'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})


test('Should dispatch ADD_STAGE_PAGE when "Add Stage" button clicked', () => {
    const state = { processes: {
            newProcessTitle: "",
            stagesAry: []
        }};
    const dispatch = jest.fn()
    render(<AddProcess stage={mockStage} _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)

    userEvent.click(screen.getByText('Add Stage'))
    expect(dispatch).toHaveBeenCalledWith({type: ADD_STAGE_PAGE})
})

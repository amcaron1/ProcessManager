import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import AddStage from "./AddStage";
import {CANCEL_ADD_STAGE, UPDATE_MC, UPDATE_STAGE_QUESTION, UPDATE_STAGE_TYPE} from "../../modules/processes";

test('Should show blank question, unchecek "Stage Type", & hidden "MC Answers" and Cancel & Accept buttons', () => {
    const state = { processes:{
            mcHidden: true,
            newStageMC: {mc1: "", mc2: "", mc3: ""},
            newStageQuestion: "",
            newStageType: ""
        }};
    // render(<AddStage _useDispatch={() => {}} _useSelector={useSelector}/>);
    render(<AddStage _useSelector={fn => fn(state)} _useDispatch={()=>{}}/>)

    expect(screen.getByPlaceholderText('Question')).toBeEmptyDOMElement()
    expect(screen.getByDisplayValue("Text")).not.toBeChecked();
    expect(screen.getByDisplayValue("True/False")).not.toBeChecked();
    expect(screen.getByDisplayValue("Multiple Choice")).not.toBeChecked();
    expect(screen.getByPlaceholderText("MC Answer 1")).not.toBeVisible();
    expect(screen.getByPlaceholderText("MC Answer 2")).not.toBeVisible();
    expect(screen.getByPlaceholderText("MC Answer 3")).not.toBeVisible();
    expect(screen.getByText(/Cancel/)).toBeInTheDocument();
    expect(screen.getByText(/Accept/)).toBeInTheDocument();
});

it('should update question when user types in question box', () => {
    const state = { processes:{
            mcHidden: true,
            newStageMC: {mc1: "", mc2: "", mc3: ""},
            newStageQuestion: "",
            newStageType: ""
        }};
    const dispatch = jest.fn()
    const question = 'some question'
    render(<AddStage _useSelector={fn => fn(state)} _useDispatch={()=>dispatch}/>)
    const questionElement = screen.getByPlaceholderText('Question')
    userEvent.type(questionElement, question)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_STAGE_QUESTION, payload: {newStageQuestion: question}})
})

test('Should update newStageType when user selects "Stage Type radio button', () => {
    const newStageType = "Text"
    const state = { processes:{
            mcHidden: true,
            newStageMC: {mc1: "", mc2: "", mc3: ""},
            newStageQuestion: "",
            newStageType: ""
        }};
    const dispatch = jest.fn()
    render(<AddStage _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)

    userEvent.click(screen.getByDisplayValue('Text'))
    expect(screen.getByDisplayValue("Text")).toBeChecked();
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_STAGE_TYPE, payload: {newStageType: newStageType}})
})

it('should update mc1 when user types in mc1 box', () => {
    const mc1 = 'some answer'
    const mc2 = "some other answer"
    const mc3 = "some better answer"
    const state = {processes: {
            mcHidden: true,
            newStageMC: {mc1: "", mc2: mc2, mc3: mc3},
            newStageQuestion: "",
            newStageType: ""
        }};
    const dispatch = jest.fn()
    render(<AddStage _useSelector={fn => fn(state)} _useDispatch={()=>dispatch}/>)
    const mc1Element = screen.getByPlaceholderText('MC Answer 1')
    userEvent.type(mc1Element, mc1)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_MC, payload: {mc1, mc2, mc3}})
})

test('Should dispatch CANCEL_ADD_STAGE when Cancel button clicked', () => {
    const state = { processes:{
            mcHidden: true,
            newStageMC: {mc1: "", mc2: "", mc3: ""},
            newStageQuestion: "",
            newStageType: ""
        }};
    const dispatch = jest.fn()
    render(<AddStage _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)

    userEvent.click(screen.getByText('Cancel'))
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_ADD_STAGE})
})

test('Should dispatch addStageToNewStagesAry when Accept button clicked', () => {
    const state = { processes:{
            mcHidden: true,
            newStageMC: {mc1: "", mc2: "", mc3: ""},
            newStageQuestion: "",
            newStageType: ""
        }};
    const dispatch = jest.fn()
    render(<AddStage _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)

    userEvent.click(screen.getByText('Accept'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')})


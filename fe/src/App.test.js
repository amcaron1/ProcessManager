import { render, screen } from '@testing-library/react';
import App from './App';

const expectedText = 'This is the expected text'
const mockComponent = () => <div>{expectedText}</div>
// let state = {processes: {processes: {userTask: "", activityTask: ""}}}
let state = {processes: {userTask: "", activityTask: ""}, responses: {followerTask: "", stageType: ""}}
function useSelector(selectorFn) {
  return selectorFn(state)
}

test('Should display ViewAllProcesses page when userTask is editor and ' +
    'activityTask is viewAllProcesses', () => {
  state.processes.userTask = "editor"
  state.processes.activityTask = "viewAllProcesses"
  render(<App ViewAllProcessesC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display AddProcess page when userTask is editor and ' +
    'activityTask is addProcess', () => {
  state.processes.userTask = "editor"
  state.processes.activityTask = "addProcess"
  render(<App AddProcessC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display AddStage page when userTask is editor and ' +
    'activityTask is addStage', () => {
  state.processes.userTask = "editor"
  state.processes.activityTask = "addStage"
  render(<App AddStageC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display ViewOneProcessAndStages page when userTask is editor and ' +
    'activityTask is viewOneProcessAndStages', () => {
  state.processes.userTask = "editor"
  state.processes.activityTask = "viewOneProcessAndStages"
  render(<App ViewOneProcessAndStagesC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display ViewFinishedProcesses page when userTask is editor and ' +
    'activityTask is viewAllFinished', () => {
  state.processes.userTask = "editor"
  state.processes.activityTask = "viewAllFinished"
  render(<App ViewFinishedProcessesC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display ViewOneFinishedProcess page when userTask is editor and ' +
    'activityTask is viewAllFinished', () => {
  state.processes.userTask = "editor"
  state.processes.activityTask = "viewOneFinished"
  render(<App ViewOneFinishedProcessC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display EditorMenu page when userTask is editor and ' +
    'activityTask is null', () => {
  state.processes.userTask = "editor"
  state.processes.activityTask = null
  render(<App EditorMenuC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display ViewFollowerProcesses page when userTask is follower and ' +
    'followerTask is viewFollowerProcesses', () => {
  state.processes.userTask = "follower"
  state.responses.followerTask = "viewFollowerProcesses"
  render(<App ViewFollowerProcessesC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display FollowProcess page when userTask is follower, ' +
    'followerTask is followProcess', () => {
  state.processes.userTask = "follower"
  state.responses.followerTask = "followProcess"
  render(<App FollowProcessC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display FinishedProcess page when userTask is follower, ' +
    'followerTask is finishedProcess', () => {
  state.processes.userTask = "follower"
  state.responses.followerTask = "finishedProcess"
  render(<App FinishedProcessC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display FollowerMenu page when userTask is follower and ' +
    'followerTask is null', () => {
  state.processes.userTask = "follower"
  state.responses.followerTask = null
  render(<App FollowerMenuC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

test('Should display MsinMenu page when userTask is null', () => {
  state.processes.userTask = null
  render(<App MainMenuC={mockComponent} _useSelector={useSelector}/>);
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

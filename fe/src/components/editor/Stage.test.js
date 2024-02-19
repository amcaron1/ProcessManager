import { render, screen } from '@testing-library/react';
import Stage from "./Stage";

test('Should show question, stageType Text, and mcOptions hidden', () => {
    const mockStage = {stageID: 0, processID: 0, stageOrder: 0, stageType: "Text",
        question: "some question", mcOption1: "z", mcOption2: "zz", mcOption3: "zzz"}

    render(<Stage stage={mockStage} _useDispatch={() => {}}/>);
    expect(screen.getByText("Question: " + mockStage.question)).toBeInTheDocument();
    expect(screen.getByText("Stage Type: " + mockStage.stageType)).toBeInTheDocument();
    expect(screen.getByText("MC Answer1: " + mockStage.mcOption1)).not.toBeVisible();
    expect(screen.getByText("MC Answer2: " + mockStage.mcOption2)).not.toBeVisible();
    expect(screen.getByText("MC Answer3: " + mockStage.mcOption3)).not.toBeVisible();
});

test('Should show question, stageType boolean, and mcOptions hidden', () => {
    const mockStage = {stageID: 0, processID: 0, stageOrder: 0, stageType: "True/False",
        question: "some question", mcOption1: "z", mcOption2: "zz", mcOption3: "zzz"}

    render(<Stage stage={mockStage} _useDispatch={() => {}}/>)
    expect(screen.getByText("Question: " + mockStage.question)).toBeInTheDocument();
    expect(screen.getByText("Stage Type: " + mockStage.stageType)).toBeInTheDocument();
    expect(screen.getByText("MC Answer1: " + mockStage.mcOption1)).not.toBeVisible();
    expect(screen.getByText("MC Answer2: " + mockStage.mcOption2)).not.toBeVisible();
    expect(screen.getByText("MC Answer3: " + mockStage.mcOption3)).not.toBeVisible();
})

test('Should show question, stageType "Multiple Choice", and mcOptions visible', () => {
    const mockStage = {stageID: 0, processID: 0, stageOrder: 0, stageType: "Multiple Choice",
        question: "some question", mcOption1: "z", mcOption2: "zz", mcOption3: "zzz"}

    render(<Stage stage={mockStage} _useDispatch={() => {}}/>)
    expect(screen.getByText("Question: " + mockStage.question)).toBeInTheDocument();
    expect(screen.getByText("Stage Type: " + mockStage.stageType)).toBeInTheDocument();
    expect(screen.getByText("MC Answer1: " + mockStage.mcOption1)).toBeVisible();
    expect(screen.getByText("MC Answer2: " + mockStage.mcOption2)).toBeVisible();
    expect(screen.getByText("MC Answer3: " + mockStage.mcOption3)).toBeVisible();
})

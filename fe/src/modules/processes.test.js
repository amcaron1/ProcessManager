import reducer, {
    EDITOR_MENU_PAGE,
    FOLLOWER_MENU_PAGE,
    SERVICE_START,
    SERVICE_FAILURE,
    BACK,
    MAIN_MENU_PAGE,
    VIEW_ALL_PROCESSES_PAGE,
    BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE,
    ADD_PROCESS_PAGE,
    ADD_STAGE_PAGE,
    CANCEL_ADD_PROCESS,
    ADD_STAGE,
    CANCEL_ADD_STAGE,
    UPDATE_PROCESS_TITLE,
    UPDATE_MC,
    UPDATE_STAGE_QUESTION,
    UPDATE_STAGE_TYPE,
    ADD_PROCESS,
    VIEW_ONE_PROCESS_AND_STAGES_PAGE,
    BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE,
    BACK_OUTTA_VIEW_ALL_FINISHED_PAGE,
    VIEW_ONE_FINISHED_PROCESS_PAGE,
    BACK_OUTTA_VIEW_ONE_FINISHED_PROCESS_PAGE,
    VIEW_ALL_FINISHED_PAGE,
    viewAllProcesses,
    deleteProcess,
    addProcess,
    addStageToStagesAry,
    viewOneProcess,
    viewAllFinished,
    viewOneFinishedProcess,
    editProcess,
    editStage,
    deleteStage,
    reorderStages,
    ADD_EDIT_STAGE_PAGE,
    EDIT_PROCESS_PAGE,
    CANCEL_EDIT_PROCESS,
    EDIT_PROCESS,
    EDIT_STAGE_PAGE,
    CANCEL_EDIT_STAGE, EDIT_STAGE, DELETE_STAGE, REORDER_STAGES
} from "./processes";

it('should start with activityTask null', () => {
    const state = reducer()
    expect(state.activityTask).toBe(null)
})

it('should start with displayTitle ""', () => {
    const state = reducer()
    expect(state.displayTitle).toBe("")
})

it('should start with mcHidden true', () => {
    const state = reducer()
    expect(state.mcHidden).toBe(true)
})

it('should start with newProcessTitle ""', () => {
    const state = reducer()
    expect(state.newProcessTitle).toBe("")
})

it('should start with each newStageMC value ""', () => {
    const state = reducer()
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
})

it('should start with newStageQuestion ""', () => {
    const state = reducer()
    expect(state.newStageQuestion).toBe("")
})

it('should start with newStagesAry []', () => {
    const state = reducer()
    expect(state.newStagesAry).toStrictEqual([])
})

it('should start with newStageType ""', () => {
    const state = reducer()
    expect(state.newStageType).toBe("")
})

it('should start with processesAry []', () => {
    const state = reducer()
    expect(state.processesAry).toStrictEqual([])
})

it('should start with processToEdit {processID: -1, title: "", stageOrder: ""}', () => {
    const state = reducer()
    expect(state.processToEdit).toStrictEqual({processID: -1, title: "", stageOrder: ""})
})

it('should start with processToViewIndex -1', () => {
    const state = reducer()
    expect(state.processToViewIndex).toBe(-1)
})

it('should start with stagesAry []', () => {
    const state = reducer()
    expect(state.stagesAry).toStrictEqual([])
})

it('should start with stageToEdit {stageID: -1, processID: -1, stageOrder: -1, stageType: "", question: "",\n' +
    'mcOption1: "", mcOption2: "", mcOption3: ""}', () => {
    const state = reducer()
    expect(state.stageToEdit).toStrictEqual({stageID: -1, processID: -1, stageOrder: -1, stageType: "", question: "",
        mcOption1: "", mcOption2: "", mcOption3: ""})
})

it('should start with userTask null', () => {
    const state = reducer()
    expect(state.userTask).toBe(null)
})

it('should set userTask when EDITOR_MENU_PAGE', () => {
    const initialState = reducer()
    initialState.userTask = "some task"
    const state = reducer(initialState, {type: EDITOR_MENU_PAGE})
    expect(state.userTask).toBe("editor")
})

it('should set userTask when FOLLOWER_MENU_PAGE', () => {
    const initialState = reducer()
    initialState.userTask = "some task"
    const state = reducer(initialState, {type: FOLLOWER_MENU_PAGE})
    expect(state.userTask).toBe("follower")
})

it('should set activityTask and processesAry when VIEW_ALL_PROCESSES_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: VIEW_ALL_PROCESSES_PAGE, payload: {processesAry: ["a","b"]}})
    expect(state.activityTask).toBe("viewAllProcesses")
    expect(state.processesAry).toStrictEqual(["a","b"])
})

it('should set activityTask and processesAry when BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE', () => {
    const initialState = reducer()
    initialState.activityTask = "some task"
    initialState.processesAry = ["a","b"]
    const state = reducer(initialState, {type: BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE})
    expect(state.activityTask).toBe(null)
    expect(state.processesAry).toStrictEqual([])
})

it('should set activityTask when BACK', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: BACK, payload: {activityTask: "some task"}})
    expect(state.activityTask).toBe("some task")
})

it('should set activityTask and userTask when MAIN_MENU', () => {
    const initialState = reducer()
    initialState.userTask = "some task"
    initialState.activityTask = "some other task"
    const state = reducer(initialState, {type: MAIN_MENU_PAGE})
    expect(state.activityTask).toBe(null)
    expect(state.userTask).toBe(null)
})

it('should set activityTask when ADD_PROCESS_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: ADD_PROCESS_PAGE})
    expect(state.activityTask).toBe("addProcess")
})

it('should set activityTask when ADD_STAGE_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: ADD_STAGE_PAGE})
    expect(state.activityTask).toBe("addStage")
})

it('should set activityTask when ADD_EDIT_STAGE_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: ADD_EDIT_STAGE_PAGE})
    expect(state.activityTask).toBe("addEditStage")
})

it('should set activityTask, newProcessTitle, newStageMC, tagesAry, newStageQuestion, and newStageType when CANCEL_ADD_PROCESS', () => {
    const initialState = reducer()
    initialState.newProcessTitle = "some title"
    initialState.newStageMC = {mc1: "a", mc2: "a", mc3: "c"}
    initialState.stagesAry = ["a","b"]
    initialState.newStageQuestion = "some question"
    initialState.newStageType = "some type"
    const state = reducer(initialState, {type: CANCEL_ADD_PROCESS})
    expect(state.activityTask).toBe("viewAllProcesses")
    expect(state.newProcessTitle).toBe("")
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
    expect(state.stagesAry).toStrictEqual([])
    expect(state.newStageQuestion).toBe("")
    expect(state.newStageType).toBe("")
})

it('should set activityTask, mcHidden, newStageMC, stagesAry, newStageQuestion, ' +
    'and newStageType when ADD_STAGE and activityTask is addEditStage', () => {
    const initialState = reducer()
    initialState.activityTask = "addEditStage"
    initialState.mcHidden = false
    initialState.newStageMC = {mc1: "a", mc2: "a", mc3: "c"}
    initialState.stagesAry = ["a","b"]
    initialState.newStageQuestion = "some question"
    initialState.newStageType = "some type"
    const state = reducer(initialState, {type: ADD_STAGE, payload: "c"})
    expect(state.activityTask).toBe("viewOneProcessAndStages")
    expect(state.mcHidden).toBe(true)
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
    expect(state.stagesAry).toStrictEqual(["a","b","c"])
    expect(state.newStageQuestion).toBe("")
    expect(state.newStageType).toBe("")
})

it('should set activityTask, mcHidden, newStageMC, stagesAry, newStageQuestion, ' +
    'and newStageType when ADD_STAGE and activityTask is addStage', () => {
    const initialState = reducer()
    initialState.activityTask = "addStage"
    initialState.mcHidden = false
    initialState.newStageMC = {mc1: "a", mc2: "a", mc3: "c"}
    initialState.stagesAry = ["a","b"]
    initialState.newStageQuestion = "some question"
    initialState.newStageType = "some type"
    const state = reducer(initialState, {type: ADD_STAGE, payload: "c"})
    expect(state.activityTask).toBe("addProcess")
    expect(state.mcHidden).toBe(true)
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
    expect(state.stagesAry).toStrictEqual(["a","b","c"])
    expect(state.newStageQuestion).toBe("")
    expect(state.newStageType).toBe("")
})

it('should set activityTask, mcHidden, newStageMC, newStageQuestion, ' +
    'and newStageType when CANCEL_ADD_STAGE and activityTask is addEditStage', () => {
    const initialState = reducer()
    initialState.activityTask = "addEditStage"
    initialState.mcHidden = false
    initialState.newStageMC = {mc1: "a", mc2: "a", mc3: "c"}
    initialState.newStageQuestion = "some question"
    initialState.newStageType = "some type"
    const state = reducer(initialState, {type: CANCEL_ADD_STAGE})
    expect(state.activityTask).toBe("viewOneProcessAndStages")
    expect(state.mcHidden).toBe(true)
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
    expect(state.newStageQuestion).toBe("")
    expect(state.newStageType).toBe("")
})

it('should set activityTask, mcHidden, newStageMC, newStageQuestion, ' +
    'and newStageType when CANCEL_ADD_STAGE and activityTask is addStage', () => {
    const initialState = reducer()
    initialState.activityTask = "addStage"
    initialState.mcHidden = false
    initialState.newStageMC = {mc1: "a", mc2: "a", mc3: "c"}
    initialState.newStageQuestion = "some question"
    initialState.newStageType = "some type"
    const state = reducer(initialState, {type: CANCEL_ADD_STAGE})
    expect(state.activityTask).toBe("addProcess")
    expect(state.mcHidden).toBe(true)
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
    expect(state.newStageQuestion).toBe("")
    expect(state.newStageType).toBe("")
})

it('should set newProcessTitle when UPDATE_PROCESS_TITLE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: UPDATE_PROCESS_TITLE, payload: {newProcessTitle: "some title"}})
    expect(state.newProcessTitle).toBe("some title")
})

it('should set newStageMC when UPDATE_MC', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: UPDATE_MC, payload: {mc1: "d", mc2: "e", mc3: "f"}})
    expect(state.newStageMC).toStrictEqual({mc1: "d", mc2: "e", mc3: "f"})
})

it('should set newStageQuestion when UPDATE_STAGE_QUESTION', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: UPDATE_STAGE_QUESTION, payload: {newStageQuestion: "some question"}})
    expect(state.newStageQuestion).toBe("some question")
})

it('should set mcHidden, newStageMC, and newStageType when UPDATE_STAGE_TYPE with mc', () => {
    const initialState = reducer()
    initialState.newStageMC = {mc1: "a", mc2: "a", mc3: "c"}
    const state = reducer(initialState, {type: UPDATE_STAGE_TYPE, payload: {newStageType: "Multiple Choice"}})
    expect(state.mcHidden).toBe(false)
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
    expect(state.newStageType).toBe("Multiple Choice")
})

it('should set mcHidden, newStageMC, and newStageType when UPDATE_STAGE_TYPE with not mc', () => {
    const initialState = reducer()
    initialState.mcHidden = false
    initialState.newStageMC = {mc1: "a", mc2: "a", mc3: "c"}
    const state = reducer(initialState, {type: UPDATE_STAGE_TYPE, payload: {newStageType: "Text"}})
    expect(state.mcHidden).toBe(true)
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
    expect(state.newStageType).toBe("Text")
})

it('should set activityTask, newProcessTitle, newStagesAry, and processesAry when ADD_PROCESS', () => {
    const initialState = reducer()
    initialState.newProcessTitle = "some title"
    initialState.stagesAry = ["a","b"]
    initialState.processesAry = ["a","b"]
    const state = reducer(initialState, {type: ADD_PROCESS, payload: "c"})
    expect(state.activityTask).toBe("viewAllProcesses")
    expect(state.newProcessTitle).toBe("")
    expect(state.stagesAry).toStrictEqual([])
    expect(state.processesAry).toStrictEqual(["a","b","c"])
})

it('should set activityTask, processToViewIndex, and stagesAry when VIEW_ONE_PROCESS_AND_STAGES_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: VIEW_ONE_PROCESS_AND_STAGES_PAGE,
        payload: {processToViewIndex: 5, stagesAry: ["a","b"]}})
    expect(state.activityTask).toBe("viewOneProcessAndStages")
    expect(state.processToViewIndex).toStrictEqual(5)
    expect(state.stagesAry).toStrictEqual(["a","b"])
})

it('should set activityTask, processToViewIndex, and stagesAry when BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE', () => {
    const initialState = reducer()
    initialState.processes = 5;
    initialState.stagesAry = ["a","b"]
    const state = reducer(initialState, {type: BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE})
    expect(state.activityTask).toBe("viewAllProcesses")
    expect(state.processToViewIndex).toStrictEqual(-1)
    expect(state.stagesAry).toStrictEqual([])
})

it('should set activityTask, and processesAry, when BACK_OUTTA_VIEW_ALL_FINISHED_PAGE', () => {
    const initialState = reducer()
    initialState.activityTask = "some task";
    initialState.processesAry = ["a","b"]
    const state = reducer(initialState, {type: BACK_OUTTA_VIEW_ALL_FINISHED_PAGE})
    expect(state.activityTask).toBe(null)
    expect(state.processesAry).toStrictEqual([])
    // expect(state.mcHidden).toStrictEqual(false)
})

it('should set activityTask, and processesAry when VIEW_ALL_FINISHED_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: VIEW_ALL_FINISHED_PAGE,
        payload: {processesAry: ["a","b"]}})
    expect(state.activityTask).toBe( "viewAllFinished")
    expect(state.processesAry).toStrictEqual(["a","b"])
    // expect(state.mcHidden).toStrictEqual(false)
})

it('should set activityTask, stagesAry, and processToViewIndex when VIEW_ONE_FINISHED_PROCESS_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: VIEW_ONE_FINISHED_PROCESS_PAGE,
        payload: {stagesAry: ["a","b"], processToViewIndex: 5}})
    expect(state.activityTask).toBe( "viewOneFinished")
    expect(state.stagesAry).toStrictEqual(["a","b"])
    expect(state.processToViewIndex).toBe(5)
})

it('should set activityTask, processToViewIndex, and stagesAry when BACK_OUTTA_VIEW_ONE_FINISHED_PROCESS_PAGE', () => {
    const initialState = reducer()
    initialState.processToViewIndex = 5
    initialState.stagesAry = ["a","b"]
    const state = reducer(initialState, {type: BACK_OUTTA_VIEW_ONE_FINISHED_PROCESS_PAGE})
    expect(state.activityTask).toBe( "viewAllFinished")
    expect(state.stagesAry).toStrictEqual([])
    expect(state.processToViewIndex).toBe(-1)
})

it('should set activityTask, displayTitle, and processToEdit when EDIT_PROCESS_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: EDIT_PROCESS_PAGE,
        payload: {displayTitle: "some title", processToEdit: {processID: 0, title: "cool title", stageOrder: "1"}}})
    expect(state.activityTask).toBe( "editProcess")
    expect(state.displayTitle).toBe("some title")
    expect(state.processToEdit).toStrictEqual({processID: 0, title: "cool title", stageOrder: "1"})
})

it('should set activityTask, displayTitle, newProcessTitle, ' +
    'and processToEdit when CANCEL_EDIT_PROCESS', () => {
    const initialState = reducer()
    initialState.displayTitle = "some title"
    initialState.newProcessTitle = "some other title"
    initialState.processToEdit = {processID: 0, title: "cool title", stageOrder: "1"}
    const state = reducer(initialState, {type: CANCEL_EDIT_PROCESS})
    expect(state.activityTask).toBe( "viewOneProcessAndStages")
    expect(state.displayTitle).toBe("")
    expect(state.newProcessTitle).toBe("")
    expect(state.processToEdit).toStrictEqual({processID: -1, title: "", stageOrder: ""})
})

it('should set activityTask, displayTitle, processesAry, ' +
    'newProcessTitle, and processToEdit when EDIT_PROCESS', () => {
    const initialState = reducer()
    initialState.displayTitle = "some title"
    initialState.newProcessTitle = "some other title"
    initialState.processToEdit = {processID: 0, title: "cool title", stageOrder: "1"}
    const state = reducer(initialState, {type: EDIT_PROCESS,
        payload: {processesAry: {processID: 0, title: "cool title", stageOrder: "1"}}})
    expect(state.activityTask).toBe( "viewOneProcessAndStages")
    expect(state.displayTitle).toBe("")
    expect(state.newProcessTitle).toBe("")
    expect(state.processesAry).toStrictEqual({processID: 0, title: "cool title", stageOrder: "1"})
    expect(state.processToEdit).toStrictEqual({processID: -1, title: "", stageOrder: ""})
})

it('should set activityTask, mcHidden, newStageMC, ' +
    'newStageQuestion, newStageType, and stageToEdit when EDIT_STAGE_PAGE ' +
    'and stageType is "Multiple Choice"', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: EDIT_STAGE_PAGE, payload: {
        stageToEdit: {stageID: 0, processID: 0, stageOrder: 0,
            stageType: "Multiple Choice", question: "some question",
            mcOption1: "a", mcOption2: "b", mcOption3: "c"}
    }})
    expect(state.activityTask).toBe( "editStage")
    expect(state.mcHidden).toBe(false)
    expect(state.newStageMC).toStrictEqual({mc1: "a", mc2: "b", mc3: "c"})
    expect(state.newStageQuestion).toBe("some question")
    expect(state.newStageType).toBe("Multiple Choice")
    expect(state.stageToEdit).toStrictEqual({stageID: 0, processID: 0, stageOrder: 0,
        stageType: "Multiple Choice", question: "some question",
        mcOption1: "a", mcOption2: "b", mcOption3: "c"})
})

it('should set activityTask, mcHidden, newStageMC, ' +
    'newStageQuestion, newStageType, and stageToEdit when EDIT_STAGE_PAGE ' +
    'and stageType is not "Multiple Choice"', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: EDIT_STAGE_PAGE, payload: {
            stageToEdit: {stageID: 0, processID: 0, stageOrder: 0,
                stageType: "Text", question: "some question",
                mcOption1: "a", mcOption2: "b", mcOption3: "c"}
        }})
    expect(state.activityTask).toBe( "editStage")
    expect(state.mcHidden).toBe(true)
    expect(state.newStageQuestion).toBe("some question")
    expect(state.newStageType).toBe("Text")
    expect(state.stageToEdit).toStrictEqual({stageID: 0, processID: 0, stageOrder: 0,
        stageType: "Text", question: "some question",
        mcOption1: "a", mcOption2: "b", mcOption3: "c"})
})

it('should set activityTask, mcHidden, newStageMC, ' +
    'newStageQuestion, newStageType, and stageToEdit when CANCEL_EDIT_STAGE ', () => {
    const initialState = reducer()
    initialState.mcHidden = false
    initialState.newStageMC = {mc1: "a", mc2: "b", mc3: "c"}
    initialState.newStageQuestion = "some question"
    initialState.newStageType = "Text"
    initialState.stageToEdit = {stageID: 0, processID: 0, stageOrder: 0,
        stageType: "Text", question: "some question",
        mcOption1: "a", mcOption2: "b", mcOption3: "c"}
    const state = reducer(initialState, {type: CANCEL_EDIT_STAGE})
    expect(state.activityTask).toBe( "viewOneProcessAndStages")
    expect(state.mcHidden).toBe(true)
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
    expect(state.newStageQuestion).toBe("")
    expect(state.newStageType).toBe("")
    expect(state.stageToEdit).toStrictEqual({stageID: -1, processID: -1, stageOrder: -1, stageType: "", question: "",
        mcOption1: "", mcOption2: "", mcOption3: ""})
})

it('should set activityTask, mcHidden, newStageMC, ' +
    'newStageQuestion, newStageType, stagesAry, and stageToEdit ' +
    'when EDIT_STAGE ', () => {
    const initialState = reducer()
    initialState.mcHidden = false
    initialState.newStageMC = {mc1: "a", mc2: "b", mc3: "c"}
    initialState.newStageQuestion = "some question"
    initialState.newStageType = "Text"
    initialState.stageToEdit = {stageID: 0, processID: 0, stageOrder: 0,
        stageType: "Text", question: "some question",
        mcOption1: "a", mcOption2: "b", mcOption3: "c"}
    const state = reducer(initialState, {type: EDIT_STAGE, payload: {
        stagesAry: ["a", "b"]
        }})
    expect(state.activityTask).toBe( "viewOneProcessAndStages")
    expect(state.mcHidden).toBe(true)
    expect(state.newStageMC).toStrictEqual({mc1: "", mc2: "", mc3: ""})
    expect(state.newStageQuestion).toBe("")
    expect(state.newStageType).toBe("")
    expect(state.stagesAry).toStrictEqual(["a", "b"])
    expect(state.stageToEdit).toStrictEqual({stageID: -1, processID: -1, stageOrder: -1, stageType: "", question: "",
        mcOption1: "", mcOption2: "", mcOption3: ""})
})

it('should set activityTask and stagesAry when DELETE_STAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: DELETE_STAGE, payload: {
        stagesAry: ["a", "b"]
        }})
    expect(state.activityTask).toBe( "viewOneProcessAndStages")
    expect(state.stagesAry).toStrictEqual(["a", "b"])
})

it('should set activityTask and stagesAry when REORDER_STAGES', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: REORDER_STAGES, payload: {
            stagesAry: ["a", "b"]
        }})
    expect(state.activityTask).toBe( "viewOneProcessAndStages")
    expect(state.stagesAry).toStrictEqual(["a", "b"])
})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when findAllProcesses with bad response', async () => {
    const url = `http://localhost:8080/findAllProcesses`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({ok: false}))
    }

    const dispatch = jest.fn()
    const sideEffect = viewAllProcesses(mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Error accessing processes")
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_FAILURE})
})


it('should dispatch SERVICE_START then VIEW_ALL_PROCESSES_PAGE when findAllProcesses with good response', async () => {
    const result = 'some results'
    const url = `http://localhost:8080/findAllProcesses`
    let _url

    // Mock fetch
    // Returns a promise
    // Need to pass url
    // _url = url for query after test
    // Promise is an object for handling an async event
    // async is an event that will happen in future
    // Do not wnat to wait for it
    // Promise stores the anom function that has resolve as an arg
    // It returns the result of resulve that has an object as its arg
    //
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))
        }))
    }

    const dispatch = jest.fn()
    const sideEffect = viewAllProcesses(mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_ALL_PROCESSES_PAGE, payload: {processesAry: result}})
})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when deleteProcess with bad process response', async () => {
    const processID = 123;
    const url = `http://localhost:8080/deleteProcess?processID=${processID}`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({ok: false}))
    }

    const dispatch = jest.fn()
    const sideEffect = deleteProcess(processID, mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Error deleting process")
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_FAILURE})
})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when deleteProcess with bad stages response', async () => {
    const processID = 123;
    const result = 'some results'
    const url1 = `http://localhost:8080/deleteProcess?processID=${processID}`
    const url2 = `http://localhost:8080/deleteAllByProcessID?processID=${processID}`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: false}))
    }

    const dispatch = jest.fn()
    const sideEffect = deleteProcess(processID, mockFetch1, mockFetch2)
    await sideEffect(dispatch)
    expect(_url1).toBe(url1)
    expect(_url2).toBe(url2)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Error deleting stages")
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_FAILURE})
})

it('should dispatch SERVICE_START then VIEW_ALL_PROCESSES_PAGE when deleteProcess with good responses', async () => {
    const processID = 123;
    const result = 'some results'
    const url1 = `http://localhost:8080/deleteProcess?processID=${processID}`
    const url2 = `http://localhost:8080/deleteAllByProcessID?processID=${processID}`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {processes: {processesAry: [{processID: 121}, {processID: 122}, {processID: 123}, {processID: 124}]}}
    const getState = () => state
    const sideEffect = deleteProcess(processID, mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_ALL_PROCESSES_PAGE,
        payload: {processesAry: [{processID: 121}, {processID: 122}, {processID: 124}]}})
})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when addProcess with newProcessTitle ""', async () => {
    const result = {processID: 0, title: "some title", stageOrder: ""}
    const tempTitle = "some title"
    const tempOrder = ""
    const url1 = `http://localhost:8080/addProcess?title=${tempTitle}&stageOrder=${tempOrder}`
    const url2 = `http://localhost:8080/addAllStages`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {processes: {newProcessTitle: "",
            newStagesAry: [
                {processID: -1, question: "some question"},
                {processID: -1, question: "some other question"}]}}
    const getState = () => state
    const sideEffect = addProcess(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Process title cannot be blank")
    expect(dispatch).toHaveBeenCalledWith({type: BACK, payload: {activityTask: "addProcess"}})
})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when addProcess with empty newStagesAry', async () => {
    const result = {processID: 0, title: "some title", stageOrder: ""}
    const tempTitle = "some title"
    const tempOrder = ""
    const url1 = `http://localhost:8080/addProcess?title=${tempTitle}&stageOrder=${tempOrder}`
    const url2 = `http://localhost:8080/addAllStages`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {processes: {newProcessTitle: "some title",
            stagesAry: []}}
    const getState = () => state
    const sideEffect = addProcess(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Must have at least one stage")
    expect(dispatch).toHaveBeenCalledWith({type: BACK, payload: {activityTask: "addProcess"}})
})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when addProcess with bad process response', async () => {
    const result = {processID: 0, title: "some title", stageOrder: ""}
    const tempTitle = "some title"
    const tempOrder = ""
    const url1 = `http://localhost:8080/addProcess?title=${tempTitle}&stageOrder=${tempOrder}`
    const url2 = `http://localhost:8080/addAllStages`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {processes: {newProcessTitle: "some title",
            stagesAry: [
                {processID: -1, question: "some question"},
                {processID: -1, question: "some other question"}]}}
    const getState = () => state
    const sideEffect = addProcess(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState)
    expect(_url1).toBe(url1)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Error adding process")
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_FAILURE})
})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when addProcess with bad stages response', async () => {
    const result = {processID: 0, title: "some title", stageOrder: ""}
    const tempTitle = "some title"
    const tempOrder = ""
    const url1 = `http://localhost:8080/addProcess?title=${tempTitle}&stageOrder=${tempOrder}`
    const url2 = `http://localhost:8080/addAllStages`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {processes: {newProcessTitle: "some title",
            stagesAry: [
                {processID: -1, question: "some question"},
                {processID: -1, question: "some other question"}]}}
    const getState = () => state
    const sideEffect = addProcess(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState)
    expect(_url1).toBe(url1)
    expect(_url2).toBe(url2)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Error adding stages")
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_FAILURE})
})

it('should dispatch SERVICE_START then ADD_PROCESS when addProcess with good responses', async () => {
    const result = {processID: 0, title: "some title", stageOrder: ""}
    const tempTitle = "some title"
    const tempOrder = ""
    const url1 = `http://localhost:8080/addProcess?title=${tempTitle}&stageOrder=${tempOrder}`
    const url2 = `http://localhost:8080/addAllStages`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {processes: {
        newProcessTitle: "some title",
        stagesAry: [
            {processID: -1, question: "some question"},
            {processID: -1, question: "some other question"}]}}
    const getState = () => state
    const sideEffect = addProcess(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState)
    expect(_url1).toBe(url1)
    expect(_url2).toBe(url2)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(dispatch).toHaveBeenCalledWith({type: ADD_PROCESS,
        payload: {processID: 0, title: "some title", stageOrder: ""}})
})

it('should dispatch alert when addStageToStagesAry with tempQuestion ""', async () => {
    global.alert = jest.fn();

    const dispatch = jest.fn()
    const state = {
        processes: {
            newStageQuestion: "",
            newStageType: "mc",
            newStageMC: {mc1: "a", mc2: "b", mc3: "c"},
        }
    }

    const getState = () => state
    const sideEffect = addStageToStagesAry()
    await sideEffect(dispatch, getState)

    expect(alert).toHaveBeenCalledWith("Question cannot be blank")

})

it('should dispatch alert when addStageToStagesAry with tempType ""', async () => {
    global.alert = jest.fn();

    const dispatch = jest.fn()
    const state = {
        processes: {
            newStageQuestion: "some question",
            newStageType: "",
            newStageMC: {mc1: "a", mc2: "b", mc3: "c"},
        }
    }

    const getState = () => state
    const sideEffect = addStageToStagesAry()
    await sideEffect(dispatch, getState)

    expect(alert).toHaveBeenCalledWith("Type must be selected")

})

it('should dispatch alert when addStageToStagesAry with mc type and blank answer', async () => {
    global.alert = jest.fn();

    const dispatch = jest.fn()
    const state = {
        processes: {
            newStageQuestion: "some question",
            newStageType: "Multiple Choice",
            newStageMC: {mc1: "", mc2: "b", mc3: "c"},
        }
    }

    const getState = () => state
    const sideEffect = addStageToStagesAry()
    await sideEffect(dispatch, getState)

    expect(alert).toHaveBeenCalledWith("MC answers cannot be blank")

})

it('should dispatch ADD_STAGE when addStageToStagesAry with valid input, ' +
    'and not an edited stage', async () => {
    global.alert = jest.fn();

    const dispatch = jest.fn()
    const state = {
        processes: {
            newStageQuestion: "some question",
            newStageType: "Multiple Choice",
            newStageMC: {mc1: "a", mc2: "b", mc3: "c"},
            stagesAry: [
                {stageID: 0, processID: 0, stageOrder: 0, stageType: "text",
                    question: "some other question", mcOption1: "", mcOption2: "", mcOption3: ""},
                {stageID: 0, processID: 0, stageOrder: 1, stageType: "boolean",
                    question: "off the wall question", mcOption1: "", mcOption2: "", mcOption3: ""}
            ]
        }
    }

    const getState = () => state
    const sideEffect = addStageToStagesAry()
    await sideEffect(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith({type: ADD_STAGE,
        payload: {stageID: 0, processID: 0, stageOrder: 2, stageType: "Multiple Choice",
        question: "some question", mcOption1: "a", mcOption2: "b", mcOption3: "c"}})
})

it('should dispatch alert when addStageToStagesAry with valid input ' +
    'and an edited stage with bad response', async () => {
    global.alert = jest.fn();

    const dispatch = jest.fn()
    const state = {
        processes: {
            activityTask: "addEditStage",
            newStageQuestion: "some question",
            newStageType: "Multiple Choice",
            newStageMC: {mc1: "a", mc2: "b", mc3: "c"},
            processToViewIndex: 0,
            processesAry: [
                {processID: 0}
            ],
            stagesAry: [
                {stageID: 0, processID: 0, stageOrder: 0, stageType: "text",
                    question: "some other question", mcOption1: "", mcOption2: "", mcOption3: ""},
                {stageID: 1, processID: 0, stageOrder: 1, stageType: "boolean",
                    question: "off the wall question", mcOption1: "", mcOption2: "", mcOption3: ""}
            ]
        }
    }
    const tempType = state.processes.newStageType
    const tempAry = state.processes.stagesAry
    const tempQuestion = state.processes.newStageQuestion
    const tempMC = state.processes.newStageMC
    const tempStage = {
        stageID: 0, processID: 0, stageOrder: tempAry.length,
        stageType: tempType, question: tempQuestion,
        mcOption1: tempMC.mc1, mcOption2: tempMC.mc2,
        mcOption3: tempMC.mc3
    }

    const url = `http://localhost:8080/editStage?stageID=${tempStage.stageID}&processID=${tempStage.processID}&stageOrder=${tempStage.stageOrder}` +
        `&stageType=${tempStage.stageType}&question=${tempStage.question}&mcOption1=${tempStage.mcOption1}&mcOption2=${tempStage.mcOption2}` +
        `&mcOption3=${tempStage.mcOption3}`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({ok: false}))
    }

    const getState = () => state
    const sideEffect = addStageToStagesAry(mockFetch)
    await sideEffect(dispatch, getState)
    expect(_url).toBe(url)
    expect(alert).toHaveBeenCalledWith("Error adding stage")

})

it('should dispatch ADD_STAGE when addStageToStagesAry with valid input ' +
    'and an edited stage with good response', async () => {
    global.alert = jest.fn();

    const dispatch = jest.fn()
    const state = {
        processes: {
            activityTask: "addEditStage",
            newStageQuestion: "some question",
            newStageType: "Multiple Choice",
            newStageMC: {mc1: "a", mc2: "b", mc3: "c"},
            processToViewIndex: 0,
            processesAry: [
                {processID: 0}
            ],
            stagesAry: [
                {stageID: 0, processID: 0, stageOrder: 0, stageType: "text",
                    question: "some other question", mcOption1: "", mcOption2: "", mcOption3: ""},
                {stageID: 1, processID: 0, stageOrder: 1, stageType: "boolean",
                    question: "off the wall question", mcOption1: "", mcOption2: "", mcOption3: ""}
            ]
        }
    }
    const tempType = state.processes.newStageType
    const tempAry = state.processes.stagesAry
    const tempQuestion = state.processes.newStageQuestion
    const tempMC = state.processes.newStageMC
    const tempStage = {
        stageID: 0, processID: 0, stageOrder: tempAry.length,
        stageType: tempType, question: tempQuestion,
        mcOption1: tempMC.mc1, mcOption2: tempMC.mc2,
        mcOption3: tempMC.mc3
    }

    const url = `http://localhost:8080/editStage?stageID=${tempStage.stageID}&processID=${tempStage.processID}&stageOrder=${tempStage.stageOrder}` +
        `&stageType=${tempStage.stageType}&question=${tempStage.question}&mcOption1=${tempStage.mcOption1}&mcOption2=${tempStage.mcOption2}` +
        `&mcOption3=${tempStage.mcOption3}`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({ok: true}))
    }

    const getState = () => state
    const sideEffect = addStageToStagesAry(mockFetch)
    await sideEffect(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_STAGE,
        payload: {stageID: 0, processID: 0, stageOrder: 2, stageType: "Multiple Choice",
            question: "some question", mcOption1: "a", mcOption2: "b", mcOption3: "c"}})


})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when viewOneProcess with bad stages response', async () => {
    const process = {processID: 3}
    const index = 5
    const url = `http://localhost:8080/findAllStagesByProcessID?processID=${process.processID}`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({ok: false}))
    }

    const dispatch = jest.fn()
    const sideEffect = viewOneProcess(process, index, mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Error accessing stages")
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_FAILURE})
})

it('should dispatch SERVICE_START then VIEW_ONE_PROCESS_AND_STAGES_PAGE when viewOneProcess with good stages response', async () => {
    const process = {processID: 3}
    const index = 5
    const result = [
        {stageOrder: 3},
        {stageOrder: 1},
        {stageOrder: 2}]
    const url = `http://localhost:8080/findAllStagesByProcessID?processID=${process.processID}`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const sideEffect = viewOneProcess(process, index, mockFetch)
    await sideEffect(dispatch)

    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_ONE_PROCESS_AND_STAGES_PAGE,
        payload: {stagesAry: [
            {stageOrder: 1},
            {stageOrder: 2},
            {stageOrder: 3}],
            processToViewIndex: index}})
})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when viewAllFinished with bad processes response', async () => {
    const result = [
        {stageOrder: 3},
        {stageOrder: 1},
        {stageOrder: 2}]
    const url = `http://localhost:8081/findAllFinishedProcesses`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const sideEffect = viewAllFinished(mockFetch)
    await sideEffect(dispatch)

    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Error accessing processes")
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_FAILURE})
})

it('should dispatch SERVICE_START then VIEW_ALL_FINISHED_PAGE when viewAllFinished with good processes response', async () => {
    const result = [
        {stageOrder: 3},
        {stageOrder: 1},
        {stageOrder: 2}]
    const url = `http://localhost:8081/findAllFinishedProcesses`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const sideEffect = viewAllFinished(mockFetch)
    await sideEffect(dispatch)

    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_ALL_FINISHED_PAGE,
        payload: {processesAry: [
                {stageOrder: 3},
                {stageOrder: 1},
                {stageOrder: 2}]}})
})

it('should dispatch SERVICE_START then SERVICE_FAILURE and alert when viewOneFinishedProcess with bad stages response', async () => {
    const process = {token: 5}
    const index = 2
    const result = [
        {stageOrder: 3},
        {stageOrder: 1},
        {stageOrder: 2}]
    const url = `http://localhost:8081/findAllFinishedStagesByToken?token=${process.token}`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const sideEffect = viewOneFinishedProcess(process, index, mockFetch)
    await sideEffect(dispatch)

    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(alert).toHaveBeenCalledWith("Error accessing stages")
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_FAILURE})
})

it('should dispatch SERVICE_START then VIEW_ONE_FINISHED_PROCESS_PAGE when viewOneFinishedProcess with good stages response', async () => {
    const process = {token: 5}
    const index = 2
    const result = [
        {stageOrder: 3},
        {stageOrder: 1},
        {stageOrder: 2}]
    const url = `http://localhost:8081/findAllFinishedStagesByToken?token=${process.token}`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const sideEffect = viewOneFinishedProcess(process, index, mockFetch)
    await sideEffect(dispatch)

    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SERVICE_START})
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_ONE_FINISHED_PROCESS_PAGE,
        payload: {stagesAry: result,
                processToViewIndex: index}})
})


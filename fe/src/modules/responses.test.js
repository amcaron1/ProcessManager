import reducer, {
    BACK_OUTTA_FOLLOW_PROCESS,
    BACK_OUTTA_VIEW_FOLLOWER_PROCESSES,
    EDITOR_MENU_PAGE,
    FINISHED_PROCESS_PAGE,
    FOLLOW_PROCESS_PAGE,
    followProcess,
    nextStage,
    PRE_FOLLOW_PROCESS_PAGE,
    RESET_AFTER_PROCESS_SAVE,
    SAVE_FOLLOW_PROCESS,
    SAVE_LAST_STAGE,
    SAVE_NEXT_STAGE,
    SAVE_TOKEN,
    saveProcess,
    saveStage, STAGE_ERROR,
    UPDATE_BOOLEAN_ANSWER,
    UPDATE_MC_ANSWER,
    UPDATE_TEXT_ANSWER,
    VIEW_FOLLOWER_PROCESSES_PAGE,
    viewFollowerProcesses
} from "./responses";
import {
    ADD_PROCESS, ADD_STAGE,
    addProcess, addStageToNewStagesAry, BACK,
    deleteProcess,
    SERVICE_FAILURE,
    SERVICE_START,
    VIEW_ALL_PROCESSES_PAGE, VIEW_ONE_PROCESS_AND_STAGES_PAGE,
    viewAllProcesses, viewOneProcess
} from "./processes";

it('should start with booleanAnswer ""', () => {
    const state = reducer()
    expect(state.booleanAnswer).toBe("")
})

it('should start with defaultCheckedValue false', () => {
    const state = reducer()
    expect(state.defaultCheckedValue).toBe(false)
})

it('should start with followerTask null', () => {
    const state = reducer()
    expect(state.followerTask).toBe(null)
})

it('should start with mcAnswer ""', () => {
    const state = reducer()
    expect(state.mcAnswer).toBe("")
})

it('should start with each processesAry []', () => {
    const state = reducer()
    expect(state.processesAry).toStrictEqual([])
})

it('should start with processToFollowIndex -1', () => {
    const state = reducer()
    expect(state.processToFollowIndex).toBe(-1)
})

it('should start with stageQuestion ""', () => {
    const state = reducer()
    expect(state.stageQuestion).toBe("")
})

it('should start with stagesAry []', () => {
    const state = reducer()
    expect(state.stagesAry).toStrictEqual([])
})

it('should start with stageToFollowIndex -1', () => {
    const state = reducer()
    expect(state.stageToFollowIndex).toBe(-1)
})

it('should start with stageType ""', () => {
    const state = reducer()
    expect(state.stageType).toBe("")
})

it('should start with textAnswer "', () => {
    const state = reducer()
    expect(state.textAnswer).toBe("")
})

it('should start with token -1', () => {
    const state = reducer()
    expect(state.token).toBe(-1)
})

it('should set followerTask and processesAry when VIEW_FOLLOWER_PROCESSES_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: VIEW_FOLLOWER_PROCESSES_PAGE,  payload: {processesAry: ["a","b"]}})
    expect(state.followerTask).toBe("viewFollowerProcesses")
    expect(state.processesAry).toStrictEqual(["a","b"])
})

it('should set followerTask and processesAry when BACK_OUTTA_VIEW_FOLLOWER_PROCESSES_PAGE', () => {
    const initialState = reducer()
    initialState.followerTask = "some task"
    initialState.processesAry = ["a", "b"]
    const state = reducer(initialState, {type: BACK_OUTTA_VIEW_FOLLOWER_PROCESSES})
    expect(state.followerTask).toBe(null)
    expect(state.processesAry).toStrictEqual([])
})

it('should set processToFollowIndex and stagesAry when PRE_FOLLOW_PROCESS_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: PRE_FOLLOW_PROCESS_PAGE, payload: {processToFollowIndex: 5, stagesAry: ["a", "b"]}})
    expect(state.processToFollowIndex).toBe(5)
    expect(state.stagesAry).toStrictEqual(["a", "b"])
})

it('should set textAnswer when UPDATE_TEXT_ANSWER', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: UPDATE_TEXT_ANSWER, payload: {textAnswer: "some answer"}})
    expect(state.textAnswer).toBe("some answer")
})

it('should set booleanAnswer when UPDATE_BOOLEAN_ANSWER', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: UPDATE_BOOLEAN_ANSWER, payload: {booleanAnswer: "true"}})
    expect(state.booleanAnswer).toBe("true")
})

it('should set mcAnswer when UPDATE_MC_ANSWER', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: UPDATE_MC_ANSWER, payload: {mcAnswer: "some answer"}})
    expect(state.mcAnswer).toBe("some answer")
})

it('should set booleanAnswer, followerTask, mcAnswer, stageQuestion, stageToFollowIndex,' +
    'stageType, and textAnswer when SAVE_NEXT_STAGE', () => {
    const initialState = reducer()
    initialState.booleanAnswer = "true"
    initialState.mcAnswer = "some answer"
    initialState.textAnswer = "some other answer"
    const state = reducer(initialState, {type: FOLLOW_PROCESS_PAGE, payload:
            {stageQuestion: "some question", stageToFollowIndex: 5, stageType: "Text"}})
    expect(state.booleanAnswer).toBe("")
    expect(state.defaultCheckedValue).toBe(false)
    expect(state.followerTask).toBe("followProcess")
    expect(state.mcAnswer).toBe("")
    expect(state.stageQuestion).toBe("some question")
    expect(state.stageToFollowIndex).toBe(5)
    expect(state.stageType).toBe("Text")
    expect(state.textAnswer).toBe("")
})

it('should set token when SAVE_TOKEN', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: SAVE_TOKEN, payload: {token: 7}})
    expect(state.token).toBe(7)
})

it('should set booleanAnswer, followerTask, mcAnswer, processToFollowIndex, stageQuestion, stagesAry' +
    'stageToFollowIndex, stageType, textAnswer, and token when RESET_AFTER_PROCESS_SAVE', () => {
    const initialState = reducer()
    initialState.booleanAnswer = "true"
    initialState.mcAnswer = "some answer"
    initialState.processToFollowIndex = 5
    initialState.stageQuestion = "some question"
    initialState.stagesAry = ["a","b"]
    initialState.stageToFollowIndex = 6
    initialState.stageType = "Text"
    initialState.textAnswer = "some other answer"
    initialState.token = 7
    const state = reducer(initialState, {type: RESET_AFTER_PROCESS_SAVE})
    expect(state.booleanAnswer).toBe("")
    expect(state.followerTask).toBe("viewFollowerProcesses")
    expect(state.mcAnswer).toBe("")
    expect(state.processToFollowIndex).toBe(-1)
    expect(state.stageQuestion).toBe("")
    expect(state.stagesAry).toStrictEqual([])
    expect(state.stageToFollowIndex).toBe(-1)
    expect(state.stageType).toBe(null)
    expect(state.textAnswer).toBe("")
    expect(state.token).toBe(-1)
})

it('should set booleanAnswer, followerTask, mcAnswer, processToFollowIndex, stageQuestion, stagesAry' +
    'stageToFollowIndex, stageType, textAnswer, and token when BACK_OUTTA_FOLLOW_PROCESS', () => {
    const initialState = reducer()
    initialState.booleanAnswer = "true"
    initialState.mcAnswer = "some answer"
    initialState.processToFollowIndex = 5
    initialState.stageQuestion = "some question"
    initialState.stagesAry = ["a","b"]
    initialState.stageToFollowIndex = 6
    initialState.stageType = "Text"
    initialState.textAnswer = "some other answer"
    initialState.token = 7
    const state = reducer(initialState, {type: BACK_OUTTA_FOLLOW_PROCESS})
    expect(state.booleanAnswer).toBe("")
    expect(state.followerTask).toBe("viewFollowerProcesses")
    expect(state.mcAnswer).toBe("")
    expect(state.processToFollowIndex).toBe(-1)
    expect(state.stageQuestion).toBe("")
    expect(state.stagesAry).toStrictEqual([])
    expect(state.stageToFollowIndex).toBe(-1)
    expect(state.stageType).toBe(null)
    expect(state.textAnswer).toBe("")
    expect(state.token).toBe(-1)
})

it('should set follwerTask when FINISHED_PROCESS_PAGE', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: FINISHED_PROCESS_PAGE})
    expect(state.followerTask).toBe("finishedProcess")
})

it('should set follwerTask when STAGE_ERROR', () => {
    const initialState = reducer()
    const state = reducer(initialState, {type: STAGE_ERROR})
    expect(state.followerTask).toBe("followProcess")
})

it('should dispatch alert when viewFollowerProcesses with bad response', async () => {
    const url = `http://localhost:8080/findAllProcesses`
    let _url
    global.alert = jest.fn();

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({ok: false}))
    }

    const dispatch = jest.fn()
    const sideEffect = viewFollowerProcesses(mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(alert).toHaveBeenCalledWith("Error accessing processes")
})

it('should dispatch VIEW_ALL_PROCESSES_PAGE when viewFollowerProcesses with good response', async () => {
    const result = 'some results'
    const url = `http://localhost:8080/findAllProcesses`
    let _url

    // Mock fetch
    // Returns a promise
    // Need to pass url
    // _url = url for query after test
    // Promise is an object for handling an async event
    // async event is an event that will happen in future
    // Do not wnat to wait for it
    // Promise stores the anonymous function that has resolve as an argument
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
    const sideEffect = viewFollowerProcesses(mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_FOLLOWER_PROCESSES_PAGE, payload: {processesAry: result}})
})

it('should dispatch alert when findAllStagesByProcessID with bad stages response', async () => {
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
    const sideEffect = followProcess(process, index, mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(alert).toHaveBeenCalledWith("Error accessing stages")
})

it('should dispatch PRE_FOLLOW_PROCESS_PAGE when findAllStagesByProcessID with good stages response', async () => {
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
    const sideEffect = followProcess(process, index, mockFetch)
    await sideEffect(dispatch)

    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: PRE_FOLLOW_PROCESS_PAGE,
        payload: {stagesAry: [
                {stageOrder: 1},
                {stageOrder: 2},
                {stageOrder: 3}],
            processToFollowIndex: index}})
})

it('should dispatch FOLLOW_PROCESS_PAGE when nextStage with index < tempAry.length - 1', async () => {
    const dispatch = jest.fn()
    const state = {
        responses: {
            stagesAry: [{question: "Sup?", stageType: "Text"}, {question: "What?", stageType: "True/False"}],
            stageToFollowIndex: 0}}

    const getState = () => state
    const sideEffect = nextStage()
    await sideEffect(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith({type: FOLLOW_PROCESS_PAGE,
        payload: {
            stageQuestion: "What?",
            stageToFollowIndex: 1,
            stageType: "True/False"
    }})
})

it('should dispatch FINISHED_PROCESS_PAGE when nextStage with index >= tempAry.length - 1', async () => {
    const dispatch = jest.fn()
    const state = {
        responses: {
            stagesAry: [{question: "Sup?", stageType: "Text"}, {question: "What?", stageType: "True/False"}],
            stageToFollowIndex: 1}}

    const getState = () => state
    const sideEffect = nextStage()
    await sideEffect(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith({type: FINISHED_PROCESS_PAGE})

})

it('should dispatch alert when saveStage with answers ""', async () => {
    const result = 11
    const token = 5
    const question = "some question"
    const stageType = "Text"
    const textAnswer = ""
    const booleanAnswer = ""
    const mcAnswer = ""
    const stageOrder = 0
    const url1 = `http://localhost:8081/saveFirstFinishedStage?question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    const url2 = `http://localhost:8081/saveFinishedStage?token=${token}&question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url1) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url2) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const dispatch1 = jest.fn()
    const state = {
        responses: {
            stagesAry: [
                {stageOrder: 0},
                {stageOrder: 1}],
            stageToFollowIndex: 0,
            token: 5,
            stageQuestion: "some question",
            stageType: "Text",
            textAnswer: "",
            booleanAnswer: "",
            mcAnswer: ""}}

    const getState = () => state
    const sideEffect = saveStage(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState, dispatch1)
    // expect(_url1).toBe(url1)
    // expect(_url2).toBe(url2)
    expect(alert).toHaveBeenCalledWith("Must record an answer to proceed")
})

it('should dispatch alert when saveStage with bad ' +
    'first save response', async () => {
    const result = 11
    const token = 5
    const question = "some question"
    const stageType = "Text"
    const textAnswer = "some answer"
    const booleanAnswer = ""
    const mcAnswer = ""
    const stageOrder = 0
    const url1 = `http://localhost:8081/saveFirstFinishedStage?question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    const url2 = `http://localhost:8081/saveFinishedStage?token=${token}&question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url1) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url2) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const dispatch1 = jest.fn()
    const state = {
        responses: {
            stagesAry: [
                {stageOrder: 0},
                {stageOrder: 1}],
            stageToFollowIndex: 0,
            token: 5,
            stageQuestion: "some question",
            stageType: "Text",
            textAnswer: "some answer",
            booleanAnswer: "",
            mcAnswer: ""}}

    const getState = () => state
    const sideEffect = saveStage(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState, dispatch1)
    expect(_url1).toBe(url1)
    // expect(_url2).toBe(url2)
    expect(alert).toHaveBeenCalledWith("Error saving stage")
})

it('should dispatch SAVE_TOKEN when saveStage with good ' +
    'first save response', async () => {
    const result = 11
    const token = 5
    const question = "some question"
    const stageType = "Text"
    const textAnswer = "some answer"
    const booleanAnswer = ""
    const mcAnswer = ""
    const stageOrder = 0
    const url1 = `http://localhost:8081/saveFirstFinishedStage?question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    const url2 = `http://localhost:8081/saveFinishedStage?token=${token}&question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url1) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url2) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {
        responses: {
            stagesAry: [
                {stageOrder: 0},
                {stageOrder: 1}],
            stageToFollowIndex: 0,
            token: 5,
            stageQuestion: "some question",
            stageType: "Text",
            textAnswer: "some answer",
            booleanAnswer: "",
            mcAnswer: ""}}

    const getState = () => state
    const sideEffect = saveStage(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState)
    expect(_url1).toBe(url1)
    // expect(_url2).toBe(url2)
    expect(dispatch).toHaveBeenCalledWith({type: SAVE_TOKEN, payload: {token: result}})
    expect(typeof dispatch.mock.calls[1][0]).toBe('function')
})

it('should dispatch alert when saveStage with bad ' +
    'second save response', async () => {
    const result = 11
    const token = 5
    const question = "some question"
    const stageType = "Text"
    const textAnswer = "some answer"
    const booleanAnswer = ""
    const mcAnswer = ""
    const stageOrder = 1
    const url1 = `http://localhost:8081/saveFirstFinishedStage?question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    const url2 = `http://localhost:8081/saveFinishedStage?token=${token}&question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url1) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url2) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const dispatch1 = jest.fn()
    const state = {
        responses: {
            stagesAry: [
                {stageOrder: 0},
                {stageOrder: 1}],
            stageToFollowIndex: 1,
            token: 5,
            stageQuestion: "some question",
            stageType: "Text",
            textAnswer: "some answer",
            booleanAnswer: "",
            mcAnswer: ""}}

    const getState = () => state
    const sideEffect = saveStage(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState,dispatch1)
    // expect(_url1).toBe(url1)
    expect(_url2).toBe(url2)
    expect(alert).toHaveBeenCalledWith("Error saving stage")
})

it('should dispatch nextStage with token when saveStage with good ' +
    'second save response', async () => {
    const result = 11
    const token = 5
    const question = "some question"
    const stageType = "Text"
    const textAnswer = "some answer"
    const booleanAnswer = ""
    const mcAnswer = ""
    const stageOrder = 1
    const url1 = `http://localhost:8081/saveFirstFinishedStage?question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    const url2 = `http://localhost:8081/saveFinishedStage?token=${token}&question=${question}&stageType=${stageType}` +
        `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
    let _url1
    let _url2
    global.alert = jest.fn();

    const mockFetch1 = (url1) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const mockFetch2 = (url2) => {
        _url2 = url2
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {
        responses: {
            stagesAry: [
                {stageOrder: 0},
                {stageOrder: 1}],
            stageToFollowIndex: 1,
            token: 5,
            stageQuestion: "some question",
            stageType: "Text",
            textAnswer: "some answer",
            booleanAnswer: "",
            mcAnswer: ""}}

    const getState = () => state
    const sideEffect = saveStage(mockFetch1, mockFetch2)
    await sideEffect(dispatch, getState)
    // expect(_url1).toBe(url1)
    expect(_url2).toBe(url2)
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})

it('should dispatch alert when saveProcess with bad response', async () => {
    const result = "some result"
    const token = 11
    const title = "some title"
    const url1 = `http://localhost:8081/saveFinishedProcess?token=${token}&title=${title}`
    let _url1
    global.alert = jest.fn();

    const mockFetch1 = (url) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {
        responses: {
            processesAry: [{title: "some title"}],
            processToFollowIndex: 0,
            token: 5}}
    const getState = () => state
    const sideEffect = saveProcess(mockFetch1)
    await sideEffect(dispatch, getState)
    expect(alert).toHaveBeenCalledWith("Error saving process")
})

it('should dispatch RESET_AFTER_PROCESS_SAVE when saveProcess with godd response', async () => {
    const result = "some result"
    const token = 11
    const title = "some title"
    const url1 = `http://localhost:8081/saveFinishedProcess?token=${token}&title=${title}`
    let _url1
    global.alert = jest.fn();

    const mockFetch1 = (url) => {
        _url1 = url1
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(resolve => resolve(result))}))
    }

    const dispatch = jest.fn()
    const state = {
        responses: {
            processesAry: [{title: "some title"}],
            processToFollowIndex: 0,
            token: 5}}
    const getState = () => state
    const sideEffect = saveProcess(mockFetch1)
    await sideEffect(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith({type: RESET_AFTER_PROCESS_SAVE})
})

export const VIEW_FOLLOWER_PROCESSES_PAGE = 'responses/VIEW_FOLLOWER_PROCESSES_PAGE'
export const BACK_OUTTA_VIEW_FOLLOWER_PROCESSES = 'responses/BACK_OUTTA_VIEW_FOLLOWER_PROCESSES'
export const PRE_FOLLOW_PROCESS_PAGE = 'responses./PRE_FOLLOW_PROCESS_PAGE'
export const UPDATE_TEXT_ANSWER = 'responses./UPDATE_TEXT_ANSWER'
export const UPDATE_BOOLEAN_ANSWER = 'responses./UPDATE_BOOLEAN_ANSWER'
export const UPDATE_MC_ANSWER = 'responses./UPDATE_MC_ANSWER'
export const FOLLOW_PROCESS_PAGE = 'responses./FOLLOW_PROCESS_PAGE'
export const SAVE_TOKEN = 'responses./SAVE_TOKEN'
export const RESET_AFTER_PROCESS_SAVE = 'responses./RESET_AFTER_PROCESS_SAVE'
export const BACK_OUTTA_FOLLOW_PROCESS = 'responses./BACK_OUTTA_FOLLOW_PROCESS'
export const FINISHED_PROCESS_PAGE = 'responses./FINISHED_PROCESS_PAGE'
export const STAGE_ERROR = 'responses./STAGE_ERROR'



const initialState = {
    booleanAnswer: "",
    defaultCheckedValue: false,
    followerTask: null,
    mcAnswer: "",
    processesAry: [],
    processToFollowIndex: -1,
    stageQuestion: "",
    stagesAry: [],
    stageToFollowIndex: -1,
    stageType: "",
    textAnswer: "",
    token: -1
}

export default function reducer(state = initialState, action) {


    switch (action?.type) {
        case VIEW_FOLLOWER_PROCESSES_PAGE:
            return {
                ...state,
                followerTask: "viewFollowerProcesses",
                processesAry: action.payload.processesAry
            }

        case BACK_OUTTA_VIEW_FOLLOWER_PROCESSES:
            return {
                ...state,
                followerTask: null,
                processesAry: []

            }
        case PRE_FOLLOW_PROCESS_PAGE:
            return {
                ...state,
                processToFollowIndex: action.payload.processToFollowIndex,
                stagesAry: action.payload.stagesAry
            }

        case UPDATE_TEXT_ANSWER:
            return {
                ...state,
                textAnswer: action.payload.textAnswer
            }

        case UPDATE_BOOLEAN_ANSWER:
            return {
                ...state,
                booleanAnswer: action.payload.booleanAnswer
            }

        case UPDATE_MC_ANSWER:
            return {
                ...state,
                    mcAnswer: action.payload.mcAnswer
            }

        case FOLLOW_PROCESS_PAGE:
            return {
                ...state,
                booleanAnswer: "",
                defaultCheckedValue: false,
                followerTask: "followProcess",
                mcAnswer: "",
                stageQuestion: action.payload.stageQuestion,
                stageToFollowIndex: action.payload.stageToFollowIndex,
                stageType: action.payload.stageType,
                textAnswer: "",
            }

        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload.token
            }

        case RESET_AFTER_PROCESS_SAVE:
            return {
                ...state,
                booleanAnswer: "",
                followerTask: "viewFollowerProcesses",
                mcAnswer: "",
                processToFollowIndex: -1,
                stageQuestion: "",
                stagesAry: [],
                stageToFollowIndex: -1,
                stageType: null,
                textAnswer: "",
                token: -1,
            }
        case BACK_OUTTA_FOLLOW_PROCESS:
            return {
                ...state,
                booleanAnswer: "",
                followerTask: "viewFollowerProcesses",
                mcAnswer: "",
                processToFollowIndex: -1,
                stageQuestion: "",
                stagesAry: [],
                stageToFollowIndex: -1,
                stageType: null,
                textAnswer: "",
                token: -1,
            }

        case FINISHED_PROCESS_PAGE:
            return {
                ...state,
                followerTask: "finishedProcess",
            }
        case STAGE_ERROR:
            return {
                ...state,
                followerTask: "followProcess",
            }
        default:
            return {...state}
    }
}

export function viewFollowerProcesses(_fetch=fetch) {
    return async function sideEffect(dispatch) {
        const url = `http://localhost:8082/findAllProcesses`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: VIEW_FOLLOWER_PROCESSES_PAGE, payload: {processesAry: result}})
        } else {
            alert("Error accessing processes")
        }
    }
}

export function followProcess(process, index, _fetch=fetch) {
    return async function sideEffect(dispatch) {
        const url = `http://localhost:8082/findAllStagesByProcessID?processID=${process.processID}`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            result.sort(function(a, b) {return a.stageOrder - b.stageOrder})
            dispatch({type: PRE_FOLLOW_PROCESS_PAGE, payload: {stagesAry: result, processToFollowIndex: index}})
            dispatch(nextStage())
        } else {
            alert("Error accessing stages")
        }
    }
}

export function nextStage() {
    return async function sideEffect(dispatch, getState) {
        const state = getState()
        const tempAry = state.responses.stagesAry
        let index = state.responses.stageToFollowIndex
        let type
        let question
        if (index < tempAry.length - 1) {
            index++
            type = tempAry[index].stageType
            question = tempAry[index].question
            dispatch({type: FOLLOW_PROCESS_PAGE, payload: {stageQuestion: question, stageToFollowIndex: index, stageType: type}})
        }
        else {
            type = null
            dispatch({type: FINISHED_PROCESS_PAGE})
        }
    }
}

export function saveStage(_fetch1=fetch, _fetch2=fetch) {
    return async function sideEffect(dispatch, getState) {
        const state = getState()
        const tempAry = state.responses.stagesAry
        const index = state.responses.stageToFollowIndex
        const token = state.responses.token
        const question = state.responses.stageQuestion
        const stageType = state.responses.stageType
        const textAnswer = state.responses.textAnswer
        const booleanAnswer = state.responses.booleanAnswer
        const mcAnswer = state.responses.mcAnswer
        const stageOrder = tempAry[index].stageOrder

        if (textAnswer === "" && booleanAnswer === "" && mcAnswer === "") {
            alert("Must record an answer to proceed")
            dispatch({type: STAGE_ERROR})
        }
        else {
            if (index === 0) {
                // first save
                const url1 = `http://localhost:8081/saveFirstFinishedStage?question=${question}&stageType=${stageType}` +
                    `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
                const response = await _fetch1(url1)
                if (response.ok) {
                    const result = await response.json()
                    dispatch({type: SAVE_TOKEN, payload: {token: result}})
                    dispatch(nextStage())
                } else {
                    alert("Error saving stage")
                }
            } else {
                // regular save
                const url2 = `http://localhost:8081/saveFinishedStage?token=${token}&question=${question}&stageType=${stageType}` +
                    `&textAnswer=${textAnswer}&booleanAnswer=${booleanAnswer}&mcAnswer=${mcAnswer}&stageOrder=${stageOrder}`
                const response = await _fetch2(url2)
                if (response.ok) {
                    dispatch(nextStage())
                } else {
                    alert("Error saving stage")
                }
            }
        }
    }
}

export function saveProcess(_fetch=fetch) {
    return async function sideEffect(dispatch, getState) {
        const state = getState()
        const tempAry = state.responses.processesAry
        const index = state.responses.processToFollowIndex
        const token = state.responses.token
        const title = tempAry[index].title

        const url = `http://localhost:8081/saveFinishedProcess?token=${token}&title=${title}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: RESET_AFTER_PROCESS_SAVE})
        } else {
            alert("Error saving process")
        }
    }
}





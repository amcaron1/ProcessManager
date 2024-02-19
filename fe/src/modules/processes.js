export const EDITOR_MENU_PAGE = 'processes/MAIN_EDITOR_PAGE'
export const FOLLOWER_MENU_PAGE = 'processes/MAIN_FOLLOWER_PAGE'
export const SERVICE_START = 'processes/SERVICE_START'
export const SERVICE_FAILURE = 'processes/SERVICE_FAILURE'
export const VIEW_ALL_PROCESSES_PAGE = 'processes/VIEW_ALL_PROCESSES_PAGE'
export const BACK = 'processes/BACK'
export const MAIN_MENU_PAGE = 'processes/MAIN_MENU_PAGE'
export const ADD_PROCESS_PAGE = 'pocesses/ADD_PROCESS_PAGE'
export const ADD_STAGE_PAGE = 'pocesses/ADD_STAGE_PAGE'
export const CANCEL_ADD_PROCESS = 'pocesses/CANCEL_ADD_PROCESS'
export const ADD_STAGE = 'pocesses/ADD_STAGE'
export const CANCEL_ADD_STAGE = 'pocesses/CANCEL_ADD_STAGE'
export const UPDATE_PROCESS_TITLE = 'pocesses/UPDATE_PROCESS_TITLE'
export const UPDATE_MC = 'pocesses/UPDATE_MC'
export const UPDATE_STAGE_QUESTION = 'pocesses/UPDATE_STAGE_QUESTION'
export const UPDATE_STAGE_TYPE = 'pocesses/UPDATE_STAGE_TYPE'
export const ADD_PROCESS = 'pocesses/ADD_PROCESS'
export const VIEW_ONE_PROCESS_AND_STAGES_PAGE = 'processes/VIEW_ONE_PROCESS_AND_STAGES_PAGE'
export const BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE = 'processes/BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE'
export const BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE = 'processes/BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE'
export const BACK_OUTTA_VIEW_ALL_FINISHED_PAGE = 'processes./BACK_OUTTA_VIEW_ALL_FINISHED_PAGE'
export const VIEW_ALL_FINISHED_PAGE = 'processes./VIEW_ALL_FINISHED_PAGE'
export const VIEW_ONE_FINISHED_PROCESS_PAGE = 'processes./VIEW_ONE_FINISHED_PROCESS_PAGE'
export const BACK_OUTTA_VIEW_ONE_FINISHED_PROCESS_PAGE = 'processes./BACK_OUTTA_VIEW_ONE_FINISHED_PROCESS_PAGE'
export const EDIT_PROCESS_PAGE = 'processes./EDIT_PROCESS_PAGE'
export const CANCEL_EDIT_PROCESS = 'processes./CANCEL_EDIT_PROCESS'
export const EDIT_PROCESS = 'processes./EDIT_PROCESS'
export const EDIT_STAGE_PAGE = 'processes./EDIT_STAGE_PAGE'
export const CANCEL_EDIT_STAGE = 'processes./CANCEL_EDIT_STAGE'
export const EDIT_STAGE = 'processes./EDIT_STAGE'
export const DELETE_STAGE = 'processes./DELETE_STAGE'
export const REORDER_STAGES = 'processes./COMPLETE_REORDER_STAGE'
export const ADD_EDIT_STAGE_PAGE = 'processes./REORDER_STAGES'




const initialState = {
    activityTask: null,
    displayTitle: "",
    mcHidden: true,
    newProcessTitle: "",
    newStageMC: {mc1: "", mc2: "", mc3: ""},
    newStageQuestion: "",
    newStagesAry: [],
    newStageType: "",
    processesAry: [],
    processToEdit: {processID: -1, title: "", stageOrder: ""},
    processToViewIndex: -1,
    stagesAry: [],
    stageToEdit: {stageID: -1, processID: -1, stageOrder: -1, stageType: "", question: "",
        mcOption1: "", mcOption2: "", mcOption3: ""},
    userTask: null,
}



export default function reducer(state = initialState, action) {
    let tempTask = ""

    switch (action?.type) {
        case EDITOR_MENU_PAGE:
            return {
                ...state,
                userTask: "editor"
            }

        case FOLLOWER_MENU_PAGE:
            return {
                ...state,
                userTask: "follower"
            }

        case VIEW_ALL_PROCESSES_PAGE:
            return {
                ...state,
                activityTask: "viewAllProcesses",
                processesAry: action.payload.processesAry
            }

        case BACK_OUTTA_VIEW_ALL_PROCESSES_PAGE:
            return {
                ...state,
                activityTask: null,
                processesAry: []
            }

        case BACK:
            return {
                ...state,
                activityTask: action.payload.activityTask
            }

        case MAIN_MENU_PAGE:
            return {
                ...state,
                activityTask: null,
                userTask: null
            }

        case ADD_PROCESS_PAGE:
            return {
                ...state,
                activityTask: "addProcess"
            }

        case ADD_STAGE_PAGE:
            return {
                ...state,
                activityTask: "addStage"
            }

        case ADD_EDIT_STAGE_PAGE:
            return {
                ...state,
                activityTask: "addEditStage"
            }

        case CANCEL_ADD_PROCESS:
            return {
                ...state,
                activityTask: "viewAllProcesses",
                newProcessTitle: "",
                newStageMC: {mc1: "", mc2: "", mc3: ""},
                stagesAry: [],
                newStageQuestion: "",
                newStageType: ""
            }

        case ADD_STAGE:
            if (state.activityTask === "addEditStage") {
                tempTask = "viewOneProcessAndStages"
            }
            else {
                tempTask = "addProcess"
            }
            return {
                ...state,
                activityTask: tempTask,
                mcHidden: true,
                newStageMC: {mc1: "", mc2: "", mc3: ""},
                stagesAry: [...state.stagesAry, action.payload],
                newStageQuestion: "",
                newStageType: ""
            }

        // Don't reset newStagesAry because there are other stages in there
        case CANCEL_ADD_STAGE:
            if (state.activityTask === "addEditStage") {
                tempTask = "viewOneProcessAndStages"
            }
            else {
                tempTask = "addProcess"
            }
            return {
                ...state,
                activityTask: tempTask,
                mcHidden: true,
                newStageMC: {mc1: "", mc2: "", mc3: ""},
                newStageQuestion: "",
                newStageType: ""
            }

        case UPDATE_PROCESS_TITLE:
            return {
                ...state,
                newProcessTitle: action.payload.newProcessTitle,
            }

        case UPDATE_MC:
            return {
                ...state,
                newStageMC: {
                    mc1: action.payload.mc1,
                    mc2: action.payload.mc2,
                    mc3: action.payload.mc3
                }
            }

        case UPDATE_STAGE_QUESTION:
            return {
                ...state,
                newStageQuestion: action.payload.newStageQuestion
            }

        case UPDATE_STAGE_TYPE:
            if (action.payload.newStageType === "Multiple Choice")
                return {
                    ...state,
                    mcHidden: false,
                    newStageMC: {mc1: "", mc2: "", mc3: ""},
                    newStageType: action.payload.newStageType
                }
            else
                return {
                    ...state,
                    mcHidden: true,
                    newStageMC: {mc1: "", mc2: "", mc3: ""},
                    newStageType: action.payload.newStageType
                }

        case ADD_PROCESS:
            return {
                ...state,
                activityTask: "viewAllProcesses",
                newProcessTitle: "",
                stagesAry: [],
                processesAry: [...state.processesAry, action.payload],
            }

        case VIEW_ONE_PROCESS_AND_STAGES_PAGE:
            return {
                ...state,
                activityTask: "viewOneProcessAndStages",
                processToViewIndex: action.payload.processToViewIndex,
                stagesAry: action.payload.stagesAry
            }

        case BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE:
            return {
                ...state,
                activityTask: "viewAllProcesses",
                processToViewIndex: -1,
                stagesAry: []
            }

        case BACK_OUTTA_VIEW_ALL_FINISHED_PAGE:
            return {
                ...state,
                activityTask: null,
                processesAry: [],
                // mcHidden: false
            }

        case VIEW_ALL_FINISHED_PAGE:
            return {
                ...state,
                activityTask: "viewAllFinished",
                processesAry: action.payload.processesAry,
                // mcHidden: false
            }

        case VIEW_ONE_FINISHED_PROCESS_PAGE:
            return {
                ...state,
                activityTask: "viewOneFinished",
                stagesAry: action.payload.stagesAry,
                processToViewIndex: action.payload.processToViewIndex,
            }

        case BACK_OUTTA_VIEW_ONE_FINISHED_PROCESS_PAGE:
            return {
                ...state,
                activityTask: "viewAllFinished",
                processToViewIndex: -1,
                stagesAry: [],
            }

        case EDIT_PROCESS_PAGE:
            return {
                ...state,
                activityTask: "editProcess",
                displayTitle: action.payload.displayTitle,
                processToEdit: action.payload.processToEdit
            }

        case CANCEL_EDIT_PROCESS:
            return {
                ...state,
                activityTask: "viewOneProcessAndStages",
                displayTitle: "",
                newProcessTitle: "",
                processToEdit: {processID: -1, title: "", stageOrder: ""},
            }

        case EDIT_PROCESS:
            return {
                ...state,

                activityTask: "viewOneProcessAndStages",
                displayTitle: "",
                newProcessTitle: "",
                processesAry: action.payload.processesAry,
                processToEdit: {processID: -1, title: "", stageOrder: ""},
            }

        case EDIT_STAGE_PAGE:
            if (action.payload.stageToEdit.stageType === "Multiple Choice") {
                return {
                    ...state,
                    activityTask: "editStage",
                    mcHidden: false,
                    newStageMC: {
                        mc1: action.payload.stageToEdit.mcOption1,
                        mc2: action.payload.stageToEdit.mcOption2,
                        mc3: action.payload.stageToEdit.mcOption3,
                    },
                    newStageQuestion: action.payload.stageToEdit.question,
                    newStageType: action.payload.stageToEdit.stageType,
                    stageToEdit: action.payload.stageToEdit,
                }
            } else {
                return {
                    ...state,
                    activityTask: "editStage",
                    mcHidden: true,
                    newStageQuestion: action.payload.stageToEdit.question,
                    newStageType: action.payload.stageToEdit.stageType,
                    stageToEdit: action.payload.stageToEdit,
                }
            }

        case CANCEL_EDIT_STAGE:
            return {
                ...state,
                activityTask: "viewOneProcessAndStages",
                mcHidden: true,
                newStageMC: {mc1: "", mc2: "", mc3: ""},
                newStageQuestion: "",
                newStageType: "",
                stageToEdit: {stageID: -1, processID: -1, stageOrder: -1, stageType: "", question: "",
                    mcOption1: "", mcOption2: "", mcOption3: ""},
            }

        case EDIT_STAGE:
            return {
                ...state,
                activityTask: "viewOneProcessAndStages",
                mcHidden: true,
                newStageMC: {mc1: "", mc2: "", mc3: ""},
                newStageQuestion: "",
                newStageType: "",
                stagesAry: action.payload.stagesAry,
                stageToEdit: {stageID: -1, processID: -1, stageOrder: -1, stageType: "", question: "",
                    mcOption1: "", mcOption2: "", mcOption3: ""},
            }

        case DELETE_STAGE:
            return {
                ...state,
                activityTask: "viewOneProcessAndStages",
                stagesAry: action.payload.stagesAry,
            }

        case REORDER_STAGES:
            return {
                ...state,
                activityTask: "viewOneProcessAndStages",
                stagesAry: action.payload.stagesAry,
            }


        default:
            return {
                ...state,
            }
    }
}

export function viewAllProcesses(_fetch=fetch) {
    return async function sideEffect(dispatch) {
        dispatch({type: SERVICE_START})
        const url = `http://localhost:8082/findAllProcesses`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: VIEW_ALL_PROCESSES_PAGE, payload: {processesAry: result}})
        } else {
            alert("Error accessing processes")
            dispatch({type: SERVICE_FAILURE})
        }
    }
}

export function deleteProcess(processID, _fetch1=fetch, _fetch2=fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: SERVICE_START})
        const url = `http://localhost:8082/deleteProcess?processID=${processID}`
        const response = await _fetch1(url)
        if (response.ok) {
            const url = `http://localhost:8082/deleteAllByProcessID?processID=${processID}`
            const response = await _fetch2(url)
            if (response.ok) {
                const processesAry = getState().processes.processesAry
                let tempAry = processesAry.filter((process) => {
                    return process.processID !== processID
                })
                dispatch({type: VIEW_ALL_PROCESSES_PAGE, payload: {processesAry: tempAry}})
            } else {
                alert("Error deleting stages")
                dispatch({type: SERVICE_FAILURE})
            }
        } else {
            alert("Error deleting process")
            dispatch({type: SERVICE_FAILURE})
        }
    }
}

export function addProcess(_fetch1=fetch, _fetch2=fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: SERVICE_START})
        const state = getState()
        const tempTitle = state.processes.newProcessTitle
        let tempAry = state.processes.stagesAry
        if (tempTitle === "") {
            alert("Process title cannot be blank")
            dispatch({type: BACK, payload: {activityTask: "addProcess"}})
        }
        else {
            if (tempAry.length === 0) {
                alert("Must have at least one stage")
                dispatch({type: BACK, payload: {activityTask: "addProcess"}})
            }
            else {
                const tempOrder = ""
                const url1 = `http://localhost:8082/addProcess?title=${tempTitle}&stageOrder=${tempOrder}`
                const processResponse = await _fetch1(url1)
                if (processResponse.ok) {
                    const processResult = await processResponse.json()
                    const processID = processResult.processID
                    for (let i = 0; i < tempAry.length; i++) {
                        tempAry[i].processID = processID
                    }
                    const url2 = `http://localhost:2/addAllStages`
                    const stageResponse = await _fetch2(url2, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(tempAry)})
                    if (stageResponse.ok) {
                        dispatch({type: ADD_PROCESS, payload: processResult})
                    }
                    else {
                        alert("Error adding stages")
                        dispatch({type: SERVICE_FAILURE})
                    }
                } else {
                    alert("Error adding process")
                    dispatch({type: SERVICE_FAILURE})
                }
            }
        }
    }
}

export function addStageToStagesAry(_fetch=fetch) {
    return async function sideEffect(dispatch, getState) {
        const state = getState()
        const tempQuestion = state.processes.newStageQuestion
        if (tempQuestion === "") {
            alert("Question cannot be blank")
            dispatch({type: BACK, payload: {activityTask: "addStage"}})
        } else {
            const tempType = state.processes.newStageType
            if (tempType === "") {
                alert("Type must be selected")
                dispatch({type: BACK, payload: {activityTask: "addStage"}})
            } else {
                const tempMC = state.processes.newStageMC
                if (tempType === "Multiple Choice" && (tempMC.mc1 === "" || tempMC.mc2 === "" || tempMC.mc3 === "")) {
                    alert("MC answers cannot be blank")
                    dispatch({type: BACK, payload: {activityTask: "addStage"}})
                } else {
                    let tempAry = state.processes.stagesAry
                    const tempStage = {
                        stageID: 0, processID: 0, stageOrder: tempAry.length,
                        stageType: tempType, question: tempQuestion,
                        mcOption1: tempMC.mc1, mcOption2: tempMC.mc2,
                        mcOption3: tempMC.mc3
                    }
                    if (state.processes.activityTask === "addEditStage") {
                        const index = state.processes.processToViewIndex
                        tempStage.processID = state.processes.processesAry[index].processID
                        const url1 = `http://localhost:8082/editStage?stageID=${tempStage.stageID}&processID=${tempStage.processID}&stageOrder=${tempStage.stageOrder}` +
                            `&stageType=${tempStage.stageType}&question=${tempStage.question}&mcOption1=${tempStage.mcOption1}&mcOption2=${tempStage.mcOption2}` +
                            `&mcOption3=${tempStage.mcOption3}`
                        const response = await _fetch(url1)
                        if (response.ok) {
                            dispatch({type: ADD_STAGE, payload: tempStage})
                        }
                        else {
                            alert("Error adding stage")
                            dispatch({type: SERVICE_FAILURE})
                        }
                    }
                    else {
                            dispatch({type: ADD_STAGE, payload: tempStage})
                    }
                }
            }
        }
    }
}

export function viewOneProcess(process, index, _fetch=fetch) {
    return async function sideEffect(dispatch) {
        dispatch({type: SERVICE_START})
        const url = `http://localhost:8082/findAllStagesByProcessID?processID=${process.processID}`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            result.sort(function(a, b) {return a.stageOrder - b.stageOrder})
            dispatch({type: VIEW_ONE_PROCESS_AND_STAGES_PAGE, payload: {stagesAry: result, processToViewIndex: index}})
        } else {
            alert("Error accessing stages")
            dispatch({type: SERVICE_FAILURE})
        }
    }
}

export function viewAllFinished(_fetch=fetch) {
    return async function sideEffect(dispatch) {
        dispatch({type: SERVICE_START})
        const url = `http://localhost:8081/findAllFinishedProcesses`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: VIEW_ALL_FINISHED_PAGE, payload: {processesAry: result}})
        } else {
            alert("Error accessing processes")
            dispatch({type: SERVICE_FAILURE})
        }
    }
}

export function viewOneFinishedProcess(process, index, _fetch=fetch) {
    return async function sideEffect(dispatch) {
        dispatch({type: SERVICE_START})
        const url = `http://localhost:8081/findAllFinishedStagesByToken?token=${process.token}`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            result.sort(function(a, b) {return a.stageOrder - b.stageOrder})
            dispatch({type: VIEW_ONE_FINISHED_PROCESS_PAGE, payload: {stagesAry: result, processToViewIndex: index}})
        } else {
            alert("Error accessing stages")
            dispatch({type: SERVICE_FAILURE})
        }
    }
}

export function editProcess(_fetch=fetch) {
    return async function sideEffect(dispatch, getState) {
        const state = getState().processes
        const title = state.newProcessTitle
        const processID = state.processToEdit.processID
        const stageOrder = state.processToEdit.stageOrder
        const url = `http://localhost:8082/editProcess?processID=${processID}&title=${title}&stageOrder=${stageOrder}`
        const processResponse = await _fetch(url)
        if (processResponse.ok) {
            const processesAry = state.processesAry
            const index = processesAry.findIndex((process) => process.processID === processID)
            processesAry[index].title = title
            dispatch({type: EDIT_PROCESS, payload: {processesAry: processesAry}})
        } else {
            alert("Error saving process")
            dispatch({type: SERVICE_FAILURE})
        }
    }
}

export function editStage(_fetch=fetch) {
    return async function sideEffect(dispatch, getState) {
        const state = getState().processes
        const stageID = state.stageToEdit.stageID
        const processID = state.stageToEdit.processID
        const stageOrder = state.stageToEdit.stageOrder
        const stageType = state.newStageType
        const question = state.newStageQuestion
        const mcOption1 = state.newStageMC.mc1
        const mcOption2 = state.newStageMC.mc2
        const mcOption3 = state.newStageMC.mc3

        if (stageType === "Multiple Choice" && (mcOption1 === "" || mcOption2=== "" || mcOption3 === "")) {
            alert("MC answers cannot be blank")
            // dispatch({type: BACK, payload: {activityTask: "editStage"}})

        } else {

            const url = `http://localhost:8082/editStage?stageID=${stageID}&processID=${processID}&stageOrder=${stageOrder}` +
                `&stageType=${stageType}&question=${question}&mcOption1=${mcOption1}&mcOption2=${mcOption2}&mcOption3=${mcOption3}`
            const response = await _fetch(url)
            if (response.ok) {
                const result = await response.json()
                const stagesAry = state.stagesAry
                const index = stagesAry.findIndex((stage) => stage.stageID === stageID)
                stagesAry[index] = result
                dispatch({type: EDIT_STAGE, payload: {stagesAry: stagesAry}})
            } else {
                alert("Error editing stage")
                dispatch({type: SERVICE_FAILURE})
            }
        }
    }
}

export function deleteStage(stageID, _fetch1=fetch, _fetch2=fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: SERVICE_START})
        const stagesAry = getState().processes.stagesAry
        if (stagesAry.length === 1) {
            alert("Must delete entire process in order to delete the last stage")
            dispatch({type: SERVICE_FAILURE})
        }
        else {
            const url1 = `http://localhost:8082/deleteStage?stageID=${stageID}`
            const deleteResponse = await _fetch1(url1)
            if (deleteResponse.ok) {
                let tempAry = stagesAry.filter((stage) => {
                    return stage.stageID !== stageID
                })
                for (let i = 0; i < tempAry.length; i++) {
                    tempAry[i].stageOrder = i;
                }
                const url2 = `http://localhost:8082/addAllStages`
                const saveResponse = await _fetch2(url2, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tempAry)})
                if (saveResponse.ok) {
                    const result = await saveResponse.json()
                    result.sort(function(a, b) {return a.stageOrder - b.stageOrder})
                    dispatch({type: DELETE_STAGE, payload: {stagesAry: result}})
                }
                else {
                    alert("Error updating stages after stage delete")
                    dispatch({type: SERVICE_FAILURE})
                }
            } else {
                alert("Error deleting stage")
                dispatch({type: SERVICE_FAILURE})
            }
        }
    }
}

export function reorderStages(direction, stageOrder, _fetch=fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: SERVICE_START})
        const state = getState()
        let tempAry = state.processes.stagesAry
        if (direction === "up") {
            if (stageOrder >  0) {
                const tempStage = tempAry[stageOrder-1]
                tempAry[stageOrder-1] = tempAry[stageOrder]
                tempAry[stageOrder] = tempStage
                tempAry[stageOrder-1].stageOrder = stageOrder-1
                tempAry[stageOrder].stageOrder = stageOrder
                const url = `http://localhost:8082/addAllStages`
                const stageResponse = await _fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tempAry)})
                if (stageResponse.ok) {
                    dispatch({type: REORDER_STAGES, payload: {stagesAry: tempAry}})
                }
                else {
                    alert("Error updating stages after stage reorder")
                    dispatch({type: SERVICE_FAILURE})
                }
            }
        }
        else {
            if (stageOrder < tempAry.length - 1) {
                const tempStage = tempAry[stageOrder + 1]
                tempAry[stageOrder+1] = tempAry[stageOrder]
                tempAry[stageOrder] = tempStage
                tempAry[stageOrder+1].stageOrder = stageOrder+1
                tempAry[stageOrder].stageOrder = stageOrder
                const url = `http://localhost:8082/addAllStages`
                const stageResponse = await _fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tempAry)})
                if (stageResponse.ok) {
                    dispatch({type: REORDER_STAGES, payload: {stagesAry: tempAry}})
                }
                else {
                    alert("Error updating stages after stage reorder")
                    dispatch({type: SERVICE_FAILURE})
                }
            }
        }
    }
}



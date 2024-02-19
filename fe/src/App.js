import {useSelector} from "react-redux";
import "./App.css"
import MainMenu from "./components/main/MainMenu";
import EditorMenu from "./components/main/EditorMenu";
import FolloweMenu from "./components/main/FolloweMenu";
import ViewAllProcesses from "./components/editor/ViewAllProcesses";
import AddProcess from "./components/editor/AddProcess";
import AddStage from "./components/editor/AddStage";
import ViewOneProcessAndStages from "./components/editor/ViewOneProcessAndStages";
import ViewFollowerProcesses from "./components/follower/ViewFollowerProcesses";
import FinishedProcess from "./components/follower/FinishedProcess";
import FollowProcess from "./components/follower/FollowProcess";
import ViewFinishedProcesses from "./components/stalker/ViewFinishedProcesses";
import ViewOneFinishedProcess from "./components/stalker/ViewOneFinishedProcess";
import EditProcess from "./components/editor/EditProcess";
import EditStage from "./components/editor/EditStage";



export default function App({_useSelector=useSelector, MainMenuC=MainMenu, EditorMenuC=EditorMenu,
                            FollowerMenuC=FolloweMenu, ViewAllProcessesC=ViewAllProcesses, AddProcessC=AddProcess,
                            AddStageC=AddStage, ViewOneProcessAndStagesC=ViewOneProcessAndStages,
                            ViewFollowerProcessesC=ViewFollowerProcesses, FinishedProcessC=FinishedProcess,
                            FollowProcessC=FollowProcess, ViewFinishedProcessesC=ViewFinishedProcesses,
                            ViewOneFinishedProcessC=ViewOneFinishedProcess, EditProcessC=EditProcess, EditStageC=EditStage}) {

    const {userTask, activityTask, followerTask} = _useSelector((state) =>({
        userTask: state.processes.userTask,
        activityTask: state.processes.activityTask,
        followerTask: state.responses.followerTask,
    }))

    switch (userTask) {
        case "editor":
            switch (activityTask) {
                case "viewAllProcesses":
                    return (
                        <div>
                            <ViewAllProcessesC/>
                        </div>
                    )
                case "addProcess":
                    return (
                        <div>
                            <AddProcessC/>
                        </div>
                    )
                case "editProcess":
                    return (
                        <div>
                            <EditProcessC/>
                        </div>
                    )
                case "addStage":
                    return (
                        <div>
                            <AddStageC/>
                        </div>
                    )
                case "addEditStage":
                    return (
                        <div>
                            <AddStageC/>
                        </div>
                    )
                case "viewOneProcessAndStages":
                    return (
                        <div>
                            <ViewOneProcessAndStagesC/>
                        </div>
                    )
                case "viewAllFinished":
                    return (
                        <div>
                            <ViewFinishedProcessesC/>
                        </div>
                    )
                case "viewOneFinished":
                    return (
                        <div>
                            <ViewOneFinishedProcessC/>
                        </div>
                    )
                case "editStage":
                    return (
                        <div>
                            <EditStageC/>
                        </div>
                    )

                default:
                    return (
                            <EditorMenuC/>
                    )
            }
        case "follower":
            switch (followerTask) {
                case "viewFollowerProcesses":
                    return (
                        <div className={'m-4 d-flex justify-content-center'}>
                            <ViewFollowerProcessesC/>
                        </div>
                    )
                case "followProcess":
                    return (
                        <div className={'m-4 d-flex justify-content-center'}>
                            <FollowProcessC/>
                        </div>
                    )
                case "finishedProcess":
                    return (
                        <div className={'m-4 d-flex justify-content-center'}>
                            <FinishedProcessC/>
                        </div>
                    )

                default:
                    return (
                            <FollowerMenuC/>
                    )
            }
        default:
            return (
                    <MainMenuC/>
            )
    }
}


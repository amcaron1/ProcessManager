import {Button, Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {deleteStage, EDIT_STAGE_PAGE, reorderStages} from "../../modules/processes";

export default function StageWithButtons({stage, _useDispatch = useDispatch, _useSelector = useSelector}) {

    const dispatch = _useDispatch();

    let mcHidden = true
    if (stage.stageType === "Multiple Choice")
        mcHidden = false

    return (
        <Card className={"w-75"}>
            <Card.Header className={'d-flex justify-content-between mb-3 '}>
                <Button type={'button'} onClick={() => (dispatch(reorderStages("up", stage.stageOrder)))}
                        variant={"outline-dark"}>&#8593;</Button>
                <h5>Stage</h5>
                <Button type={'button'} onClick={() => (dispatch(reorderStages("down", stage.stageOrder)))}
                        variant={"outline-dark"}>&#8595;</Button>
            </Card.Header>

            <Card.Body>
                <div className={" ps-2 mb-1"}>
                    <p className={"mb-1"}>Question: {stage.question}</p>
                </div>

                <div className={" ps-2 mb-1"}>
                    <hr/>
                    <p className={"mb-1"}>Stage Type: {stage.stageType}</p>
                </div>

                <div hidden={mcHidden} className={" ps-2 mb-1"}>
                    <hr/>
                    <p className={"mb-1"}>MC Answer1: {stage.mcOption1}</p>
                    <p className={"mb-2"}>MC Answer2: {stage.mcOption2}</p>
                    <p className={"mb-3"}>MC Answer3: {stage.mcOption3}</p>
                </div>
            </Card.Body>

            <Card.Footer className={'d-flex justify-content-between'}>
                <Button type={'button'} onClick={() => (dispatch(deleteStage(stage.stageID)))}
                        variant={"danger"}>Delete</Button>
                <Button type={'button'} onClick={() => dispatch({type: EDIT_STAGE_PAGE, payload: {stageToEdit: stage}})}
                        variant={"primary"}>&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;</Button>
            </Card.Footer>
        </Card>

    )
}

import {Button, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {viewOneFinishedProcess} from "../../modules/processes";

export default function FinishedProcess({process, index, _useDispatch = useDispatch, _useSelector=useSelector}) {

    const activityTask = _useSelector((state) => state.processes?.activityTask)

    const dispatch = _useDispatch();

    let hideView
    if (activityTask === "viewOneFinished")
        hideView = true
    else
        hideView = false

    return (
        <Card className="w-75">
            <Card.Header>
                <div className={'text-center'}>
                    <h3>{process.title}</h3>
                </div>
            </Card.Header>

            <Card.Body>
            </Card.Body>

            <Card.Footer className={'d-flex justify-content-center'} >
                <Button type={'button'} onClick={() => dispatch(viewOneFinishedProcess(process, index))}
                        variant={"primary"} hidden={hideView}>View</Button>
            </Card.Footer>
        </Card>
    )
}
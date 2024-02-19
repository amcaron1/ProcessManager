import {Button, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {deleteProcess, EDIT_PROCESS_PAGE, viewOneProcess} from "../../modules/processes";

export default function Process({process, index, _useDispatch = useDispatch, _useSelector=useSelector}) {

    const {activityTask} = _useSelector((state) => ({
        activityTask: state.processes?.activityTask}))

    let hideDelete
    let hideEdit
    let hideView

  if (activityTask === "viewAllProcesses") {
      hideDelete = false
      hideEdit = true
      hideView = false
  }
  else {
      hideDelete = true
      hideEdit = false
      hideView = true
  }



    const dispatch = _useDispatch();

    return (
        <Card className="w-75">
            <Card.Header>
                <div className={'text-center'}>
                    <h3>{process.title}</h3>
                </div>
            </Card.Header>

            <Card.Body>
            </Card.Body>

            <Card.Footer hidden={hideDelete} className={'d-flex justify-content-between'}>
                <div>
                    <Button hidden={hideDelete} type={'button'} onClick={() => dispatch(deleteProcess(process.processID))}
                            variant={"danger"}>Delete</Button>
                </div>
                <div>
                    <Button hidden={hideEdit} type={'button'} onClick={() => dispatch({type: EDIT_PROCESS_PAGE,
                        payload: {processToEdit: process, displayTitle: process.title}})}
                            variant={"primary"}>Edit Title</Button>
                </div>
                <div>
                    <Button hidden={hideView} type={'button'} onClick={() => dispatch(viewOneProcess(process, index))}
                            variant={"primary"}>View</Button>
                </div>
            </Card.Footer>
        </Card>
    )
}
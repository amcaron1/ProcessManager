import {Button, Container, Col, Row, Card, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {
    CANCEL_EDIT_STAGE,
    UPDATE_MC,
    UPDATE_STAGE_QUESTION,
    UPDATE_STAGE_TYPE,
    editStage,
} from "../../modules/processes";
import {useSelector} from "react-redux";

export default function EditStage({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const {mcHidden, stageToEdit, newStageMC} = _useSelector((state) => ({
        mcHidden: state.processes.mcHidden,
        stageToEdit: state.processes?.stageToEdit,
        newStageMC: state.processes?.newStageMC}))

    let text
    let boolean
    let mc
    switch (stageToEdit.stageType) {
        case "Text":
            text = true
            break
        case "True/False":
            boolean = true
            break
        default:
            mc = true
    }

    const dispatch = _useDispatch();

    function updateMC1(mc1) {
        dispatch({type: UPDATE_MC, payload: {...newStageMC, mc1}})}
    function updateMC2(mc2) {
        dispatch({type: UPDATE_MC, payload: {...newStageMC, mc2}})}
    function updateMC3(mc3) {
        dispatch({type: UPDATE_MC, payload: {...newStageMC, mc3}})}
    function updateStageQuestion(newStageQuestion) {
        dispatch({type: UPDATE_STAGE_QUESTION, payload: {newStageQuestion: newStageQuestion}})}
    function updateStageType(newStageType) {
        dispatch({type: UPDATE_STAGE_TYPE, payload: {newStageType: newStageType}})}

    return (
        <Container className={'mt-4'}>
            <Row className={"d-flex justify-content-between"}>
                <Col className={"d-flex justify-content-start"} md={"2"}>
                    <Button type={'button'} onClick={() => dispatch({type: CANCEL_EDIT_STAGE})}
                            variant={"outline-danger"}>Cancel</Button>
                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>Edit Stage</h1>
                </Col>
                <Col className={"d-flex justify-content-end"} md={"2"}>
                    <Button type={'button'} onClick={() => (dispatch(editStage()))}
                            variant={"outline-light"}>Accept</Button>
                </Col>
            </Row>

            <div className={'m-4 d-flex justify-content-center'}>
                <Card className="w-75">

                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-4" >
                                <Form.Label >{stageToEdit.question}</Form.Label>
                                <Form.Control type='text' placeholder={"Question"} onChange={e => updateStageQuestion(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-4" >
                                <Form.Label >Stage Type</Form.Label>
                                <div  onChange={e => updateStageType(e.target.value)}>
                                    <input defaultChecked={text} type="radio" value="Text" name="stageType" /> Text&nbsp;&nbsp;&nbsp;
                                    <input defaultChecked={boolean} type="radio" value="True/False" name="stageType" /> True/False&nbsp;&nbsp;&nbsp;
                                    <input defaultChecked={mc} type="radio" value="Multiple Choice" name="stageType" /> Multiple Choice
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-4" hidden={mcHidden}>
                                <Form.Label >{stageToEdit.mcOption1}</Form.Label>
                                <Form.Control type='text'  placeholder={"MC Answer 1"} onChange={e => updateMC1(e.target.value)}/>
                                <Form.Label >{stageToEdit.mcOption2}</Form.Label>
                                <Form.Control type='text'  placeholder={"MC Answer 2"} onChange={e => updateMC2(e.target.value)}/>
                                <Form.Label >{stageToEdit.mcOption3}</Form.Label>
                                <Form.Control type='text'  placeholder={"MC Answer 3"} onChange={e => updateMC3(e.target.value)}/>
                            </Form.Group>

                        </Form>

                    </Card.Body>

                </Card>
            </div>

        </Container>
    )
}

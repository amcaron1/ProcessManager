import {Button, Container, Col, Row, Card, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {
    CANCEL_ADD_STAGE,
    UPDATE_MC,
    UPDATE_STAGE_QUESTION,
    UPDATE_STAGE_TYPE,
    addStageToStagesAry,
} from "../../modules/processes";
import {useSelector} from "react-redux";

export default function AddStage({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const {mcHidden, newStageMC} = _useSelector((state) => ({
        mcHidden: state.processes?.mcHidden,
        newStageMC: state.processes?.newStageMC}))

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
                    <Button type={'button'} onClick={() => dispatch({type: CANCEL_ADD_STAGE})}
                            variant={"outline-danger"}>Cancel</Button>
                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>Add Stage</h1>
                </Col>
                <Col className={"d-flex justify-content-end"} md={"2"}>
                    <Button type={'button'} onClick={() => (dispatch(addStageToStagesAry()))}
                            variant={"outline-light"}>Accept</Button>
                </Col>
            </Row>

            <div className={'m-4 d-flex justify-content-center'}>
                <Card className="w-75">

                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-5" >
                                <Form.Label className={'fs-3'}>Question:</Form.Label>
                                <Form.Control type='text' placeholder='Question' onChange={e => updateStageQuestion(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-5" >
                                <Form.Label className={'fs-3'}>Stage Type:</Form.Label>
                                <div onChange={e => updateStageType(e.target.value)}>
                                    <input type="radio" value="Text" name="stageType" /> Text&nbsp;&nbsp;&nbsp;
                                    <input type="radio" value="True/False" name="stageType" /> True/False&nbsp;&nbsp;&nbsp;
                                    <input type="radio" value="Multiple Choice" name="stageType" /> Multiple Choice
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-5" hidden={mcHidden}>
                                <Form.Label className={'fs-3'}>MC Answer 1:</Form.Label>
                                <Form.Control type='text' placeholder={"MC Answer 1"} onChange={e => updateMC1(e.target.value)}/>
                                <Form.Label className={'fs-3'}>MC Answer 2:</Form.Label>
                                <Form.Control type='text' placeholder={"MC Answer 2"} onChange={e => updateMC2(e.target.value)}/>
                                <Form.Label className={'fs-3'}>MC Answer 3:</Form.Label>
                                <Form.Control type='text' placeholder={"MC Answer 3"} onChange={e => updateMC3(e.target.value)}/>
                            </Form.Group>

                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

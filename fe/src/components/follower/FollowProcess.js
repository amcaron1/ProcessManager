import {Button, Container, Col, Row, Card, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {
    UPDATE_TEXT_ANSWER,
    UPDATE_BOOLEAN_ANSWER,
    UPDATE_MC_ANSWER,
    BACK_OUTTA_FOLLOW_PROCESS
} from "../../modules/responses";
import {useSelector} from "react-redux";
import {saveStage} from "../../modules/responses"
import {deleteStage} from "../../modules/processes";

export default function FollowProcess({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const dispatch = _useDispatch();

    const {defaultCheckedValue, stagesAry, stageToFollowIndex, processesAry, processToFollowIndex, textAnswer} = _useSelector((state) => ({
        defaultCheckedValue: state.responses?.defaultCheckedValue,
        stagesAry: state.responses?.stagesAry,
        stageToFollowIndex: state.responses?.stageToFollowIndex,
        processesAry: state.responses?.processesAry,
        processToFollowIndex: state.responses?.processToFollowIndex,
        textAnswer: state.responses?.textAnswer
    }))

    let textHidden = true
    let booleanHidden = true
    let mcHidden = true
    switch (stagesAry[stageToFollowIndex].stageType){
        case "Text":
            textHidden = false
            break
        case "True/False":
            booleanHidden = false
            break
        default:
            mcHidden = false
    }
    // let defaultCheckedValue = false

    function processStage(e) {
        e.preventDefault()
        // defaultCheckedValue = false
        dispatch(saveStage())
        e.target.reset()
    }



    function updateTextAnswer(textAnswer) {
        dispatch({type: UPDATE_TEXT_ANSWER, payload: {textAnswer: textAnswer}})}
    function updateBooleanAnswer(booleanAnswer) {
        dispatch({type: UPDATE_BOOLEAN_ANSWER, payload: {booleanAnswer: booleanAnswer}})}
    function updateMCAnswer(mcAnswer) {
        dispatch({type: UPDATE_MC_ANSWER, payload: {mcAnswer: mcAnswer}})}

    return (
        <Container className={'mt-4'}>
            <Row className={"d-flex justify-content-between"}>
                <Col className={"d-flex justify-content-start"} md={"2"}>

                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>Follow Process</h1>
                </Col>
                <Col className={"d-flex justify-content-end"} md={"2"}>

                </Col>
            </Row>

            <div className={'m-4 d-flex justify-content-center'}>

                <Card className="w-75">
                    <Form onSubmit={(e) => (processStage(e))}>
                    <Card.Header>
                        <div className={'d-flex justify-content-center'}>
                            <h3>{processesAry[processToFollowIndex].title}</h3>
                        </div>
                    </Card.Header>

                    <Card.Body>

                            <Form.Group hidden={textHidden} className="mb-5" >
                                <Form.Label className={'fs-3'}>{stagesAry[stageToFollowIndex].question}</Form.Label>
                                <Form.Control  type='text' value={textAnswer} placeholder='Answer' onChange={e => updateTextAnswer(e.target.value)}/>
                            </Form.Group>
                        {/*</Form>*/}

                        {/*<Form hidden={booleanHidden}>*/}
                            <Form.Group hidden={booleanHidden} className="mb-5" >
                                <Form.Label className={'fs-3'}>{stagesAry[stageToFollowIndex].question}</Form.Label>
                                <div id={"followBoolean"} onChange={e => updateBooleanAnswer(e.target.value)}>
                                    <input   type="radio" value="True" name="True/False" /> True&nbsp;&nbsp;&nbsp;
                                    <input   type="radio" value="False" name="True/False" /> False&nbsp;&nbsp;&nbsp;
                                </div>
                            </Form.Group>
                        {/*</Form>*/}

                        {/*<Form hidden={mcHidden}>*/}
                            <Form.Group  hidden={mcHidden} className="mb-5" >
                                <Form.Label className={'fs-3'}>{stagesAry[stageToFollowIndex].question}</Form.Label>
                                <div onChange={e => updateMCAnswer(e.target.value)}>
                                    <input type="radio" value={stagesAry[stageToFollowIndex].mcOption1}
                                           name="Multiple Choice" /> {stagesAry[stageToFollowIndex].mcOption1}&nbsp;&nbsp;&nbsp;
                                    <br></br>
                                    <input type="radio" value={stagesAry[stageToFollowIndex].mcOption2}
                                           name="Multiple Choice" /> {stagesAry[stageToFollowIndex].mcOption2}&nbsp;&nbsp;&nbsp;
                                    <br></br>
                                    <input type="radio" value={stagesAry[stageToFollowIndex].mcOption3}
                                           name="Multiple Choice" /> {stagesAry[stageToFollowIndex].mcOption3}&nbsp;&nbsp;&nbsp;
                                </div>
                            </Form.Group>

                    </Card.Body>

                    <Card.Footer className={"d-flex justify-content-between"}>
                        <Button type={'button'} onClick={() => dispatch({type: BACK_OUTTA_FOLLOW_PROCESS})}
                                variant={"danger"}>Cancel</Button>
                        <Button type={'submit'}
                                variant={"primary"}>&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                    </Card.Footer>
                </Form>
                </Card>

            </div>
        </Container>
    )
}
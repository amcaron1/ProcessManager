import {Button, Container, Col, Row, Card, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {CANCEL_ADD_PROCESS, UPDATE_PROCESS_TITLE, addProcess} from "../../modules/processes";
import {useSelector} from "react-redux";
import Stage from "./Stage";
import {ADD_STAGE_PAGE} from "../../modules/processes";

export default function AddProcess({StageC = Stage,
                                          _useDispatch = useDispatch, _useSelector = useSelector}) {

    const {newProcessTitle, stagesAry} = _useSelector((state) => ({
        newProcessTitle: state.processes?.newProcessTitle,
        stagesAry: state.processes?.stagesAry}))

    const dispatch = _useDispatch();

    function updateProcessTitle(newProcessTitle) {
        dispatch({type: UPDATE_PROCESS_TITLE, payload: {newProcessTitle: newProcessTitle}})}

    return (
        <Container className={'mt-4'}>
            <Row className={"d-flex justify-content-between"}>
                <Col className={"d-flex justify-content-start"} md={"2"}>
                    <Button type={'button'} onClick={() => dispatch({type: CANCEL_ADD_PROCESS})}
                            variant={"outline-danger"}>Cancel</Button>
                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>Add Process</h1>
                </Col>
                <Col className={"d-flex justify-content-end"} md={"2"}>
                    <Button type={'button'} onClick={() => (dispatch(addProcess()))}
                            variant={"outline-light"}>Accept</Button>
                </Col>
            </Row>

            <div className={'m-4 d-flex justify-content-center'}>
                <Card className="w-75">
                    <Card.Header className={'d-flex justify-content-center mb-3 '}>
                        <h5>Title</h5>
                    </Card.Header>

                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-5" >
                                <Form.Control type='text' placeholder={newProcessTitle} onChange={e => updateProcessTitle(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Card.Body>

                    <Card.Footer>
                        <div className={'d-flex justify-content-center'}>
                            <Button type={'button'} onClick={() => dispatch({type: ADD_STAGE_PAGE})}
                                    variant={"primary"}>Add Stage</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>

            {stagesAry.map((stage, index) =>
                <div key={index} className={'m-4 d-flex justify-content-center'}>
                    <StageC stage={stage}/>
                </div>
            )}

        </Container>
    )
}
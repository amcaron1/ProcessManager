import {Button, Container, Col, Row, Card, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {CANCEL_EDIT_PROCESS, UPDATE_PROCESS_TITLE, editProcess,} from "../../modules/processes";
import {useSelector} from "react-redux";

export default function EditProcess({_useDispatch = useDispatch, _useSelector = useSelector}) {

    const {newProcessTitle, displayTitle} = _useSelector((state) => ({
        newProcessTitle: state.processes?.newProcessTitle,
        displayTitle: state.processes?.displayTitle}))

    const dispatch = _useDispatch();

    function updateProcessTitle(newProcessTitle) {
        dispatch({type: UPDATE_PROCESS_TITLE, payload: {newProcessTitle: newProcessTitle}})}

    return (
        <Container className={'mt-4'}>
            <Row className={"d-flex justify-content-between"}>
                <Col className={"d-flex justify-content-start"} md={"2"}>
                    <Button type={'button'} onClick={() => dispatch({type: CANCEL_EDIT_PROCESS})}
                            variant={"outline-danger"}>Cancel</Button>
                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>Edit Process Title</h1>
                </Col>
                <Col className={"d-flex justify-content-end"} md={"2"}>
                    <Button type={'button'} onClick={() => (dispatch(editProcess()))}
                            variant={"outline-light"}>Accept</Button>
                </Col>
            </Row>

            <div className={'m-4 d-flex justify-content-center'}>
                <Card className="w-75">

                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-5" >
                                <Form.Label className={'fs-3'}>Title: {displayTitle}</Form.Label>
                                <Form.Control value={newProcessTitle} type='text' placeholder='Title' onChange={e => updateProcessTitle(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Card.Body>

                </Card>
            </div>

        </Container>
    )
}
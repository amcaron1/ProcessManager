import {Button, Container, Col, Row, Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {BACK_OUTTA_FOLLOW_PROCESS, saveProcess} from "../../modules/responses"

export default function FinishedProcess({_useDispatch = useDispatch, _useSelector = useSelector}) {

    const {processesAry, processToFollowIndex} = _useSelector((state) => ({
        processesAry: state.responses?.processesAry,
        processToFollowIndex: state.responses?.processToFollowIndex
    }))

    const dispatch = _useDispatch();

    return (
        <Container className={'mt-4'}>
            <Row>
                <Col className={"d-grid"} md={"2"}>

                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>Follow Process</h1>
                </Col>
                <Col className={"d-grid"} md={"2"}>

                </Col>
            </Row>

            <div className={'m-4 d-flex justify-content-center'}>
                <Card className="w-75">
                    <Card.Header>
                        <div className={'d-flex justify-content-center'}>
                            <h3>{processesAry[processToFollowIndex].title}</h3>
                        </div>
                    </Card.Header>

                    <Card.Body>

                    </Card.Body>

                    <Card.Footer className={"d-flex justify-content-between"}>
                        <Col className={"d-grid"} md={"2"}>
                            <Button type={'button'} onClick={() => dispatch({type: BACK_OUTTA_FOLLOW_PROCESS})}
                                    variant={"danger"}>Cancel</Button>
                        </Col>
                        <div className={'d-flex justify-content-center'}>
                            <Button type={'button'} onClick={() => (dispatch(saveProcess()))}
                                    variant={"primary"}>Submit</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        </Container>
    )
}
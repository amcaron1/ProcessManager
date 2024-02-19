import {Button, Container, Col, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {BACK_OUTTA_VIEW_FOLLOWER_PROCESSES} from "../../modules/responses";
import {useSelector} from "react-redux";
import Process from "./Process";

export default function ViewFollowerProcesses({ProcessC = Process,
                                             _useDispatch = useDispatch, _useSelector = useSelector}) {

    const processesAry = _useSelector((state) => state.responses?.processesAry)

    const dispatch = _useDispatch();

    return (
        <Container className={'mt-4'}>
            <Row className={"d-flex justify-content-between"}>
                <Col className={"d-flex justify-content-start"} md={"2"}>
                    <Button type={'button'} onClick={() => dispatch({type: BACK_OUTTA_VIEW_FOLLOWER_PROCESSES})}
                            variant={"outline-light"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>View All Processes</h1>
                </Col>
                <Col className={"d-flex justify-content-end"} md={"2"}>

                </Col>
            </Row>

            {processesAry.map((process, index) =>
                <div key={index} className={'m-4 d-flex justify-content-center'}>
                    <ProcessC process={process} index={index}/>
                </div>
            )}

        </Container>
    )
}
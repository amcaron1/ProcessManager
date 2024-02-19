import {Button, Container, Col, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {BACK_OUTTA_VIEW_ALL_FINISHED_PAGE} from "../../modules/processes";
import {useSelector} from "react-redux";
import FinishedProcess from "./FinishedProcess";


export default function ViewAllFinished({FinishedProcessC = FinishedProcess,
                                            _useDispatch = useDispatch, _useSelector = useSelector}) {

    const processesAry = _useSelector((state) => state.processes?.processesAry)

    const dispatch = _useDispatch();

    return (
        <Container className={'mt-4'}>
            <Row className={"d-flex justify-content-between"}>
                <Col className={"d-flex justify-content-start"} md={"2"}>
                    <Button type={'button'} onClick={() => dispatch({type: BACK_OUTTA_VIEW_ALL_FINISHED_PAGE})}
                            variant={"outline-light"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>View All Finished</h1>
                </Col>
                <Col className={"d-flex justify-content-end"} md={"2"}>

                </Col>
            </Row>

            {processesAry.map((process, index) =>
                <div key={index} className={'m-4 d-flex justify-content-center'}>
                    <FinishedProcessC process={process} index={index}/>
                </div>
            )}

        </Container>
    )
}
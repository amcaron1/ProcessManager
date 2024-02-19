import {Button, Container, Col, Row, Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {BACK_OUTTA_VIEW_ONE_FINISHED_PROCESS_PAGE} from "../../modules/processes";
import {useSelector} from "react-redux";
import FinishedStage from "./FinishedStage";
import FinishedProcess from "./FinishedProcess";


export default function ViewOneFinishedProcess({FinishedStageC = FinishedStage, FinishedProcessC = FinishedProcess,
                                                    _useDispatch = useDispatch, _useSelector = useSelector}) {

    const {processesAry, processToViewIndex, stagesAry} = _useSelector((state) => ({
        processesAry: state.processes?.processesAry,
        processToViewIndex: state.processes?.processToViewIndex,
        stagesAry: state.processes?.stagesAry}))

    const dispatch = _useDispatch();

    return (
        <Container className={'mt-4'}>
            <Row className={"d-flex justify-content-between"}>
                <Col className={"d-flex justify-content-start"} md={"2"}>
                    <Button type={'button'} onClick={() => dispatch({type: BACK_OUTTA_VIEW_ONE_FINISHED_PROCESS_PAGE})}
                            variant={"outline-light"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>View Process</h1>
                </Col>
                <Col className={"d-flex justify-content-end"} md={"2"}>

                </Col>
            </Row>

            <div className={'m-4 d-flex justify-content-center'}>
                <Card className="w-75">
                    <Card.Header>
                        <div className={'text-center'}>
                            <h3>{processesAry[processToViewIndex].title}</h3>
                        </div>
                    </Card.Header>

                    <Card.Body>
                    </Card.Body>

                </Card>
            </div>

            {/*<div className={'m-4 d-flex justify-content-center'}>*/}
            {/*    <FinishedProcessC process={processesAry[processToViewIndex]} processToViewIndex/>*/}
            {/*</div>*/}

            {stagesAry.map((stage, index) =>
                <div key={index} className={'m-4 d-flex justify-content-center'}>
                    <FinishedStageC stage={stage} index={index}/>
                </div>
            )}

        </Container>
    )
}
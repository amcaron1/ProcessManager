import {Button, Container, Col, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {ADD_EDIT_STAGE_PAGE, BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE} from "../../modules/processes";
import {useSelector} from "react-redux";
import StageWithButtons from "./StageWithButtons";
import Process from "./Process";

export default function ViewOneProcessAndStages({StageWithButtonsC = StageWithButtons, ProcessC = Process,
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
                    <Button type={'button'} onClick={() => dispatch({type: BACK_OUTTA_VIEW_ONE_PROCESS_AND_STAGES_PAGE})}
                            variant={"outline-light"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </Col>
                <Col className={'text-center'}>
                    <h1 className={"text-white"}>View Process</h1>
                </Col>
                <Col className={"d-flex justify-content-end"} md={"2"}>
                    <Button type={'button'} onClick={() => dispatch({type: ADD_EDIT_STAGE_PAGE})}
                            variant={"outline-light"}>Add Stage</Button>
                </Col>
            </Row>

            <div className={'m-4 d-flex justify-content-center'}>
                <ProcessC process={processesAry[processToViewIndex]}/>
            </div>

            {stagesAry.map((stage, index) =>
                <div key={index} className={'m-4 d-flex justify-content-center'}>
                    <StageWithButtonsC stage={stage} />
                </div>
            )}
        </Container>
    )
}
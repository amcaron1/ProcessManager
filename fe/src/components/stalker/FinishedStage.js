import {Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

export default function FinishedStage({stage, index, _useDispatch = useDispatch, _useSelector = useSelector}) {

    let answer = ""
    switch (stage.stageType) {
        case "Text":
            answer = stage.answerText
            break
        case "True/False":
            answer = stage.answerBoolean
            break
        default:
            answer = stage.answerMC
    }

    return (
        <Card className="w-75">
            <Card.Header className={'d-flex justify-content-center mb-3 '}>
                <h5>Stage</h5>
            </Card.Header>

            <Card.Body>
                <div className={" ps-2 mb-1"}>
                    <p className={"mb-1"}>Question: {stage.question}</p>
                </div>

                <div className={" ps-2 mb-1"}>
                    <hr/>
                    <p className={"mb-1"}>Answer: {answer}</p>
                </div>
            </Card.Body>

        </Card>
    )
}

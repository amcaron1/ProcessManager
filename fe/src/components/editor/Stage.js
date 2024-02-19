import {Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

export default function Stage({stage, _useDispatch = useDispatch}) {

    let mcHidden = true
    if (stage.stageType === "Multiple Choice")
        mcHidden = false

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
                    <p className={"mb-1"}>Stage Type: {stage.stageType}</p>
                </div>

                <div hidden={mcHidden} className={" ps-2 mb-1"}>
                    <hr/>
                    <p className={"mb-1"}>MC Answer1: {stage.mcOption1}</p>
                    <p className={"mb-2"}>MC Answer2: {stage.mcOption2}</p>
                    <p className={"mb-3"}>MC Answer3: {stage.mcOption3}</p>
                </div>
            </Card.Body>

        </Card>
    )
}

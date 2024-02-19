import {Button, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {followProcess} from "../../modules/responses";

export default function Process({process, index, _useDispatch = useDispatch, _useSelector=useSelector}) {

    const dispatch = _useDispatch();

    return (
        <Card className="w-75">
            <Card.Header>
                <div className={'text-center'}>
                    <h3>{process.title}</h3>
                </div>
            </Card.Header>

            <Card.Body>
            </Card.Body>

            <Card.Footer className={'d-flex justify-content-center'}>
                <Button type={'button'} onClick={() => dispatch(followProcess(process, index))}
                        variant={"primary"}>Follow Process</Button>
            </Card.Footer>
        </Card>
    )
}
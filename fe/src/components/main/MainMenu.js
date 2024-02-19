import {Button, Card, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {EDITOR_MENU_PAGE, FOLLOWER_MENU_PAGE} from "../../modules/processes";

export default function MainMenu({_useDispatch = useDispatch, _useSelector=useSelector}) {

    const dispatch = _useDispatch();

    return(
        <div className={'m-4 d-flex justify-content-center'}>
            <Card className={'mt-4'}>
                <Card.Header className={'text-center'}>
                    <h3>Process Manager</h3>
                </Card.Header>
                <Card.Body>
                    <Form >
                        <Row className={'p-3'}>
                            <Button type={'button'} onClick={() => dispatch({type: EDITOR_MENU_PAGE})}
                                    variant={"primary"}>Editor</Button>
                        </Row>
                        <Row className={'p-3'}>
                            <Button type={'button'} onClick={() => dispatch({type: FOLLOWER_MENU_PAGE})}
                                    variant={"primary"}>Follower</Button>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
import {Button, Card, Form, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {viewFollowerProcesses} from "../../modules/responses";
import {MAIN_MENU_PAGE} from "../../modules/processes";


export default function FolloweMenu({_useDispatch = useDispatch}) {
    const dispatch = _useDispatch();

    return (
        <div className={'m-4 d-flex justify-content-center'}>
            <Card className={'mt-4'}>
                <Card.Header className={'text-center'}>
                    <h3>Follower Menu</h3>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row className={'p-3'}>
                            <Button type={'button'} onClick={() => dispatch(viewFollowerProcesses())}
                                    variant={"primary"}>View All Processes</Button>
                        </Row>
                        <Row className={'p-3'}>
                            <Button type={'button'} onClick={() => dispatch({type: MAIN_MENU_PAGE})}
                                    variant={"primary"}>Back</Button>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
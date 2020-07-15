import React, { Component } from 'react';
import {Button, Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal , ModalBody , ModalHeader, Row, Col, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function  RenderDish({dish}) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else
            return (
                <div></div >
            );
    }

class CommentForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            isModalOpen : false
        };
    this.toggleModal = this.toggleModal.bind(this);   
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal()
     {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render()
    {
        return(
            <>
            <Button onClick={this.toggleModal} outline color="secondary"> <i className="fa fa-pencil"></i> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Col md={12}>
                            <Label htmlfor="rating" md={2}><strong>Rating</strong></Label>
                            <Control.select model=".rating" id="rating" name="rating" className="form-control" ><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={12}>
                            <Label htmlFor="authorname" md={4}><strong>Your Name</strong></Label>
                            <Control.text model=".authorname" name="authorname" className="form-control" placeholder="Your Name" validators={{minLength: minLength(3), maxLength: maxLength(15)}}></Control.text>
                            <Errors className="text-danger" model=".authorname" show="touched" messages={{minLength:'Must be greater than 2 characters',maxLength:'Must be 15 characters or less'}}></Errors>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={12}>
                            <Label htmlFor="comment" md={2}><strong>Comment</strong></Label>
                            <Control.textarea rows="6" model=".comment" name="comment" className="form-control"></Control.textarea>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={12}>
                            <Button type="submit" color="primary">Submit</Button>
                        </Col>
                    </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
        </>
        );
    }
}

function  RenderComments({comment_ob_arr, addComment, dishId}) {
        if (comment_ob_arr != null) {
            return(
                 
                        <div>
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                {comment_ob_arr.map((comment_obj) => {
                                    return(
                                        <li key={comment_obj.id}>
                                            <p>{comment_obj.comment}</p>
                                            <p>--{comment_obj.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment_obj.date)))}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                            <CommentForm dishId={dishId} addComment={addComment} />
                        </div>
                  );
        } else {
            return (
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comment_ob_arr={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                    </div>
                </div>
                </div>
            );
        }else{
            return(<div ></div>);
        }

    }
export default DishDetail;
import React from 'react';
import { Card, CardTitle, CardImg, CardBody, CardText, CardImgOverlay, ListGroup, ListGroupItem } from 'reactstrap';



function  RenderDish({dish}) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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

function  RenderComments({dish_comments}) {
        if (dish_comments != null) {
            const comm = dish_comments.comments.map((comment_obj) => {
                return (
                    <div>
                        <li className="list-unstyled">{comment_obj.comment}</li><br></br>
                        <li className="list-unstyled">--{comment_obj.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment_obj.date)))}</li><br></br>
                    </div>

                );
            });
            return comm;
        } else {
            return (
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        if (props.dish != null){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments dish_comments={props.dish} />
                        </div>
                    </div>
                </div>
    
    
            );
        }else{
            return(<div ></div>);
        }

    }
export default DishDetail;
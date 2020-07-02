import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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

function  RenderComments({comment_ob_arr}) {
        if (comment_ob_arr != null) {
            const comm = comment_ob_arr.map((comment_obj) => {
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
                        <h3>Comments</h3>
                        <RenderComments comment_ob_arr={props.comments} />
                    </div>
                </div>
                </div>
            );
        }else{
            return(<div ></div>);
        }

    }
export default DishDetail;
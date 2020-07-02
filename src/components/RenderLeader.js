import React from 'react';
import {Media} from 'reactstrap';


function renderLeader(props){
    const lead = props.leaders_arr_obj.map( (leader) => {
        return(
            <div className="m-5">
            <Media>
                <Media left top>
                    <Media object src={leader.image} alt='leader image' className="mr-2"></Media>
                </Media>
                <Media body>
                    <Media heading>{leader.name}</Media>
                    <p>{leader.designation}</p>
                    <p>{leader.description}</p>
                </Media>
            </Media>
        </div>
        );
    });
    return lead;
}
export default renderLeader;
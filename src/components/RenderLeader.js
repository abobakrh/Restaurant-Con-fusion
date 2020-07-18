import React from 'react';
import {Media} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function renderLeader({leaders_arr_obj, isLoading, errMess}){

    if (isLoading) {
        return(
                <Loading />
        );
    }
    else if (errMess) {
        return(
                <h4>{errMess}</h4>
        );
    }
    else {
        const lead = leaders_arr_obj.map( (leader) => {
            return(
                <div className="m-5">
                <Stagger in>
                <Media>
                    <Media left top>
                        <Media object src={baseUrl + leader.image} alt={leader.name} className="mr-2"></Media>
                    </Media>
                    <Media body>
                        <Media heading>{leader.name}</Media>
                        <Fade in>
                        <p>{leader.designation}</p>
                        <p>{leader.description}</p>
                        </Fade>
                    </Media>
                </Media>
                </Stagger>
            </div>
            );
        });
        return lead;
    }


}
export default renderLeader;
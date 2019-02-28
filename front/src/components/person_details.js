import React from 'react';

const PersonDetails = (props) => {

    const imgurl = 'http://www.freeiconspng.com/uploads/person-icon-23.png';
    return (
        <div className="col-md-10">
            <div className="col-md-2">
                <img src={imgurl}/>
            </div>
            <div className="space col-md-5">
                <table className="details">
                    <tbody>
                    <tr><td>Name:</td><td > {props.person.name}</td></tr>
                    <tr><td >UserName:</td><td >{props.person.username}</td></tr>
                    <tr><td >HackerRank:</td><td >{props.person.hackerrank}</td></tr>
                    <tr><td >CodeForces:</td><td >{props.person.codeforces}</td></tr>
                    <tr><td >About:</td><td >{props.person.about}</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default PersonDetails;

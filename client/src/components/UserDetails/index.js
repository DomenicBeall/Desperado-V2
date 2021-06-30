import "./userdetails.css";

import PlaceholderProfile from '../../assets/placeholder-profile.jpg';

function UserDetails (props) {
  return(
    <div className="usercontainer">
      <img src={PlaceholderProfile} alt="User profile"/>
      <div style={{ paddingLeft: "1rem",  paddingRight: "1rem" }}>
        <div className="heading">{props.user.username}</div>
        <div className="subheading">Rating: {props.user.rating}</div>
        <div className="description">This user has not added a description.</div>
      </div>
    </div>
  );
}

export default UserDetails;
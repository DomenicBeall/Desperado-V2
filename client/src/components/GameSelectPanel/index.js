import "./panel.css";

import iconChessClock from '../../assets/icon-chessclock.svg';
import iconClock from '../../assets/icon-clock.svg';
import iconLocation from '../../assets/icon-location.svg';


function GameSelectPanel (props) {
  const open = !(props.game === null);

  return(
    <div className="panel" style={ open ? { padding: "2rem", width: "40%"} : { padding: 0, width: "0%"}}>
    {
      !open ?
      <></>
      :
      <div style={{ height: "100%" }}>
        <p className="username">{props.game.challenger.username}</p>
        <p style={{ fontSize: "1.5rem" }}>Rating: {props.game.challenger.rating}</p>
        <div className="detailrow">
          <div className="iconparent"><img className="icon" src={iconLocation} alt="A map marker icon"/></div>
          <p className="details">{props.game.location.placeName}</p>
        </div>
        <div className="detailrow">
          <div className="iconparent"><img className="icon" src={iconClock} alt="A clock icon"/></div>
          <p className="details">{new Date(props.game.dateTime).toUTCString()}</p>
        </div>
        <div className="detailrow">
          <div className="iconparent"><img className="icon" src={iconChessClock} alt="A chess clock icon"/></div>
          <p className="details">{props.game.timeControl}</p>
        </div>
        <div onClick={() => {props.handleGameAccept(props.game)}} className="btn btn-black" style={{ margin: "0", marginTop: "5em" }}>Accept Game</div>
      </div>
    }
    </div>
  );
}

export default GameSelectPanel;
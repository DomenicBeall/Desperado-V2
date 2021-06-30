import "./usergames.css";

function UserGames (props) {
  return(
    <div className="gamescontainer">
      <div className="gamesheading">{props.user.username}'s Games</div>
    </div>
  );
}

export default UserGames;
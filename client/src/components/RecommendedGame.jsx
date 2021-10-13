import React from 'react';

const RecommendedGame = (props) => {
  var game = props.game;
  return(
    <div>
      <span>You might like...</span>
      <span><h4>{game.title}</h4></span>
      <div className="stats">
        <div className="statbox players">
          <div className="statname">Players:</div>
          <div className="stat">{game.minplayers}-{game.maxplayers}</div>
        </div>
        <div className="playingtime">
          <div className="statname">Avg. Time:</div>
          <div className="stat">{game.playingtime}</div>
        </div>
        <div className="statbox ages">
          <div className="statname">Ages:</div>
            <div className="stat">{game.minage}+</div>
        </div>
      </div>
      {/* <div>
        <div className="list mechanics">
          <div className="listname">Involves:</div>
          <ul>
            {
              game.mechanics.map((mechanic, index) => (
                <li key={index}>{mechanic}</li>
              ))
            }
          </ul>
        </div>
        <div className="list equipment">
        <div className="listname">Uses:</div>
          <ul>
            {
              game.equipment.map((equipment, index) => (
                <li key={index}>{equipment}</li>
              ))
            }
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default RecommendedGame;
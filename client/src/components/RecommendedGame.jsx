import React from 'react';

const RecommendedGame = (props) => {
  var game = props.game;
  return(
    <div>
      <span>You might like...</span>
      <div className="game-title">
        <span><h4>{game.title}</h4></span>
      </div>
      <div className="stats">
        <div className="statbox players">
          <div className="statname">Players:</div>
          <div className="stat">{game.minplayers}-{game.maxplayers}</div>
        </div>
        <div className="statbox playingtime">
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
              game.mechanics.map((mechanic) => (
                <li key={mechanic.id}>{mechanic.name}</li>
              ))
            }
          </ul>
        </div>
        <div className="list equipment">
        <div className="listname">Uses:</div>
          <ul>
            {
              game.equipment.map((equipment) => (
                <li key={equipment.id}>{equipment.name}</li>
              ))
            }
          </ul>
        </div>
      </div> */}
      <button className="showDiff btn" onClick={props.handleShowDiffClick}>Show me a different game like this.</button>
    </div>
  );
}

export default RecommendedGame;
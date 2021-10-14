import React from 'react';

const AddGame = (props) => (
    <form onSubmit={props.handleAddGameSubmit}>
      <label>
        Title:
        <input type="text" name="newTitleEntry" value={props.newTitleEntry} onChange={props.handleChange} />
      </label>
      <label>
        Minimum Players:
        <input type="number" name="newMinPlayersEntry" value={props.newMinPlayersEntry} onChange={props.handleChange} />
      </label>
      <label>
        Maximum Players:
        <input type="number" name="newMaxPlayersEntry" value={props.newMaxPlayersEntry} onChange={props.handleChange} />
      </label>
      <label>
        Recommended Age:
        <input type="number" name="newMinAgeEntry" value={props.minAgeEntry} onChange={props.handleChange} />
         and up.
      </label>
      <label>
        It usually takes
        <input type="number" name="newTimeEntry" step="5" value={props.newTimeEntry} onChange={props.handleChange} />
         minutes to play.
      </label>
      <label>
        In this game players
        <select name="newCooperativeEntry" value={props.newCooperativeEntry} onChange={props.handleChange}>
          <option value="">(no preference)</option>
          <option value="true">work together!</option>
          <option value="false">compete!</option>
        </select>
      </label>
      <label>
        It's themed after
        <select name="newThemeEntry" multiple="true" value={props.newThemeEntry} onChange={props.handleChange}>
          <option value="">Choose one or more.</option>
          {props.themeOptions.map((theme) => (
            <option key={theme.id} value={theme.name}>{theme.name}</option>
          ))}
        </select>
        .
      </label>
      <label>
        It involves
        <select name="newMechanicsEntry" multiple="true" value={props.newMechanicsEntry} onChange={props.handleChange}>
          <option value="">Choose one or more.</option>
          {props.mechanicsOptions.map((mech) => (
            <option key={mech.id} value={mech.name}>{mech.name}</option>
          ))}
        </select>
        .
      </label>
      <label>
        It uses
        <select name="newEquipmentEntry" multiple="true" value={props.newEquipmentEntry} onChange={props.handleChange}>
          <option value="">Choose one or more.</option>
          {props.equipmentOptions.map((equip) => (
            <option key={equip.id} value={equip.name}>{equip.name}</option>
          ))}
        </select>
        .
      </label>
      <input type="submit" value="Add this to my cabinet!" />
    </form>

)

export default AddGame;
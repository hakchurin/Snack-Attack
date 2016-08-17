
import $ from 'jquery';
import Backbone from 'backbone';


        function footerView() {
          let footer = $(`
            <div id="footer">
            <p id="timer"></p>
            <p id ="score">Current score: </p>
            <p id= "lives"> </p>
            <input type="submit" id="play" name="play" value="play">
            <input type="submit" id="pause" name="pause" value="pause">

            </div>
            `);
            return footer;
        }
        export default footerView;

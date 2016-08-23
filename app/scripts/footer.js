
import $ from 'jquery';
import Backbone from 'backbone';
import router from './router';

        function footerView() {
          let footer = $(`
            <div id="footer">
            <p id="timer"></p>
            <p id ="footerScore">Current score: </p>
            <p id= "lives"> </p>
            <button><i class="fa fa-play" id="play" aria-hidden="true"></i></button>
            <button><i class="fa fa-pause" id="pause" aria-hidden="true"></i></button>
            <input type="submit" id="leaderboard" name="Leaderboard" value="Leaderboard">


            </div>
            `);

            footer.find('#leaderboard').on('click', function(){
              router.navigate('leaderboard', {trigger:true});
            })

            return footer;
        }
        export default footerView;


        // i class="fa fa-play" aria-hidden="true"></i>
        // <input type="submit" id="pause" name="pause" value="pause">

import $ from 'jquery';
import Backbone from 'backbone';
import router from './router';
import logoutInfo from './logout';




function footerView() {
    let footer = $(`
            <div id="footer">
              <div id="wrapper">
                <div id="volume">
                  <button> <i class="fa fa-volume-up" id="volUp" aria-hidden="true"></i> </button>
                  <button><i class="fa fa-volume-off" id="volOff" aria-hidden="true"></i></button>
                </div>
                <button><i class="fa fa-play" id="play" aria-hidden="true"></i></button>
                <button><i class="fa fa-pause" id="pause" aria-hidden="true"></i></button>
              </div>

              <input type="submit" id="leaderboard" name="Leaderboard" value="Leaderboard">
              <p id="timer"></p>
              <div id="settings">
                <p id ="footerScore">Current score: </p>
                <p id= "lives"> </p>
              </div>

            </div>
            `);

    footer.find('#wrapper').append(logoutInfo())

    footer.find('#leaderboard').on('click', function() {
        router.navigate('leaderboard', {
            trigger: true
        });
    })

    return footer;
}
export default footerView;

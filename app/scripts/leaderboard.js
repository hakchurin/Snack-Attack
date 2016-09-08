import _ from 'underscore'
import $ from 'jquery';
import Backbone from 'backbone';
import scoreCollection from './scoreCollection';
import router from './router';





function highScoreView() {
    let highScore = $(`
    <div class="highScore">
      <div id="leadWrap">
    <h1 id="leader"> Leaderboard </h1>

    <table>
          <thead>
            <tr id ="leaderTitle">
              <th> Rank </th>
              <th> Name </th>
              <th> Score </th>
            </tr>
          </thead>
      <tbody>
      </tbody>
      </table>
      </div>
      <div id="leadBtn">
      <button id="backGame" value="Backgame"> Back to game </button>
      </div>
    </div>
    `);

    highScore.find('button').on('click', function() {
        router.navigate('game', {
            trigger: true
        });
    })
    scoreCollection.fetch({
        success: function(r) {
            console.log('success');
            let fixedScore = _.sortBy(r.models, function(score) {
                return score.get('score');
            })
            fixedScore = fixedScore.reverse();
            fixedScore = fixedScore.slice(0, 20);

            fixedScore.forEach(function(score, i) {
                let scoreLi = $(`<tr> <td id= "numbers"> ${i +1}</td> <td id="highName"> ${score.get('username')}</td> <td id="highScore">  ${score.get('score')}</td> </tr>`)
                console.log(scoreLi);
                highScore.find('tbody').append(scoreLi);
            })

        }
    });

    return highScore;
}
export default highScoreView;

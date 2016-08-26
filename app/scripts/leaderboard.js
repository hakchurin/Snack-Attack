
import _ from 'underscore'
import $ from 'jquery';
import Backbone from 'backbone';
import scoreCollection from './scoreCollection';
import router from './router';





function highScoreView(){
  let highScore = $(`
    <div class="highScore">
    <h1 id="leaderboard"> Leaderboard </h1>

    <table>
    <thead>
    <tr>
      <th> Rank </th>
      <th> Name </th>
      <th> Score </th>
      </tr>
      </thead>
      </table>
      <button id="backGame" value="Backgame"> Back to game </button>

    </div>
    `);

highScore.find('button').on('click', function(){
  router.navigate('game', {trigger:true});
})
scoreCollection.fetch({
  success: function(r){
    let fixedScore = _.sortBy(r.models,function(score){
      return score.get('score');
    })
      fixedScore= fixedScore.reverse();
      fixedScore= fixedScore.slice(0,20);

      fixedScore.forEach(function(score,i){
      let scoreLi = $(`<tbody><tr> <td id= "numbers"> ${i +1}</td> <td id="highName"> ${score.get('username')}</td> <td id="highScore">  ${score.get('score')}</td> </tr></tbody>`)

      highScore.find('table').append(scoreLi);
    })

  }
});

    return highScore;
}
export default highScoreView;

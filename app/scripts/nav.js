import Router from './router';





function navView(){
  let nav = $(`
    <a href="login">Login </a>
    <a href="SignUp">Sign Up </a>
    <a href="logout">Logout </a>
    `);
    return nav;
}

export default navView;

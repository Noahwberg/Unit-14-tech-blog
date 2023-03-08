const signupFunc = async function(e) {
  e.preventDefault();
  const username = document.querySelector('#username-signup');
  const password = document.querySelector('#password-signup');
  const data = await fetch('/api/user', {
    method: 'POST'
    , body: JSON.stringify({
      username: username.value
    , password: password.value
  })
  , headers: { 'Content-Type': 'application/json' }
});
  if (data.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Could not sign up. Please try again');
  }
};
document.querySelector('#signup-form').addEventListener('submit', signupFunc);  
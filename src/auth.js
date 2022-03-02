export function getAuthForm() {
  return `
    <form class="mui-form" id="form-auth">
    <div class="mui-textfield mui-textfield--float-label">
      <input
        type="email"
        id="input-email"
        required
      />
      <label for="input-email">Email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input
        type="password"
        id="input-password"
        required
      />
      <label for="input-password">Пароль</label>
    </div>
    <button
      type="submit"
      class="mui-btn mui-btn--raised mui-btn--primary"
    >
      Войти
    </button>
  </form> 
    `
}

export function authWithEmailAndpassword(email, password) {
  const key = 'AIzaSyA8pWIn6cXIl-KHX-WripRLIT3ht8vhqgo'
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}
    `,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.idToken)
}

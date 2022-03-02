import '@/styles/styles.css'
import '@/styles/scss.scss'
import { isValid } from '@/utils.js'
import { createModal } from '@/utils.js'
import { Question } from '@/question.js'
import { getAuthForm } from '@/auth.js'
import { authWithEmailAndpassword } from '@/auth.js'

const form = document.getElementById('form')
const modalBtn = document.getElementById('btn-modal')
const input = form.querySelector('#input-question')
const submitBtn = form.querySelector('#btn-question')

modalBtn.addEventListener('click', openModal)
window.addEventListener('load', Question.renderList)
form.addEventListener('submit', handler)
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value)
})

function handler(event) {
  event.preventDefault()

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }

    submitBtn.disabled = true
    Question.create(question).then(() => {
      input.value = ''
      input.className = ''
      submitBtn.disabled = false
    })
  }
}

function openModal() {
  createModal('Авторизация', getAuthForm())
  document
    .getElementById('form-auth')
    .addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(event) {
  event.preventDefault()

  const btn = event.target.querySelector('button')
  const email = event.target.querySelector('#input-email').value
  const password = event.target.querySelector('#input-password').value

  btn.disabled = true
  authWithEmailAndpassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => {
      btn.disabled = false
    })
}

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Ошибка', content)
  } else {
    createModal('Список вопросов', Question.listToHTML(content))
  }
}

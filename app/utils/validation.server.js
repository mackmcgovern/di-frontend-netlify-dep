function isValidName(value) {
  return value && value.trim().length > 0
}
function isValidSubject(value) {
  return value && value.trim().length > 0
}
function isValidEmail(value) {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm'
  )
  const isValidEmailRegex = emailRegex.test(value)
  return value && value.trim().length > 0 && isValidEmailRegex
}
function isValidMessage(value) {
  return value && value.trim().length > 0
}

export function validateFormData(data) {
  let validationErrors = {}

  if (!isValidName(data.name)) {
    validationErrors.name = 'Please enter a name.'
  }
  if (!isValidSubject(data.subject)) {
    validationErrors.subject = 'Please enter a subject.'
  }
  if (!isValidEmail(data.email)) {
    validationErrors.email = 'Please enter a valid email.'
  }
  if (!isValidMessage(data.message)) {
    validationErrors.message = 'Please enter a message.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}

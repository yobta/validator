interface PreventSubmit {
  (event: any): void
}

export const preventSubmit: PreventSubmit = event => {
  if (event?.type === 'submit' && event.preventDefault) {
    event.preventDefault()
  }
}

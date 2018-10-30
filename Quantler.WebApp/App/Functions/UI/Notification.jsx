function displayToastr (data, toastType) {
  toastr[toastType](
    (data.text || ''),
    (data.title || ''),
    (data.options || {}))
}

export function success (data) {
  displayToastr(data, 'success')
}

export function error (data) {
  displayToastr(data, 'error')
}

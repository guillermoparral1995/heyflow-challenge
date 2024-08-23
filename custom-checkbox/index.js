const customCheckbox = document.querySelector('.checkbox-container')
const nativeCheckbox = document.getElementById('native-checkbox')

// Whenever the native checkbox changes, update the custom checkbox
nativeCheckbox?.addEventListener('click', () => {
    customCheckbox.classList.toggle('checked', nativeCheckbox.checked)
})

// Whenever the custom checkbox is focused, add focus to the custom checkbox
nativeCheckbox?.addEventListener('focus', () => {
    customCheckbox.classList.add('focused')
})

// Whenever focus is gone from native checkbox, remove focus from the custom checkbox
nativeCheckbox?.addEventListener('blur', () => {
    customCheckbox.classList.remove('focused')
})

// Prevents focus event from being triggeres when clicking on the native checkbox
nativeCheckbox?.addEventListener('mousedown', (e) => {
    e.preventDefault()
})

// Whenever the custom checkbox is clicked, update the native checkbox
// and prevent focus event from being triggered
// If native checkbox is not present, only apply the checked class to the custom checkbox
customCheckbox?.addEventListener('mousedown', (e) => {
    if (nativeCheckbox) {
        nativeCheckbox.checked = !nativeCheckbox.checked
    }
    customCheckbox.classList.toggle('checked')
    e.preventDefault()
})

// Whenever the custom checkbox is focused, add focus class to the custom checkbox
customCheckbox?.addEventListener('focus', () => {
    customCheckbox.classList.add('focused')
})

// Whenever focus is gone from the custom checkbox, remove focus class from the custom checkbox
customCheckbox?.addEventListener('blur', () => {
    customCheckbox.classList.remove('focused')
})

// Allow checking the custom checkbox with the space key
// If native checkbox is not present, only apply the checked class to the custom checkbox
customCheckbox?.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (nativeCheckbox) {
            nativeCheckbox.checked = !nativeCheckbox.checked
        }
        customCheckbox.classList.toggle('checked')
    }
})
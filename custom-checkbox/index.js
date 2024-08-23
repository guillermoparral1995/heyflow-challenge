const customCheckbox = document.querySelector('.checkbox-container')
const nativeCheckbox = document.getElementById('native-checkbox')

nativeCheckbox?.addEventListener('click', (e) => {
    customCheckbox.classList.toggle('checked', nativeCheckbox.checked)
})

nativeCheckbox?.addEventListener('focus', () => {
    customCheckbox.classList.add('focused')
})

nativeCheckbox?.addEventListener('blur', () => {
    customCheckbox.classList.remove('focused')
})

nativeCheckbox?.addEventListener('mousedown', (e) => {
    e.preventDefault()
})

customCheckbox?.addEventListener('mousedown', (e) => {
    if (nativeCheckbox) {
        nativeCheckbox.checked = !nativeCheckbox.checked
    }
    customCheckbox.classList.toggle('checked')
    e.preventDefault()
})

customCheckbox?.addEventListener('blur', () => {
    customCheckbox.classList.remove('focused')
})

customCheckbox?.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (nativeCheckbox) {
            nativeCheckbox.checked = !nativeCheckbox.checked
        }
        customCheckbox.classList.toggle('checked')
    }
})

customCheckbox?.addEventListener('focus', () => {
    customCheckbox.classList.add('focused')
})
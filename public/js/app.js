console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const detail = document.querySelector('#detail')

weatherForm.addEventListener('submit', (e) => {
    //submit default behavier is to refresh the browser
    e.preventDefault()

    detail.textContent = 'Loading ...'

    const location = searchInput.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                detail.textContent = data.error
            } else {
                detail.textContent = ''
                document.querySelector('#location').textContent = data.location
                document.querySelector('#forecast').textContent = data.forecast
            }
        })
    })
})
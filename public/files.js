const dragdrop = document.getElementById('dragdrop'), file = document.getElementById('file')

const submit = (file) => {
    const formData = new FormData();
    formData.append('file',file)

    fetch('/api/upload', {
        method: 'POSt',
        body: formData
    })
}


const filebutton =  () => {
    file.click()
}

const dragover = ev => {
    ev.stopPropagation()
    ev.preventDefault()
}

const dragenter = (ev)=> {
    ev.stopPropagation()
    ev.preventDefault()
}


const drop = ev => {
    ev.stopPropagation()
    ev.preventDefault()
    const dt = ev.dataTransfer;
    const file = dt.files[0]
    submit(file)
}


const change = ()=> {
    submit(file.files[0])
}

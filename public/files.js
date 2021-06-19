const dragdrop = document.getElementById('dragdrop'), file = document.getElementById('file'), fileroot = document.getElementById('imgroot')

const submit = async (file) => {
    const formData = new FormData();
    formData.append('file',file)

    const response = await fetch('/api/upload', {
        method: 'POSt',
        body: formData
    }).then(a=>a.json())
    fileroot.innerHTML += `<div style="width:33%"><img src="/asset/${await response.id}" style="max-width: 100%;" /></div>`
}

const filebutton = () => {
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
    const file = dt.files
    Array.from(file).forEach(f => submit(f))
}


const change = ()=> {
    Array.from(file.files).forEach(f => {
        submit(f)
    })
}

document.onload = (a)=>copyimg("yes")

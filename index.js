const cvs = document.querySelector('#cvs'),
    ctx = cvs.getContext('2d')

cvs.width = window.innerWidth
cvs.height = window.innerHeight

const szEl = document.querySelector('#size')

const lineWidthStep = .3
let timer,
    mouseDownBool = false,
    lastEvent = false
let lineWidth = 12
let currentColor = '#000'
let lastScroll = window.scrollY
let szTimeout

const mouseDownHandler = (e) => {
    mouseDownBool = true
    ctx.lineWidth = lineWidth
}
const mouseUpHandler = (e) => {
    mouseDownBool = false
}
const mouseMoveHandler = (e) => {
    if(mouseDownBool) {
        if(e.altKey){
            ctx.fillStyle = "#fff"
            ctx.strokeStyle = "#fff";
        }
        else{
            ctx.fillStyle = currentColor
            ctx.strokeStyle = currentColor
        }
        ctx.beginPath()
            ctx.moveTo(lastEvent.clientX,  lastEvent.clientY)
            ctx.lineTo(e.clientX, e.clientY)
            ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
            ctx.arc(e.clientX, e.clientY, lineWidth/2, 0, 2 * Math.PI)
            ctx.fill()
        ctx.closePath()
    }
    lastEvent = e
}


const changeSize = (increase) => {
    increase ? lineWidth+=lineWidthStep : lineWidth-=lineWidthStep
    if(lineWidth<0) lineWidth=0
    lastScroll = window.scrollY

    szEl.style.opacity = 1
    szEl.innerHTML = `${lineWidth.toFixed(1)}px`
    clearTimeout(szTimeout)
    szTimeout = setTimeout( ()=>{
        szEl.style.opacity = 0
    }, 1000 )
}

const scrollHandler = (e) => {
    e.wheelDelta<0 ? changeSize(false) : changeSize(true)
}

const keyData = {
    '1': ['color', 'red'],
    '2': ['color', 'blue'],
    '3': ['color', 'yellow'],
    '4': ['color', 'purple'],
    '5': ['color', 'orange'],
    '6': ['color', 'green'],
    '`': ['color', '#000'],
    '0': ['color', '#000'],
    'w': ['color', '#fff'],

    '=': ['size', 'increase'],
    '-': ['size', 'decrease'],

    'c': [ 'other', 'clear' ]
}

const keydownHandler = (e) => {

    if(!keyData[e.key.toLowerCase()]) return

    let data = keyData[e.key.toLowerCase()]

    switch( data[0] ) {
        case 'color':
            currentColor = data[1]; break
        case 'size':
            changeSize(data[1]==='increase')
        case 'other':
            switch( data[1] ) {
                case 'clear':
                    ctx.clearRect(0, 0, cvs.clientWidth, cvs.clientHeight)
            }
    }
}



window.addEventListener( 'load', (e)=>{
    szEl.innerHTML = `${lineWidth.toFixed(1)}px`
    szTimeout = setTimeout( ()=>{
        szEl.style.opacity = 0
    }, 1000 )


    cvs.addEventListener( 'mousedown', mouseDownHandler )
    cvs.addEventListener( 'mousemove', mouseMoveHandler )
    cvs.addEventListener( 'mouseup', mouseUpHandler )


    window.addEventListener( 'wheel', scrollHandler )
    window.addEventListener( 'keydown', keydownHandler )
} )
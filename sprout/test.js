import interpreter from './interpreter.js'

function messenger(message) {
    console.log(message)
}

interpreter(
    `

let counter be 0
let loop do:
    if counter is less than 5 do:
        say counter
        let counter be counter plus 1
        run loop
        stop
    otherwise if true do:
        say "bruh"
        stop
    stop

run loop

`,
    messenger
)

// interpreter(
//     `
// let counter be 0

// say counter
// `,
//     messenger
// )

/* =============================================================
                        INITIAL FUNCTIONS                      
============================================================= */

// https://stackoverflow.com/a/61511955
const waitForElement = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector))
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector))
                observer.disconnect()
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
    })
}


/* =============================================================
                           DARK THEME
============================================================= */

let darkTheme = false
let extensionStyledTheme = false
let toggle

const updateExtensionStyledTheme = () => {
    document.body.classList.toggle("extension-styled")
    extensionStyledTheme = !extensionStyledTheme
    localStorage.setItem("extensionStyledTheme", extensionStyledTheme)
}

const updateDarkTheme = (shiftPressed = false) => {
    document.body.classList.toggle("no-animation")

    if (shiftPressed || [...document.body.classList].indexOf(".extension-styled") + 1) {
        updateExtensionStyledTheme()
    } 

    document.body.classList.toggle("dark")
    setTimeout(() => document.body.classList.toggle("no-animation"), 200)
    darkTheme = !darkTheme
    localStorage.setItem("darkTheme", darkTheme)
}
    
if (localStorage.getItem("extensionStyledTheme") === "true") {
    updateExtensionStyledTheme()
} else {
    localStorage.setItem("extensionStyledTheme", false)
}

if (localStorage.getItem("darkTheme") === "true") {
    updateDarkTheme()
} else {
    localStorage.setItem("darkTheme", false)
}

document.body.dataset.themeLoaded = true
    
waitForElement("#dark-toggle").then(() => {

    toggle = document.querySelector("#dark-toggle")
    
    if (darkTheme) {
        toggle.innerHTML = '<span class="iconify" data-icon="fa-solid:sun" data-inline="false"></span>'
    } else {
        toggle.innerHTML = '<span class="iconify" data-icon="fa-solid:moon" data-inline="false"></span>'
    }

    toggle.addEventListener("click", event => {
        if (event && event.shiftKey) updateExtensionStyledTheme()
        updateDarkTheme()
            if (darkTheme) {
                toggle.innerHTML = '<span class="iconify" data-icon="fa-solid:sun" data-inline="false"></span>'
            } else {
                toggle.innerHTML = '<span class="iconify" data-icon="fa-solid:moon" data-inline="false"></span>'
            }
    })
        
})

/* =============================================================
                            TOOLTIPS
============================================================= */

$(() => {
    $(document.querySelectorAll('[data-toggle="tooltip"]')).tooltip()
})

let lastTooltipsAmount = 0

const tooltipsObserver = new MutationObserver(mutations => {
    currentTooltipsAmount = document.querySelectorAll('[data-toggle="tooltip"]').length
    if (lastTooltipsAmount !== currentTooltipsAmount) {
        lastTooltipsAmount = currentTooltipsAmount
        $(document.querySelectorAll('[data-toggle="tooltip"]')).tooltip()
    }
    // TODO: I suck at mutations. Wanted try to detect added tooltip-ed elements, but it didn't work because I need to traverse the element tree.
    // console.log(mutations)
    // mutations.forEach(mutation => {
    //     console.log(mutation)
    //     console.log(mutation.addedNodes)
    //     if (mutation.type === "childList" && mutation.addedNodes.length) {
    //         console.log(mutation.addedNodes)
    //         mutation.addedNodes.forEach(node => {
    //             console.log(node)
    //             if (node.matches('[data-toggle="tooltip"]')) $(node).tooltip()
    //         })
    //     }
    // })
})

tooltipsObserver.observe(document.body, {
    childList: true,
    subtree: true
})

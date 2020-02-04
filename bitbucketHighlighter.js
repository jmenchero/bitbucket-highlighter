extensionsMap = {
    js: 'javascript',
    ts: 'typescript',
    ejs: 'javascript',
    json: 'json',
    sql: 'sql',
    py: 'python'
}

function getExtensionFromDiffBlock(block) {
    const filename = block.querySelectorAll('.filename')[0].innerText
    const extensionRegex = /.([a-z]*)[^.]*$/g
    return extensionRegex.exec(filename)[1]
}

function highlightAll() {
    const diffBlocks = document.querySelectorAll('.diff-container')
    diffBlocks.forEach(block =>{
        try {
            highlightBlock(block)
        } catch {
            return
        }
    })
}

function highlightBlock(block) {
    const extension = getExtensionFromDiffBlock(block)
    const language = extensionsMap[extension]

    const codeLines = block.querySelectorAll('pre.source')
    codeLines.forEach(line => {
        highlight = hljs.highlight(language, line.innerText)
        line.innerHTML = highlight.value
    })
}

// Trigger
setTimeout(highlightAll, 5000)

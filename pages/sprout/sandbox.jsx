import React, { useState, useEffect, useRef } from 'react'
import styles from './sandbox.module.css'
import interpreter from '../../sprout/interpreter'
import highlighter from '../../sprout/highlighter'

import NotOnMobile from '../../components/NotOnMobile'
import Header from '../../components/sprout/Header'

export default function Sandbox() {
    const [isMobile, setIsMobile] = useState(null)
    const [editorValue, setEditorValue] = useState('')
    const [outputValue, setOutputValue] = useState('')

    const editorRef = useRef()

    useEffect(() => {
        setIsMobile(
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        )
    }, [setIsMobile])

    useEffect(() => {
        if (editorRef.current) editorRef.current.focus()
    }, [editorRef.current])

    const updateEditor = e => setEditorValue(e.target.value)

    const handleTyping = e => {
        const tabSize = 4
        const tab = new Array(tabSize)
            .fill()
            .map(_ => ' ')
            .join('')

        switch (e.code) {
            case 'Tab':
                e.preventDefault()

                const cursorPosition = e.target.selectionStart

                let newEditorValue =
                    editorValue.substring(0, cursorPosition) +
                    tab +
                    editorValue.substring(e.target.selectionEnd)

                setEditorValue(v => newEditorValue)

                break
            case 'Backspace':
                if (
                    editorValue.substring(
                        e.target.selectionStart - tabSize,
                        e.target.selectionStart
                    ) !== tab
                )
                    break

                console.log('bruh')

                e.preventDefault()
                newEditorValue =
                    editorValue.substring(
                        0,
                        e.target.selectionStart - tabSize
                    ) + editorValue.substring(e.target.selectionStart)

                setEditorValue(v => newEditorValue)

                break
        }
    }

    const handleSetOutputValue = message =>
        setOutputValue(v => `${v}\n${message}`)

    const handleRun = () => {
        setOutputValue(_ => '')

        handleSetOutputValue('Running...')

        interpreter(editorValue, handleSetOutputValue)
    }

    if (isMobile == null) return <></>

    if (isMobile) return <NotOnMobile />

    return (
        <>
            <Header />
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <h1 className={styles.heading}>Sprout Sandbox</h1>
                    <div className={styles.boxContainer}>
                        <div className={[styles.box, styles.input].join(' ')}>
                            <p className={styles.subHeading}>Input</p>
                            <textarea
                                className={styles.editor}
                                ref={editorRef}
                                value={editorValue}
                                onKeyDown={handleTyping}
                                onChange={updateEditor}
                                spellCheck="false"
                                placeholder="Type your code here..."
                            />
                            <div className={styles.editorHighlight}>
                                {highlighter(editorValue)}
                            </div>
                            <div className={styles.buttonContainer}>
                                <div
                                    className={styles.runButton}
                                    onClick={handleRun}
                                >
                                    Run
                                </div>
                            </div>
                        </div>
                        <div className={[styles.box, styles.output].join(' ')}>
                            {' '}
                            <p className={styles.subHeading}>Output</p>
                            <div className={styles.outputText}>
                                {outputValue
                                    .split('\n')
                                    .map((line, i) => (
                                        <font key={i}>
                                            {line}
                                            <br />
                                        </font>
                                    ))
                                    .slice(1)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

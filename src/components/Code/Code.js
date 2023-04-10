import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Prism from 'prismjs'
import 'prism-themes/themes/prism-one-dark.min.css'

import { currentStepSelector } from '~/redux/selectors'
import styles from './Code.module.scss'

const cx = classNames.bind(styles)

function Code({ title = '', language = 'text', code, lineNumbers = true, lineHighlight }) {
    const currentStep = useSelector(currentStepSelector)

    const [copied, setCopied] = useState(false)
    const codeRef = useRef(null)

    useEffect(() => {
        Prism.highlightAll()
    }, [lineHighlight])

    useEffect(() => {
        if (window.innerWidth <= 1116) {
            const codeEl = codeRef.current
            const intervalId = setInterval(() => {
                const lineHighlightEl = codeEl.querySelector('div')

                if (lineHighlightEl) {
                    codeEl.scrollTo({
                        top: lineHighlightEl.offsetTop - codeEl.offsetTop - 21,
                        behavior: 'smooth',
                    })

                    clearInterval(intervalId)
                }
            })

            setTimeout(() => {
                clearInterval(intervalId)
            }, 100)
        }
    }, [currentStep])

    const handleCopy = () => {
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <div className={cx('wrapper')}>
            {title && (
                <div className={cx('header')}>
                    <h2 className={cx('title')}>{title}</h2>
                </div>
            )}
            <pre
                ref={codeRef}
                className={cx('code-wrap', { lineNumbers, 'line-numbers': lineNumbers })}
                data-line={lineHighlight}
            >
                <code className={`language-${language}`}>{code.trim()}</code>
            </pre>
            {copied ? (
                <button className={cx('copy-btn')}>
                    <Icon icon="ic:round-check" />
                    Copied!
                </button>
            ) : (
                <CopyToClipboard text={code.trim()} onCopy={handleCopy}>
                    <button className={cx('copy-btn')}>
                        <Icon icon="fluent:document-copy-48-regular" />
                        Copy
                    </button>
                </CopyToClipboard>
            )}
        </div>
    )
}

export default Code

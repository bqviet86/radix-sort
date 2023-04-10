import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Code from '~/components/Code'
import { RADIX_SORT_CODE_DESCRIPTION } from '~/constants'
import { currentStepSelector, firstRunSelector, processSelector, sortSelector } from '~/redux/selectors'
import styles from './CodeDescription.module.scss'

const cx = classNames.bind(styles)

function CodeDescription() {
    const process = useSelector(processSelector)
    const sort = useSelector(sortSelector)
    const currentStep = useSelector(currentStepSelector)
    const firstRun = useSelector(firstRunSelector)

    const [showCodeDesc, setShowCodeDesc] = useState(false)
    const [desc, setDesc] = useState([])
    const [lineHighlight, setLineHighlight] = useState('')

    useEffect(() => {
        if (sort && firstRun) {
            setShowCodeDesc(sort)
        }
    }, [sort, firstRun])

    useEffect(() => {
        if (currentStep !== -1) {
            setDesc(process[currentStep].code.description)
            setLineHighlight(process[currentStep].code.highlight)
        } else {
            setDesc([])
            setLineHighlight('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep])

    const handleShowCodeDesc = () => {
        setShowCodeDesc(true)
    }

    const handleHideCodeDesc = () => {
        setShowCodeDesc(false)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('show-btn')} onClick={handleShowCodeDesc}>
                <Icon icon="tabler:arrow-left" />
            </div>
            <div className={cx('codeDesc-wrap', { show: showCodeDesc })}>
                <div className={cx('desc')}>
                    {desc.map((text, index) => (
                        <React.Fragment key={index}>
                            {text}
                            {index < desc.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </div>
                <Code language="js" code={RADIX_SORT_CODE_DESCRIPTION} lineHighlight={lineHighlight} />
                <div className={cx('close-btn')} onClick={handleHideCodeDesc}>
                    <Icon icon="ph:x-bold" />
                </div>
            </div>
        </div>
    )
}

export default CodeDescription

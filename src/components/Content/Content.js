import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import NumberItem from '~/components/NumberItem'
import { currentStepSelector, listSelector, processSelector, sortSelector, speedSelector } from '~/redux/selectors'
import { currentStepSlice, firstRunSlice, sortSlice } from '~/redux/slice'
import styles from './Content.module.scss'

const cx = classNames.bind(styles)

function Content() {
    const dispatch = useDispatch()
    const list = useSelector(listSelector)
    const process = useSelector(processSelector)
    const sort = useSelector(sortSelector)
    const currentStep = useSelector(currentStepSelector)
    const speed = useSelector(speedSelector)

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 936)
    const stepRef = useRef(currentStep)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 936)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        stepRef.current = currentStep
    }, [currentStep])

    useEffect(() => {
        if (process.length && sort) {
            const intervalId = setInterval(() => {
                if (stepRef.current + 1 < process.length) {
                    dispatch(currentStepSlice.actions.update(stepRef.current + 1))
                } else {
                    dispatch(sortSlice.actions.pause())
                }
            }, 500 / speed)

            dispatch(firstRunSlice.actions.update(false))

            return () => clearInterval(intervalId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process, sort, speed])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                {list.map((number, index) => (
                    <NumberItem
                        key={index}
                        index={index}
                        number={number}
                        speed={speed}
                        mobile={isMobile}
                        state={
                            currentStep !== -1 && process[currentStep] ? process[currentStep].list[index] : currentStep
                        }
                    />
                ))}
            </div>
            <div className={cx('buckets-wrap')}>
                {Array(10)
                    .fill(true)
                    .map((_, index) => (
                        <div
                            key={index}
                            className={cx('bucket')}
                            style={isMobile ? { top: 60 * index } : { left: 15 + 60 * index }}
                        >
                            {index}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Content

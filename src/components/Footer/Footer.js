import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { currentStepSelector, firstRunSelector, processSelector, sortSelector } from '~/redux/selectors'
import { currentStepSlice, sortSlice } from '~/redux/slice'
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
    const dispatch = useDispatch()
    const process = useSelector(processSelector)
    const sort = useSelector(sortSelector)
    const currentStep = useSelector(currentStepSelector)
    const firstRun = useSelector(firstRunSelector)

    const [sortState, setSortState] = useState('play')
    const rangeStep = 100 / process.length
    const rangeValue = (currentStep + 1) * rangeStep

    useEffect(() => {
        if (currentStep === process.length - 1) {
            setSortState('end')
        } else if (sort) {
            setSortState('play')
        } else {
            setSortState('pause')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, currentStep])

    const handleFirstStep = () => {
        if (!firstRun && currentStep > -1) {
            dispatch(sortSlice.actions.pause())
            dispatch(currentStepSlice.actions.update(-1))
        }
    }

    const handleLastStep = () => {
        if (!firstRun && currentStep < process.length - 1) {
            dispatch(currentStepSlice.actions.update(process.length - 1))
        }
    }

    const handlePrevStep = () => {
        if (!firstRun && currentStep > -1) {
            dispatch(currentStepSlice.actions.update(currentStep - 1))
        }
    }

    const handleNextStep = () => {
        if (!firstRun && currentStep < process.length - 1) {
            dispatch(currentStepSlice.actions.update(currentStep + 1))
        }
    }

    const handleClickPlayBtn = () => {
        if (!firstRun) {
            if (sortState === 'play') {
                dispatch(sortSlice.actions.pause())
            } else if (sortState === 'pause') {
                dispatch(sortSlice.actions.play())
            } else {
                dispatch(sortSlice.actions.play())
                dispatch(currentStepSlice.actions.update(-1))
            }
        }
    }

    const handleChangeRange = (value) => {
        if (!firstRun) {
            const currentStepUpdate = Math.round(value / rangeStep - 1)

            if (currentStepUpdate !== currentStep) {
                dispatch(currentStepSlice.actions.update(currentStepUpdate))
            }
        }
    }

    return (
        <footer className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('controls')}>
                    <div className={cx('control-btn')} onClick={handleFirstStep}>
                        <Icon icon="mdi:skip-previous" />
                    </div>
                    <div className={cx('control-btn')} onClick={handlePrevStep}>
                        <Icon icon="tabler:player-track-prev-filled" style={{ fontSize: 16 }} />
                    </div>
                    <div className={cx('control-btn', 'play')} onClick={handleClickPlayBtn}>
                        {sortState === 'play' && <Icon icon="material-symbols:pause-outline" />}
                        {sortState === 'pause' && <Icon icon="material-symbols:play-arrow" />}
                        {sortState === 'end' && <Icon icon="mdi:loop" />}
                    </div>
                    <div className={cx('control-btn')} onClick={handleNextStep}>
                        <Icon icon="tabler:player-track-next-filled" style={{ fontSize: 16 }} />
                    </div>
                    <div className={cx('control-btn')} onClick={handleLastStep}>
                        <Icon icon="mdi:skip-next" />
                    </div>
                </div>

                <div className={cx('time-line')}>
                    <input
                        type="range"
                        className={cx('range')}
                        value={`${rangeValue}`}
                        step={0.01}
                        min="0"
                        max="100"
                        onInput={(e) => handleChangeRange(e.target.value)}
                    />
                    <div className={cx('progress-wrap')}>
                        <div className={cx('progress')} style={{ width: `${rangeValue}%` }}></div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

import classNames from 'classnames/bind'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeadlessTippy from '@tippyjs/react/headless'

import { currentStepSlice, firstRunSlice, listSlice, processSlice, sortSlice, speedSlice } from '~/redux/slice'
import { speedList } from '~/constants'
import { speedSelector } from '~/redux/selectors'
import { randomList } from '~/utils'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function Menu({ children }) {
    const dispatch = useDispatch()
    const speed = useSelector(speedSelector)

    const [listValue, setListValue] = useState('')
    const [numberValue, setNumberValue] = useState('15')
    const [maxValue, setMaxValue] = useState('9999')
    const [error, setError] = useState('')

    const confirmListValue = (prev, value) => (/^[0-9, ]*$/.test(value) ? value : prev)

    const confirmNumber = (prev, value) => (/^[0-9]*$/.test(value) ? value : prev)

    const createList = (list) => {
        setError('')

        dispatch(listSlice.actions.create(list))
        dispatch(processSlice.actions.create(list))
        dispatch(sortSlice.actions.pause())
        dispatch(currentStepSlice.actions.update(-1))
        dispatch(firstRunSlice.actions.update(true))
    }

    const handleGenerateList = () => {
        const list = listValue.split(',').map((value) => value.trim())
        const length = list.length

        for (let i = 0; i < length; i++) {
            if (list[i] === '') {
                setError('There seems to be a missing element')
                return
            } else if (Number(list[i]) < 1 || Number(list[i]) > 9999) {
                setError(
                    `Sorry, List field is restricted to values between 1 and 9999 inclusive (Out of range number: ${list[i]})`,
                )
                return
            }
        }

        if (length > 15) {
            setError("List field can't have more than 15 elements!")
            return
        }

        if (length < 8) {
            setError("List field can't have less than 8 elements!")
            return
        }

        createList(list.map((value) => Number(value)))
    }

    const handleRandomList = () => {
        if (Number(numberValue) < 8 || Number(numberValue) > 15) {
            setError('Sorry, Number field is restricted to values between 8 and 15 inclusive')
            return
        }

        if (Number(maxValue) < 99 || Number(maxValue) > 9999) {
            setError('Sorry, Max value field is restricted to values between 99 and 9999 inclusive')
            return
        }

        createList(randomList(numberValue, maxValue))
    }

    const handleChangeSpeed = (value) => {
        dispatch(speedSlice.actions.update(value))
    }

    return (
        <HeadlessTippy
            arrow
            interactive
            hideOnClick
            trigger="click"
            placement="bottom-end"
            render={(attrs) => (
                <ul className={cx('menu-list')} data-popper-placement="top" tabIndex="-1" {...attrs}>
                    <li className={cx('menu-item')}>
                        <div className={cx('menu-set')}>
                            <label htmlFor="list">List:</label>
                            <div className={cx('input-wrap')}>
                                <input
                                    id="list"
                                    placeholder="Value of elements"
                                    spellCheck={false}
                                    value={listValue}
                                    onChange={(e) => {
                                        setError('')
                                        setListValue((prev) => confirmListValue(prev, e.target.value))
                                    }}
                                />
                                <span></span>
                            </div>
                        </div>
                    </li>

                    <li className={cx('menu-item')}>
                        <div className={cx('menu-btn-wrap')}>
                            <div className={cx('menu-btn')} onClick={handleGenerateList}>
                                <span>Create</span>
                                <Icon icon="tabler:arrow-right" />
                            </div>
                        </div>
                    </li>

                    <li className={cx('menu-item')}>
                        <div className={cx('menu-desc')}>
                            <span>
                                <strong>List: </strong>
                                The elements of the list are integers and are separated by ","
                            </span>
                            {/* <span>
                                <strong>Create button: </strong> will generate a list by the field <strong>List</strong>
                            </span> */}
                        </div>
                    </li>

                    <li className={cx('menu-item')}>
                        <div className={cx('menu-set')}>
                            <label htmlFor="number">Number: </label>
                            <div className={cx('input-wrap')}>
                                <input
                                    id="number"
                                    placeholder="Number of elements"
                                    spellCheck={false}
                                    value={numberValue}
                                    onChange={(e) => {
                                        setError('')
                                        setNumberValue((prev) => confirmNumber(prev, e.target.value))
                                    }}
                                />
                                <span></span>
                            </div>
                        </div>
                    </li>

                    <li className={cx('menu-item')}>
                        <div className={cx('menu-set')}>
                            <label htmlFor="max-value">Max value:</label>
                            <div className={cx('input-wrap')}>
                                <input
                                    id="max-value"
                                    placeholder="Max value of elements"
                                    spellCheck={false}
                                    value={maxValue}
                                    onChange={(e) => {
                                        setError('')
                                        setMaxValue((prev) => confirmNumber(prev, e.target.value))
                                    }}
                                />
                                <span></span>
                            </div>
                        </div>
                    </li>

                    <li className={cx('menu-item')}>
                        <div className={cx('menu-btn-wrap')}>
                            <div className={cx('menu-btn')} onClick={handleRandomList}>
                                <span>Random</span>
                                <Icon icon="el:random" />
                            </div>
                        </div>
                    </li>

                    <li className={cx('menu-item')}>
                        <div className={cx('menu-desc')}>
                            <span>
                                <strong>Number: </strong>
                                The number of elements (limited from 8 to 15)
                            </span>
                            <span>
                                <strong>Max value: </strong>
                                The max value of elements (limited from 99 to 9999)
                            </span>
                            {/* <span>
                                <strong>Random button: </strong> will generate a random list with the number of elements
                                as <strong>Number</strong> and limited from 1 to <strong>Max value</strong>
                            </span> */}
                        </div>
                    </li>

                    <li className={cx('menu-item')}>
                        <div className={cx('menu-speed-wrap')}>
                            <div className={cx('title')}>Speed: </div>
                            <div className={cx('speed-btn-wrap')}>
                                {speedList.map((value, index) => (
                                    <div
                                        key={index}
                                        className={cx('speed-btn', { primary: value === speed })}
                                        onClick={() => handleChangeSpeed(value)}
                                    >
                                        {value}x
                                    </div>
                                ))}
                            </div>
                        </div>
                    </li>

                    {error && (
                        <li className={cx('menu-item')}>
                            <div className={cx('menu-error')}>
                                <Icon icon="ph:x-circle-fill" />
                                <span>{error}</span>
                            </div>
                        </li>
                    )}

                    <div className={cx('arrow')} data-popper-arrow></div>
                </ul>
            )}
        >
            {children}
        </HeadlessTippy>
    )
}

export default Menu

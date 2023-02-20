import classNames from 'classnames/bind'
// import { Icon } from '@iconify/react'
// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Menu from '~/components/Menu'
// import Code from '~/components/Code'
// import { RADIX_SORT_CODE } from '~/constants'
import { sortSelector } from '~/redux/selectors'
import { currentStepSlice, sortSlice } from '~/redux/slice'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    const dispatch = useDispatch()
    const sort = useSelector(sortSelector)

    // const [showFullCode, setShowFullCode] = useState(false)

    const handlePlaySort = () => {
        if (!sort) {
            dispatch(sortSlice.actions.play())
            dispatch(currentStepSlice.actions.update(-1))
        }
    }

    // const handleShowFullCode = () => {
    //     setShowFullCode(true)
    // }

    // const handleHideFullCode = () => {
    //     setShowFullCode(false)
    // }

    // const handleStopPropagation = (e) => {
    //     e.stopPropagation()
    // }

    return (
        <>
            <header className={cx('header')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <a href="/">Radix Sort</a>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('btn', 'primary')} onClick={handlePlaySort}>
                            Sort
                        </div>
                        {/* <div className={cx('btn')} onClick={handleShowFullCode}>
                            Full code
                        </div> */}
                        <Menu>
                            <div className={cx('btn')}>Setting</div>
                        </Menu>
                    </div>
                </div>
            </header>
            {/* <div className={cx('overlay', { show: showFullCode })} onClick={handleHideFullCode}>
                <div className={cx('full-code')} onClick={handleStopPropagation}>
                    <div className={cx('close-btn')} onClick={handleHideFullCode}>
                        <Icon icon="ph:x-bold" />
                    </div>
                    <Code title="Radix sort (Js)" language="js" code={RADIX_SORT_CODE} />
                </div>
            </div> */}
        </>
    )
}

export default Header

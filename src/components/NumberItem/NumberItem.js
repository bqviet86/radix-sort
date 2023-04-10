import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { currentStepSelector } from '~/redux/selectors'
import styles from './NumberItem.module.scss'

const cx = classNames.bind(styles)

function NumberItem({ index, number, speed, mobile, state }) {
    const currentStep = useSelector(currentStepSelector)

    const initStyle = {
        pc: { inset: `0 auto auto ${15 + 60 * index}px` },
        mobile: { inset: `${34 * index}px auto auto calc(100% - 58px)` },
        // mobile: { inset: `${34 * index}px auto auto 8px` },
    }
    const [style, setStyle] = useState(mobile ? initStyle.mobile : initStyle.pc)

    const numberArr = `${number}`.split('')

    useEffect(() => {
        if (state.area === 'list') {
            setStyle(
                mobile
                    ? {
                          inset: `${34 * state.position}px auto auto calc(100% - 58px)`,
                          // inset: `${34 * state.position}px auto auto 8px`,
                      }
                    : { inset: `0 auto auto ${15 + 60 * state.position}px` },
            )
        } else if (state.area === 'bucket') {
            setStyle(
                mobile
                    ? {
                          inset: `${60 * state.position}px auto auto ${66 + 34 * state.level}px`,
                          rotate: '90deg',
                          transformOrigin: 'top left',
                          // inset: `${60 * state.position}px auto auto calc(100% - ${116 + 34 * state.level}px)`,
                          // rotate: '-90deg',
                          // transformOrigin: 'top right',
                      }
                    : { inset: `calc(100% - ${54 + 30 * state.level}px) auto auto ${15 + 60 * state.position}px` },
            )
        }
    }, [mobile, state])

    useEffect(() => {
        if (currentStep === -1) {
            setStyle(mobile ? initStyle.mobile : initStyle.pc)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep, mobile])

    return (
        <div
            className={cx('item')}
            style={{
                ...style,
                transition: `all ${0.25 / speed}s ease-in-out`,
            }}
        >
            {numberArr.map((item, index) =>
                index === numberArr.length - state.digit - 1 ? <span key={index}>{item}</span> : item,
            )}
        </div>
    )
}

export default NumberItem

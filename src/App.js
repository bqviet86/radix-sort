import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from '~/components/Header'
import Content from '~/components/Content'
import CodeDescription from '~/components/CodeDescription'
import Footer from '~/components/Footer'
import { listSlice, processSlice } from './redux/slice'
import { randomList } from './utils'
import styles from './App.module.scss'

const cx = classNames.bind(styles)

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const payload = randomList(15, 9999)

        dispatch(listSlice.actions.create(payload))
        dispatch(processSlice.actions.create(payload))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>
                <Content />
                <CodeDescription />
            </div>

            <Footer />
        </div>
    )
}

export default App

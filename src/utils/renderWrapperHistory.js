import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../app/store'
import { BrowserRouter, MemoryRouter, Route, Routes} from 'react-router-dom'

export default (component) => {
    rtlRender(
        <Provider store={store}>
            {component}
        </Provider>
)}

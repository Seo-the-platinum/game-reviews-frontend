import { fireEvent, render } from '@testing-library/react'
import App from './App';
import store from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

describe(App, ()=> {
  test('test app is there', ()=> {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
      )
      const app = getByRole('app')
      expect(app).toBeInTheDocument()
  })
})

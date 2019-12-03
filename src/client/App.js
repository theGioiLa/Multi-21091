import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { routes } from './routes'
import { SiteWrapper } from './components'

export default function App(props) {
    return (
        <Router basename='/online/'>
            <Switch>
                <SiteWrapper routes={routes}>
                    <Switch>
                        {routes.map((route, id) => <Route exact key={id} {...route} />)}
                    </Switch>
                </SiteWrapper>
            </Switch>
        </Router>
    )
}


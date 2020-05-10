import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route
} from "react-router-dom";
import {Layout} from 'antd';
import CompaniesList from "./pages/CompaniesList";
import Company from "./pages/Company";
import './App.css';

const {Content, Footer} = Layout;

function App() {
    return (
        <Layout className="layout">
            <Content className="content">
                <Router>
                    <Switch>
                        <Route exact path="/companies">
                            <CompaniesList />
                        </Route>
                        <Route exact path="/companies/:companyId">
                            <Company />
                        </Route>
                        <Route path="/*">
                            <Redirect to="/companies" />
                        </Route>
                    </Switch>
                </Router>
            </Content>
            <Footer style={{textAlign: 'center'}}>REST -> GraphQL migration</Footer>
        </Layout>
    );
}

export default App;

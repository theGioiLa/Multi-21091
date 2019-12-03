import React, { PureComponent } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import './style.css'
const { Header, Content, Footer } = Layout

class SiteWrapper extends PureComponent {
    render() {
        const { routes = {} } = this.props
        const currentPage = this.props.location.pathname
        console.log
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[currentPage]}
                        style={{ lineHeight: '64px' }}
                    >
                        {
                            routes.map((route, id) => {
                                return (
                                    <Menu.Item key={route.path}>
                                        <Link to={route.path}>
                                            {route.label}
                                        </Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <div style={{ background: '#fff', margin: '16px 0 ', padding: 24, minHeight: 600 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Audio/MV sharing online system</Footer>
            </Layout >
        )
    }
}

export default withRouter(SiteWrapper)
import React, {Component} from 'react'
import Table from "./Table";
import Form from "./Form";

class App extends Component {
    state = {
        url_items: []
    }

    removeItem = (index) => {
        const {url_items} = this.state

        this.setState({
            url_items: url_items.filter((item, i) => {
                return i !== index
            }),
        })
    }

    handleSubmit = (url_item) => {
        this.setState({url_items: [...this.state.url_items, url_item]})
    }

    render() {
        const {url_items} = this.state

        return (
            <div className="container">
                <h1>URL Shortener</h1>
                <Form handleSubmit={this.handleSubmit}/>
                <Table urlItems={url_items} removeItem={this.removeItem}/>
            </div>
        )
    }
}

export default App
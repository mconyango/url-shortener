import React, {Component} from 'react'
import Table from "./Table";
import Form from "./Form";
import config from "./config.json";

class App extends Component {
    state = {
        error: null,
        isLoaded: false,
        url_items: []
    }

    componentDidMount() {
        fetch(config.SERVER_URL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        url_items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    removeItem = (index) => {
        const {url_items} = this.state

        this.setState({
            url_items: url_items.filter((item, i) => {
                return i !== index
            }),
        })
    }

    render() {
        const {error, isLoaded, url_items} = this.state;
        if (error) {
            return <div className="container">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="container">Loading...</div>;
        } else {
            return (
                <div className="container">
                    <h1>URL Shortener</h1>
                    <Form handleSubmit={this.handleSubmit}/>
                    <Table urlItems={url_items} removeItem={this.removeItem}/>
                </div>
            )
        }
    }
}

export default App
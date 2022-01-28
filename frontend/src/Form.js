import React, {Component} from 'react'
import config from "./config.json"

class Form extends Component {
    initialState = {
        original_url: '',
    }

    state = this.initialState

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {original_url,} = this.state;
        try {
            let res = await fetch(config.SERVER_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    original_url: original_url
                }),
            });
            let resJson = await res.json();
            console.log(resJson)
            if (res.status === 201) {
                this.setState(this.initialState)
                //reload the table
                this.props.reloadData()
            } else {
                // error occurred.
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const {original_url,} = this.state;

        return (
            <form id="form" onSubmit={this.handleSubmit}>
                <div className="flex-row">
                    <div className="flex-large" style={{flex: "0 0 calc(5 / 6 * 100%)"}}>
                        <input
                            type="url"
                            name="original_url"
                            id="original_url"
                            value={original_url}
                            required="required"
                            placeholder="Copy and Paste a URL here e.g https://getbootstrap.com/docs/5.1/forms/overview"
                            onChange={this.handleChange}/>
                    </div>
                    <div className="flex-large" style={{flex: "0 0 calc(1 / 6 * 100%)"}}>
                        <input type="submit" value="Shorten"/>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;
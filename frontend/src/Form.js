import React, {Component} from 'react'
import config from "./config.json"

const ShowApiError = (api_error) => {
    const message=api_error.api_error.detail[0].msg
    return (
        <p className="error-message">
            {message}
        </p>
    )
}

class Form extends Component {
    initialState = {
        original_url: '',
        has_error: false,
        api_error: null
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
            if (res.status === 201) {
                this.setState(this.initialState)
                //reload the table
                this.props.reloadData()
            } else {
                // error occurred.
                this.setState({
                    ...this.state,
                    has_error: true,
                    api_error: resJson
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const {original_url, has_error, api_error,} = this.state;
        let error_message;
        if (has_error) {
            error_message = <ShowApiError api_error={api_error}/>
        } else {
            error_message = ''
        }
        return (
            <form id="form" onSubmit={this.handleSubmit}>
                <div className="flex-row">
                    <div className="flex-large" style={{flex: "0 0 calc(5 / 6 * 100%)"}}>
                        <input
                            className=""
                            type="url"
                            name="original_url"
                            id="original_url"
                            value={original_url}
                            required="required"
                            placeholder="Copy and Paste a URL here e.g https://getbootstrap.com/docs/5.1/forms/overview"
                            onChange={this.handleChange}/>
                        {error_message}
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
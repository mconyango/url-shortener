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
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="original_url">Shorten Your Link</label>
                <input
                    type="url"
                    name="original_url"
                    id="original_url"
                    value={original_url}
                    required="required"
                    placeholder="e.g https://wwww.twitter.com"
                    onChange={this.handleChange}/>

                <input type="submit" value="Shorten"/>
            </form>
        );
    }
}

export default Form;
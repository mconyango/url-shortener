import React, {Component} from 'react'

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

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }

    render() {
        const {original_url,} = this.state;

        return (
            <form>
                <label htmlFor="original_url">Shorten Your Link</label>
                <input
                    type="text"
                    name="original_url"
                    id="original_url"
                    value={original_url}
                    onChange={this.handleChange}/>

                <input type="button" value="Shorten" onClick={this.submitForm}/>
            </form>
        );
    }
}

export default Form;
import React from "react";

export default class Base extends React.Component {
    render() {

        return (
            <div>
                {this.props.children}
            </div>

        );
    }
}

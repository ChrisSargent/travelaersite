import React, { Component } from "react";
import Logo from "../logo"
import Nav from "../nav"

export default class Header extends Component {
    constructor(props) {
        super();
    }

    render() {

        return (
            <header>
                <Logo />
                <Nav location="primary"/>
            </header>
        );
    }
}

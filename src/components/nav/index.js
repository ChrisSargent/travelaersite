import React, {Component} from "react";

import * as NavActions from "./NavActions";
import NavStore from "./NavStore";
import { Link } from "react-router";

export default class Nav extends Component {
    constructor(props) {
        super();
        this.requestMenu = this.requestMenu.bind(this); // This just ensures we're always binding properly to this.requestMenu
        this.state = {
            data: false
        };
        this.location = props.location;
    }

    componentWillMount() {
        // Instruct the actions to fetch the menu
        NavActions.fetchMenu(this.location);

        // When the NavStore has received the new info, it will trigger this change event handler
        NavStore.on("change", this.requestMenu);
    }

    componentWillUnmount() {
        NavStore.removeListener("change", this.requestMenu);
    }

    requestMenu() {
        // This is called when there is a change to the store and requests the new information from the store.
        console.log('Nav | requestMenu');
        this.setState({data: NavStore.menu()});
    }

    render() {

        if (this.state.data) {
            const {menu} = this.state.data;
            console.log(menu);

            const MenuItems = menu.map((item) => {
                return <li key={item.ID}>
                    <Link to={item.object_slug}>{item.title}</Link>
                </li>;
            });

            return (
                <nav>
                    <ul>
                        {MenuItems}
                    </ul>
                </nav>
            );

        } else {
            return null;
        }
    }
}

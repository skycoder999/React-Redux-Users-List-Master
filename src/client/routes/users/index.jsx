import React, {Component} from "react";
import {getUsers} from "../../actions/index";
import {connect} from "react-redux";
import {Table, Avatar, message, Button} from "antd";
import "./index.css";
/**
 * @description Users Component
 * @type Component
 *
 */
class Main extends Component {

    /**
     * Container
     * @param props
     */
    constructor(props) {
        super(props);
        this.columns = [{
            title: "Avatar",
            key: "image",
            dataIndex: "image",
            render: ((val) => {
                return <Avatar src = {val}/>;
            })
        }, {
            title: "Name",
            key: "name",
            dataIndex: "name"
        }, {
            title: "Email Address",
            key: "email",
            dataIndex: "email"
        }, {
            title: "Bitcoin Address",
            key: "bitcoinAddress",
            dataIndex: "bitcoinAddress"
        }];
        this.state = {
            loading: false
        };
        this.getUsers = this.getUsers.bind(this);
    }
    /**
     * Get Users
     * @returns {Promise.<void>}
     */
    async getUsers() {
        message.destroy();
        const {getData} = this.props;
        this.setState({
            loading: true
        });
        const response = await getData();
        if (response.error) {
            message.error("Error while fetching User list");
        } else {
            message.success("Welcome to the application");
        }
        this.setState({
            loading: false
        });
    }
    /**
     * Render Method
     * @returns {*}
     */
    render() {
        const {data} = this.props;
        const {loading} = this.state;
        return (
            <div>
                <div className="header-bar">
                    <Button
                        type="primary"
                        onClick={this.getUsers}
                        disabled={loading}
                        loading={loading}
                    >
                        Reload Data
                    </Button>
                </div>
                <Table
                    rowKey={"id"}
                    loading={loading}
                    dataSource={data}
                    columns={this.columns}
                />
            </div>
        );
    }
}

Main.displayName = "Users";

/**
 * Bind Actions to Redux
 * @param dispatch
 * @returns Object
 */
const bindAction = (dispatch) => {
    return {
        getData: () => {
            return dispatch(getUsers());
        }
    };
};
/**
 * Map redux state to container properties
 * @param state
 * @returns Object
 */
const mapStateToProps = ({users}) => {
    return {
        data: users
    };
};

export default connect(mapStateToProps, bindAction)(Main);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import IUser from '../types/user.type';
import IList from '../types/list.type';
import "../assets/css/home.css"

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const debounce = require('lodash.debounce');

type Props = {};

type State = {
    currentUser: IUser | undefined,
    content: string,
    error: boolean,
    hasMore: boolean,
    isLoading: boolean,
    list: Array<IList>,
    offset: number
}

export default class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentUser: undefined,
            content: "",
            error: false,
            hasMore: true,
            isLoading: false,
            list: [],
            offset: 6
        };

        window.onscroll = debounce(() => {
            const {
                loadApods,
                state: {
                    error,
                    isLoading,
                    hasMore,
                },
            } = this;

            if (error || isLoading || !hasMore) return;

            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                loadApods();
                let newOffset = this.state.offset;
                newOffset++;
                this.setState({
                    offset: newOffset
                });
            }
        }, 100);
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (!user) {
            UserService.getPublicContent().then(
                response => {
                    this.setState({
                        content: response.data
                    });
                },
                error => {
                    this.setState({
                        content:
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
        } else {
            this.setState({
                currentUser: user,
                content: "Hello"
            });
            for(let i = 0; i < 5; i++) {
                UserService.getPrivateContent((i + 1)).then(
                    response => {
                        // console.log(response)
                        this.setState({
                            hasMore: (this.state.list.length < 500),
                            isLoading: false,
                            list: [
                                ...this.state.list,
                                response
                            ],
                        });

                    },
                    error => {
                        this.setState({
                            content:
                                (error.response && error.response.data) ||
                                error.message ||
                                error.toString()
                        });
                    }
                );
            }
        }

    }

    componentWillUnmount() {
        window.location.reload();
    }

    loadApods = () => {this.setState({ isLoading: true }, () => {
        UserService.getPrivateContent(this.state.offset).then(
            response => {
                // console.log(response)
                this.setState({
                    hasMore: (this.state.list.length < 10),
                    isLoading: false,
                    list: [
                        ...this.state.list,
                        response
                    ],
                });

            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    });}

    render() {
        const { 
            currentUser,
            content,
            error,
            hasMore,
            isLoading,
            list 
        } = this.state;

        return (
            <div>
                {currentUser ? (
                    <div className="container">
                        <header className="head-container">
                            <h4>{content}, {currentUser.username} </h4>
                            <h1>Users Contact List</h1>
                            <p>Scroll down to load more!</p>
                        </header>

                        {list.map(data => (
                            <React.Fragment key={data.id}>
                                <hr/>
                                <div className="candidate-list">
                                    <div className="title">

                                        <div className="thumb">
                                            <img src={data.url} alt={"Error"}/>
                                        </div>
                                        <div className="candidate-list-details">
                                            <div className="candidate-list-info">
                                                <div className="candidate-list-title">
                                                    <h4 className="mb-0">{data.name}</h4>
                                                </div>
                                                <div className="candidate-list-option">
                                                    <ul className="list-unstyled">
                                                        <li><strong>Email:</strong> <a href={`mailto:${data.email}`}>{data.email}</a></li>
                                                        <li><strong>Phone No:</strong> <a href={`tel:${data.phone}`}>{data.phone}</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </React.Fragment>
                        ))}

                        <hr />

                        {error &&
                          <div className="foot" style={{ color: '#900' }}>
                            {error}
                          </div>
                        }

                        {isLoading &&
                          <div className="foot">Loading...</div>
                        }

                        {!hasMore &&
                          <div className="foot">No more users</div>
                        }
                    </div>

                ) : (
                    <div className="container">
                        <header className="head-container">
                            <h3>{this.state.content}</h3>
                            <h4><Link to={"/login"} className="nav-link"> Log In </Link></h4>
                        </header>
                    </div>
                )}
            </div>
        );
    }
}
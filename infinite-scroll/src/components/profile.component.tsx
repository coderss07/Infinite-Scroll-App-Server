import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import "../assets/css/home.css"

type Props = {};

type State = {
    redirect: string | null,
    userReady: boolean,
    currentUser: IUser & { accessToken: string }
}
export default class Profile extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { accessToken: "" }
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
    }

    componentWillUnmount() {
        window.location.reload();
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        return (
            <div className="container">
                {(this.state.userReady) ?
                    <div>
                        <header className="profile-container">
                            <h2>
                                <strong>Welcome</strong> {currentUser.username}!
                            </h2>
                        </header>
                        <div className="profile-section">
                            <h4 className="profile-items">
                                <strong> Profile: </strong>
                            </h4>
                            <p className="profile-items">
                                <strong>User Id:</strong>{" "}
                                {currentUser.id}
                            </p>
                            <p className="profile-items">
                                <strong>User Name:</strong>{" "}
                                {currentUser.username}
                            </p>
                            <p className="profile-items">
                                <strong>Email:</strong>{" "}
                                {currentUser.email}
                            </p>
                        </div>
                    </div> : null}
            </div>
        );
    }
}
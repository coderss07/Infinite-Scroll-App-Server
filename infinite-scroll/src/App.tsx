import { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/css/main.css"

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
// import LogOut from "./components/logout.component";
import LogNavBar from "./components/logheader.component";
import NonLogNavBar from "./components/nonlogheader.component";

import EventBus from "./common/EventBus";

type Props = {};

type State = {
    currentUser: IUser | undefined
}

function Logout() {
    AuthService.logout();
    return <Navigate to={"/login"} />
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }

        EventBus.on("logout", this.logOut);
    }

    componentWillUnmount() {
        EventBus.remove("logout", this.logOut);
    }

    logOut() {
        AuthService.logout();
        this.setState({
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                {currentUser ? (
                    <LogNavBar/>
                ) : (
                    <NonLogNavBar/>
                )}
                <div className="container mt-2">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/logout" element={<Logout />} ></Route>
                    </Routes>
                </div>
                
            </div>

        );
    }
} 

export default App;
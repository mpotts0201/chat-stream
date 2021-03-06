import React, { Component } from 'react'
import PostsList from './PostsList'
import VideoPlayer from './VideoPlayer'
import Navbar from './Navbar'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn } from "../util/SessionHeaderUtil"

const PageContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
margin-top: 30px;`

class ChatPage extends Component {

    state = {
        redirect: false
    }

    signOut = async (event) => {
        try {
            event.preventDefault()

            await axios.delete('/auth/sign_out')

            clearAuthTokens();

            this.setState({
                signedIn: false,
                redirect: true
            })
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        if (this.state.redirect) {
            return (<Redirect to="/chat" />)
        }
        return (
            <div>
                <Navbar />
                <button onClick={this.signOut}>Sign Out</button>
                <PageContainer >
                    <VideoPlayer />
                    <PostsList />
                </PageContainer>
            </div>
        );
    }
}

export default ChatPage;
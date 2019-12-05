import React from 'react';
import videojs from 'video.js'

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        }
    }
    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode, this.state, function onPlayerReady() {
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.sources && nextProps.sources) {
            this.player.src(nextProps.sources)
        }

        return false
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (
            <div>
                <div data-vjs-player>
                    <video ref={node => this.videoNode = node} className="video-js"></video>
                </div>
            </div>
        )
    }
}
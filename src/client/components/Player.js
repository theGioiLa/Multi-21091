import React from 'react';
import Hls from 'hls.js'

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        }
    }
    componentDidMount() {
        // instantiate Video.js
        const self = this
        this.player = new Hls(
            {
                debug: false,
                fLoader: config => {
                    let loader = new Hls.DefaultConfig.loader(config)

                    let load = loader.load.bind(loader)
                    loader.load = (context, config, cbs) => {
                        let onSuccess = cbs.onSuccess
                        let onProgress = cbs.onProgress
                        cbs.onSuccess = function (res, stats, context) {
                            let { levels, currentLevel, loadLevel, bandwidthEstimate } = self.player
                            // console.log(levels[loadLevel].bitrate, bandwidthEstimate)
                            onSuccess(res, stats, context)
                        }

                        cbs.onProgress = function (stats, context, data) {
                            onProgress(stats, context, data)
                        }

                        load(context, config, cbs)
                    }
                    return loader
                }
            }
        )

        this.player.attachMedia(this.videoNode)
        this.player.on(Hls.Events.MEDIA_ATTACHED, function () {
            self.player.loadSource(self.props.src)

            self.player.on(Hls.Events.MANIFEST_PARSED, function (event, { levels }) {
                console.log(levels)
                self.videoNode.play()
            })

            self.player.on(Hls.Events.LEVEL_LOADED, function (event, { details }) {
                console.log(details)
            })

            self.player.on(Hls.Events.FRAG_LOADING, function (event, data) {
                let { levels, currentLevel, loadLevel, bandwidthEstimate } = self.player
                console.log(levels[loadLevel].bitrate, bandwidthEstimate)
            })
        })
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.destroy()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.sources && nextProps.sources) {
            this.player.loadSource(nextProps.src)
        }

        return false
    }

    render() {
        return (
            <div>
                <div data-vjs-player style={{ width: 'auto', height: 'auto' }}>
                    <video controls
                        ref={node => this.videoNode = node}
                    >
                    </video>
                </div>
            </div>
        )
    }
}
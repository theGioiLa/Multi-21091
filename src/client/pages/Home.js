import React, { PureComponent } from 'react'
import { Upload, message, Button, Icon } from 'antd'
import { storage } from '../api'

class HomePage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            update: false
        }
    }

    componentDidMount() {
        storage.list()
            .then(list => {
                console.log(this)
                console.log(list)
            })
            .catch(err => {
                message.error(`[ERROR]: ${err.message}`)
            })
    }

    onChange = (info) => {
        const { status, percent } = info.file
        if (percent === 100 && status === 'uploading') {
            console.log('Transcoding')
        } else if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Upload
                    name='file'
                    accept="audio/*, video/*"
                    action="/upload"
                    onChange={this.onChange}
                >
                    <Button>
                        <Icon type="upload" /> Upload
                    </Button>
                </Upload>
            </React.Fragment>
        )
    }
}

export default HomePage
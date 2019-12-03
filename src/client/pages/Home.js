import React, { PureComponent } from 'react'
import { Upload, message, Button, Icon } from 'antd'

class HomePage extends PureComponent {
    onChange = (info) => {
        const { status } = info.file
        if (status === 'done') {
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
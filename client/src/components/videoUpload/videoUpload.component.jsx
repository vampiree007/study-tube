import React, { useState } from 'react'
import { Typography, Button, Form, Input} from 'antd';
import { VideoCameraAddOutlined, LoadingOutlined,UploadOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";
import './videoUpload.css';

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const Catogory = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

function UploadVideoPage(props) {
    const user = useSelector(state => state.user.currentUser);
    //console.log(user._id)

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Loading, setLoading] = useState("")

    const [Thumbnail, setThumbnail] = useState("")

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {

        setDescription(event.currentTarget.value)
    }

    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value)
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value)
    }

    const onSubmit = (event) => {

        event.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (title === "" || Description === "" ||
            Categories === "" || FilePath === "" ||
            Duration === "" || Thumbnail === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: user._id,
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail[0]
        }

        axios.post('/api/v1/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    props.history.push('/')
                } else {
                    alert('Failed to upload video')
                }
            })

    }

    const onDrop = (files) => {
        setLoading('true')
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        axios.post('/api/v1/video/uploadfile', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response)
                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    //gerenate thumbnail with this filepath ! 

                    axios.post('/api/v1/video/thumbnails', variable)
                        .then(response => {
                            console.log(response.data)
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.thumbsFilePath)
                                setLoading('false')
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })


                } else {
                    alert('failed to save the video in server')
                }
            })

    }

    return (
        <div className="container" style={{width:'100%', display: 'flex', justifyContent: 'space-between' }}>
        <div className="container_left" style={{ maxWidth: '70%', margin: '2rem auto' }}>
            <div style={{ width: '100%', margin: '2rem auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <Title level={2} > DROP YOUR VIDEO HERE</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width:'100%'}}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="dropzone" style={{ fontSize: '70px', height: '190px', border: '9px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                {
                                    Loading === 'true' ? <LoadingOutlined />: <VideoCameraAddOutlined />
                                }
                                    
                            </div>
                        )}
                    </Dropzone>

                    
                </div>
                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDecsription}
                    value={Description}
                    rows={6}
                />
                <br /><br />

                <div className="select_container">
                <select onChange={handleChangeOne}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <select style={{ width: 320 }} onChange={handleChangeTwo}>
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                </div>
                <br /><br />

                <Button className="button_upload" type="primary" size="large" onClick={onSubmit} icon={<UploadOutlined />}>Submit</Button>

            </Form>
        </div>
            </div>
        <div className="container_right" style={{ maxWidth: '29%', margin: '2rem auto' }}>
            <div style={{ textAlign: 'left', margin: '2rem', marginLeft:0 }}>
                <Title level={2} > Thumbnails</Title>
            </div>
            {
                Thumbnail !== "" &&
                <div className="thumbnail_container">
                    {
                        Thumbnail.map((item, index) => (
                            <div className="thumbnail_item" key={index}>
                                <img src={`http://localhost:5000/${item}`} alt="haha" />
                            </div>
                            )
                        )
                    }
                </div>
            }
        </div>
        </div>
    )
}

export default UploadVideoPage

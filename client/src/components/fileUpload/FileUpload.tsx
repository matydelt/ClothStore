import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import axios from 'axios';
import Resizer from "react-image-file-resizer";

export default function FileUpload({ form, setForm }: any): JSX.Element {

    function handleImagenes(e: { target: { files: any; }; }) {

        let files: File[] = e.target.files;
        let allUploadedFiles: {}[] = form.images;

        if (files) {
            for (let index = 0; index < files.length; index++) {
                Resizer.imageFileResizer(files[index], 720, 720, 'JPEG', 100, 0, (uri) => {
                    axios.post('http://localhost:3001/imageupload', { image: uri }).then((res) => {
                        allUploadedFiles.push(res.data);
                        setForm({ ...form, images: allUploadedFiles });
                    }).catch(err => console.log(err))
                })
            }
        }
    };

    return (

        <Button
            variant="contained"
            component="label"
        >
            Subir imágenes
            <input
                onChange={(e) => handleImagenes(e)}
                accept="images/*"
                multiple
                type="file"
                hidden
            />
        </Button>

    )
}